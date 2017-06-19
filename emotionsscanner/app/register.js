define(function (require) {
    'use strict';

    var api = require('api');

    var TOKEN_REGEXP = /token="(.*)"/;

    return function(data, done) {

        api.identity.register({email: data.email, password: data.password}, function (err, identity) {

            if (err && err.src && err.src === "email") {
                done({registered: true, name: data.name}, null);
                return;
            }

            if (err) {
                return done(err);
            }

            api.users.put({name: data.name}, function (err) {

                if (err) {
                    done(err, null);
                    return;
                }

                var tokenString = api.authorize(),
                token = '';

                if (TOKEN_REGEXP.test(tokenString)) {
                    token = tokenString.match(TOKEN_REGEXP)[1];
                }

                done(null, token);
            });

        });

    };

});