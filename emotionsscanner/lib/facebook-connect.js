

define('facebook-connect/utils',['require','exports','module'],function(require, exports) {

	if (!Array.prototype.map)
	{
		Array.prototype.map = function(fun /*, thisp*/)
		{
			var len = this.length;
			if (typeof fun != "function")
				throw new TypeError();

			var res = new Array(len);
			var thisp = arguments[1];
			for (var i = 0; i < len; i++)
			{
				if (i in this)
					res[i] = fun.call(thisp, this[i], i, this);
			}

			return res;
		};
	}


	/**
	 * Рейтинг образование, самое верхнее будет уставноленно
	 * в профиле пользователя
	 * @type {Object}
	 */
	var eductaionRaiting = {
		"hig": 4,
		"hiu": 5,
		"med": 6,
		"stu": 3,
		"col": 2,
		"sch": 1
	};

	/**
	 * Функция определяет какое образование установить пользователю
	 * на основании полученных данных из фейсбука
	 * @param {Object} fbAccount - аккаунт фейсбука
	 * @param {Object} lvEducations - данные из ловинги (словарь)
	 * @return {String} код образования
	 */
	exports.resolveEducation = function(fbAccount, lvEducations) {

		if(!fbAccount || !fbAccount.education) {
			return undefined;
		}

		var eds = fbAccount.education,
			codes = eds.map(function(object) {
				var fbCode =  (object.type || "other").toLowerCase();

				for(var item in lvEducations) {
					var dictCode = lvEducations[item].toLowerCase();

					if(fbCode.indexOf(dictCode) !== -1 ||
						dictCode.indexOf(fbCode) !== -1) {

						return item;
					}
				}

				return undefined;
			});

		var best,
			code;

		for(var i=0; i<codes.length; i++) {

			code = codes[i];

			if (!best) {
				best = codes[i];
				continue;
			}

			if (eductaionRaiting[best] < eductaionRaiting[code]) {
				best = code;
			}

		}

		return best;

	};

	/**
	 * Функция определяет какой язык установить пользователю
	 * на основании полученных данных из фейсбука
	 * @param {Object} fbAccount - аккаунт фейсбука
	 * @param {Object} lvLanguages - данные из ловинги (словарь)
	 * @return {Array} список кодов языков
	 */
	exports.resolveLanguage = function(fbAccount, lvLanguages) {

		if(!fbAccount || !fbAccount.languages) {
			return undefined;
		}

        var langs = fbAccount.languages,
			codes = langs.map(function(object) {
				var fbCode =  (object.name || "other").toLowerCase();

				for(var item in lvLanguages) {
					var dictCode = lvLanguages[item].toLowerCase();

					if(fbCode.indexOf(dictCode) !== -1 ||
						dictCode.indexOf(fbCode) !== -1) {

						return item;
					}
				}

				return undefined;
			});

        codes = codes.filter(function(name) {
            return !!name;
        });

		return codes.length > 0 ? codes : undefined;
	};


	/**
	 * Метод который позволяет определить код и страну пользователя, если
	 * у него уставноленно в facebook location
	 * @param fbAccount - аккаунт пользователя в файсбуке
	 * @param lvCountries - словарь стран на сайте
	 * @return {Object} вернет либо объект {country: '', city: ''}, если поля какое
	 * бо из полей заполненно не верно поля будут undefined
	 */
	exports.resolveCountryAndCity = function(fbAccount, lvCountries) {
		if(!fbAccount || !fbAccount.location || !lvCountries) {
			return undefined;
		}

        var findKey = function(object, key) {
			// TODO fix, not correct cycle
			for(var k in object) {
				if(lvCountries[k].indexOf(key) !== -1) {
					return k;
				}
			}

			return undefined;
		};

		var location = (fbAccount.location && fbAccount.location.name) ? fbAccount.location.name.split(',') : undefined,
			userCity = location && location.length > 0 && location[0],
            userCountry = location && location.length > 1  && location[1].substr(1, location[1].length);


        userCountry = (userCountry) ? findKey(lvCountries, userCountry) : '';


        return {
			country: userCountry,
			city: userCity
		};
	};
});

define('facebook-connect/facebook',['exports'], function(exports) {

    exports.load = function(complete) {

        require(['facebook-sdk'], function() {
            complete(null, window.FB);
        });

    };

});
define('facebook-connect',['require','exports','module','facebook-connect/utils','facebook-connect/facebook'], function(require, exports){
    var url = '//graph.facebook.com/',
        end = '&?redirect=false&callback=define';

    var utils = require('facebook-connect/utils'),
        api = require('facebook-connect/facebook'),
        ready = false,
        session, config, fb;

    function noop() {};

    function last(arr) {
        return typeof arr[arr.length - 1];
    }

    function request(query, done) {
        query  = url  + '/' + query + '?' + (session ? '&access_token=' + session.accessToken : '') + end;

        require([query], function(data) {
           done(null, data);
        });

    }

    exports.utils = utils;

    exports.init = function(cnf, done) {
        config = cnf;

        api.load(function (err, res) {

            fb = res;

            if (!fb) {
                done(new Error('Facebook all.js not found, please see module documentation!'), null);
                return;
            }

            if (ready) {
                return;
            }

            fb.init(config.base);
            ready = true;

            done(null, true);
        });


    };

    exports.restore = function(token, done) {

        function ready(res) {

            if (!res.authResponse) {
                done(res, null);
            }

            session = res.authResponse;
            done(null, session.accessToken);
        }

        fb.getLoginStatus(ready);
    }

    exports.authorize = function(){
        var args = Array.prototype.slice.call(arguments),
            done = last(args) === 'function' ? args.pop() : noop,
            permissions = last(args) === 'string' ? args.pop() : null;

        if (session) {
            done(null, session.accessToken);
            return;
        }

        fb.login(function(res) {

            if (res.authResponse) {
                session = res.authResponse || null;
                done(null, session.accessToken);
            } else {
				res.close = (typeof res.status === 'undefined') ? true : false;
                done(res, null);
            }

        }, {scope: ( permissions || config.permissions )});

    };

    exports.profile = function() {
        var args = Array.prototype.slice.call(arguments),
            done = last(args) === 'function' ? args.pop() : noop,
            id = last(args) === 'string' ? args.pop() : null;

        // TODO нужно обсудить, может быть нужно кидать ошибку если id, т.е. мы пытаемся получить свой профиль
        if (!session) {
            done(new Error('User not authorized'), null);
            return;
        }

        request((id || 'me'), done);
    };

    exports.thumbnail = function() {
        var args = Array.prototype.slice.call(arguments),
            done = last(args) === 'function' ? args.pop() : noop,
            query = last(args) === 'object' ? args.pop() : config.photos,
            id = last(args) === 'string' ? args.pop() : null;

        var uri = (id || session.userID) + '/picture?';

        if (query) {
            // TODO использовать стандартуню либу
            for(var key in query) {
                uri += key + '=' + query[key] + '&';
            }
        }

        request(uri, function(err, img) {
            var ret = {'thumbnail': ''};

            if (err) {
                done(err, null);
                return;
            }

            if (img.data['is_silhouette'] === false) {
                ret.thumbnail = url + uri;
            }

            done(null, ret);
        });

    };

    exports.clear = function() {
        session = undefined;
    };

    exports.on = function(type, callback) {
        fb && fb.Event.subscribe(type, callback);
    };

    exports.removeListener = function(type, callback) {
        fb && fb.Event.unsubscribe(type, callback);
    };

    exports['on']('auth.logout', function() {
        session = undefined;
    });
});
