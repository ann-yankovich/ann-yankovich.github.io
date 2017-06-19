define("genesis", function(require, exports) {

	var jQuery = require('jquery'),
		$ = jQuery;

	var genesis = function () {
		// TODO: instanceof always false first time
		if (!(this instanceof arguments.callee))
			return new arguments.callee(arguments);

		return this;
	}

	exports.genesis = genesis;

String.prototype.namespace = function () {
	var parts = this.split('.'),
		cursor = window
		;

	for (var i = 0, l = parts.length; i < l; i++)
		cursor = cursor[parts[i]] || (cursor[parts[i]] = {});

	return cursor;
}


Function.prototype.extended = function(extension) {
	var self = this;

	return function() {
		var context = self.apply({}, arguments),
			base = {}
			;

		for (var i in context)
			base[i] = context[i];

		context.base = base;

		return extension.apply(context, arguments);
	}
};




Array.prototype.forEach = Array.prototype.forEach || function (fn, ctx) {
	'use strict';

	if (this === void 0 || this === null || typeof fn !== 'function') {
		throw new TypeError();
	}

	var self = Object(this),
		len = self.length >>> 0
		;

	for (var i = 0; i < len; i++) {
		if (i in self) {
			fn.call(ctx, self[i], i, self);
		}
	}
};


if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}


Array.prototype.map = Array.prototype.map || function (fn, ctx) {
	'use strict';

	if (this === void 0 || this === null || typeof fn !== 'function') {
		throw new TypeError();
	}

	var self = Object(this),
		len = self.length >>> 0,
		res = new Array(len)
		;

	for (var i = 0; i < len; i++) {
		if (i in self) {
			res[i] = fn.call(ctx, self[i], i, self);
		}
	}

	return res;
};


Array.prototype.some = Array.prototype.some || function (fn, ctx) {
	'use strict';

	if (this === void 0 || this === null || typeof fn !== 'function') {
		throw new TypeError();
	}

	var self = Object(this),
		len = self.length >>> 0
		;

	for (var i = 0; i < len; i++) {
		if (i in self && fn.call(ctx, self[i], i, self)) {
			return true;
		}
	}

	return false;
};


Array.prototype.reduce = Array.prototype.reduce || function reduce(accumulator){
	'use strict';
	if (this === null || this === undefined) {
		throw new TypeError('Object is null or undefined');
	}
	var i = 0,
		l = this.length >> 0,
		curr;

	if (typeof accumulator !== 'function') {// ES5 : 'If IsCallable(callbackfn) is false, throw a TypeError exception.'
		throw new TypeError('First argument is not callable');
	}

	if (arguments.length < 2) {
		if (l === 0) {
			throw new TypeError('Array length is 0 and no second argument');
		}
		curr = this[0];
		i = 1; // start accumulating at the second element
	} else {
		curr = arguments[1];
	}

	while (i < l) {
		if (i in this) {
			curr = accumulator.call(undefined, curr, this[i], i, this);
		}
		++i;
	}

	return curr;
};






String.prototype.contains = function (c) {
	if (typeof c !== 'string')
		throw "Incorrect argument type for String.prototype.contains: expected String";

	if (c.length == 0)
		return 1;

	var
		re = new RegExp(RegExp.escape(c), 'g'),
		matches = this.match(re);

	return matches ? (matches.length || 0) : 0;
};


String.prototype.ends = function (end) {
	var isArray = end instanceof Array;

	if (end === undefined || (typeof end !== 'string' && !isArray) || end.length < 1)
		throw new TypeError('Argument expected to be a non-empty string or an array of strings');

	if (isArray) {
		for (var i = end.length; i--;) {
			if (this.ends(end[i]))
				return true;
		}

		return false;
	}

	return this.substring(this.length - end.length) === end;
};


String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, i) { return i < args.length ? args[i] : ('{' + (i - args.length) + '}'); });
};


String.prototype.starts = function (start) {
	var isArray = start instanceof Array;

	if (start === undefined || (typeof start !== 'string' && !isArray))
		throw new TypeError('Argument expected to be a string or an array of strings.');

	if (isArray) {
		for (var i = start.length; i--; ) {
			if (this.starts(start[i]))
				return true;
		}

		return false;
	}

	return this.substring(0, start.length) === start;
};


if (String.prototype.trim === undefined) String.prototype.trim = function () {
	// Souders HPJS, 103
	var str = this.replace(/^\s+/, ""),
		end = str.length - 1,
		ws = /\s/
		;

	while (ws.test(str.charAt(end)))
		end--;

	return str.slice(0, end + 1);
};





if (!Date.prototype.toISOString) {

	(function () {

		function pad(number) {
			var r = String(number);
			if (r.length === 1) {
				r = '0' + r;
			}
			return r;
		}

		Date.prototype.toISOString = function () {
			return this.getUTCFullYear()
				+ '-' + pad(this.getUTCMonth() + 1)
				+ '-' + pad(this.getUTCDate())
				+ 'T' + pad(this.getUTCHours())
				+ ':' + pad(this.getUTCMinutes())
				+ ':' + pad(this.getUTCSeconds())
				+ '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
				+ 'Z';
		};

	} ());
}





/*
 Object.prototype.executable = function() {
 return Object.prototype.toString.call(this) === '[object Function]';
 }
 */
String.empty = '';

RegExp.escape = function (text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

Number.prototype.bits = function() {
	var bits = [],
		dividend = parseInt(this),
		remainder = 0
		;

	if (dividend != this)
		throw new TypeError('Integer value expected ' + this + ' given.');

	while (dividend > 1) {
		remainder = dividend % 2;
		bits.unshift(remainder);
		dividend = (dividend - remainder) / 2;
	}

	bits.unshift(dividend);

	return bits.join('');
};

Function.prototype.curry = function () {
	var fn = this, args = Array.prototype.slice.call(arguments);

	return function() {
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	};
};

Function.prototype.postpone = function() {
	var
		func = this,
		args = Array.prototype.slice.call(arguments, 1)
		;
	return setTimeout(function() {
		func.apply(null, args);
	}, +arguments[0] || 0);
};

Function.prototype.prolong = function(startExecution, minExecutionTime) {
	var
		func = this,
		args = Array.prototype.slice.call(arguments, 2),
		delay = minExecutionTime - (+new Date() - startExecution)
		;

	if (delay <= minExecutionTime * .2) {
		this.apply(null, args);
		return false;
	} else {
		return setTimeout(function() {
			func.apply(null, args);
		}, delay);
	}
};

Math.gcd = function() {
	var nums = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments),
		remainder,
		result,
		num,
		n,
		i
		;

	for (i = nums.length; i--;) {
		num = nums[i];

		if (result || (result = num) != num)
			for (n = num; remainder = n % result; n = result, result = remainder) ;
	}

	return result;
};

Math.mult = function() {
	var nums = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments),
		result = 1,
		i
		;

	if (nums.length < 2)
		throw new Error('At least two numbers excpected.');

	for (i = nums.length; i--; )
		result *= nums[i];

	return result;
};


/*
 Gecko passes an extra parameter to the callback routine, indicating the "lateness" of the timeout in milliseconds.
 */
if (navigator.userAgent.contains('Gecko'))
	(function() {
		var _ = setTimeout;

		setTimeout = function(fn, timeout) {
			if (typeof fn === 'string')
				fn = new Function(fn);

			return _(fn.curry(undefined), timeout);
		};
	})();





'system'.namespace().argument = function (val, def, name) {
	if (def === undefined)
		throw new TypeError('Default argument value expected');

	if (val === undefined)
		return def;
	else {
		var type = typeof def;

		if (typeof val !== type)
			throw new TypeError((name || 'Argument') + ' expected to be ' + type);

		return val;
	}
};


'system'.namespace();

system.guid = function (size) {
	size = size || 8;

	return Math.pow(10, size - 1) + Math.round(Math.random() * 9 * Math.pow(10, size - 1));

}


'system'.namespace();

system.enumeration = genesis.extended(function (names) {
	var
		self = this,
		_resolve = {},

		objefy = function (arr) {
			var obj = {};

			for (var i = 0, l = arr.length; i < l; i++) {
				if (obj[arr[i]] !== undefined)
					throw new Error('Naming conflict ({0}).'.format(name));

				obj[arr[i]] = i;
			}

			return obj;
		},

		ctor = function () {
			if (names instanceof Array)
				names = objefy(names);

			for (var name in names) {
				if (self[name] !== undefined)
					throw new Error('Naming conflict ({0}).'.format(name));

				var value = names[name];

				self[name] = value;
				_resolve[value] = name;
			}
		}

		;

	self.resolve = function (value) {
		return _resolve[value];
	};

	ctor();
	return self;
});


'system'.namespace().uri = genesis.extended(function (uri) {
	var
		DEFAULT_DOMAIN_LEVEL = 2,
		KNOWN_EXCEPTIONS = ['co.uk'], // todo: zones
		DOT = '.'
		;

	var
		self = this,

		_scheme,
		_host,
		_snippets = {},
		_port,
		_path,
		_search,
		_searchParsed,

		host = function () {
			return (/(?:\/\/|^)([^:]*?)(?:\/|$|\?|:\d)/.exec(uri) || '')[1];
		},

		shrink = function (lvl) {
			var parts = self.host().split(DOT)
				, st
				, matches
				;

			if (lvl instanceof RegExp) {
				matches = self.host().match(lvl);
				return (matches && self.host().substr(matches[0].length)) || self.host();

			}
			st = parts.length - lvl;
			return parts.splice(st, lvl).join(DOT);


		},

		scheme = function () {
			var _ = (/^(\w+?):\/\//.exec(uri) || '')[1];

			return typeof _ === 'string'
				? _ = _.toLowerCase()
				: ''
				;
		},

		port = function () {
			return +(/:(\d+)/.exec(uri) || '')[1] || 0;
		},

		path = function () {
			return (/^[^?\/]*(\/(?:[^?]*))(?:\?|$)/.exec(uri.replace(/(^[^\/\?]+:\/\/)/, '')) || '')[1] || '';
		},

		search = function () {
			return (/\?(.*)(#|$)/.exec(uri) || [])[1] || '';
		},

		parseSearch = function() {
			var searchParsed = {};
			(_search !== undefined ? _search : (_search = search())).split('&').forEach(function(pair) {
				var parsedParam = pair.split('=');
				searchParsed[parsedParam[0]] = parsedParam[1];
			});
			return searchParsed;
		},

		level = function (host, exceptions) {
			exceptions = exceptions ? KNOWN_EXCEPTIONS.concat(exceptions) : KNOWN_EXCEPTIONS;

			for (var i = exceptions.length; i--; ) {
				var ex = exceptions[i];

				if (ex === null)
					continue;

				if (typeof ex !== 'string')
					throw new TypeError('Argument expected to be an array of strings');

				if (!ex.length)
					continue;

				if (host.toLowerCase().ends(ex))
					return ex.contains(DOT) + 2;
			}

			return DEFAULT_DOMAIN_LEVEL;
		}

		;

	self.ctor = function () {
		if (uri === undefined || typeof uri !== 'string')
			throw new TypeError('Argument expected to be a string');
	};

	self.host = function () {
		return _host !== undefined ? _host : (_host = host());
	};

	self.shrink = function (lvl) {
		if (lvl !== undefined && lvl !== null && (typeof lvl !== 'number' || lvl < 1) && !(lvl instanceof Array && lvl.length > 0) && !(lvl instanceof RegExp))
			throw TypeError('Argument expected to be a positive number or an non-empty array');

		if (lvl instanceof RegExp)
			return (_snippets[lvl] = shrink(lvl));

		if (lvl === undefined || lvl === null || lvl instanceof Array || lvl instanceof RegExp)
			lvl = level(self.host(), lvl);

		return _snippets[lvl] !== undefined ? _snippets[lvl] : (_snippets[lvl] = shrink(lvl));
	};

	self.scheme = function () {
		return _scheme !== undefined ? _scheme : (_scheme = scheme());
	};

	self.port = function () {
		return _port !== undefined ? _port : (_port = port());
	};

	self.path = function () {
		return _path !== undefined ? _path : (_path = path());
	};

	self.search = function (name) {
		if (typeof name === 'undefined') {
			return _search !== undefined ? _search : (_search = search());
		} else {
			return (_searchParsed !== undefined ? _searchParsed : (_searchParsed = parseSearch()))[name];
		}
	};

	self.toString = function () {
		return uri;
	};

	self.ctor();
	return self;
});


'system'.namespace();

system.noop = function () { };



Function.prototype.singleton = function () {
	var self = this,
		instance
		;

	return function () {
		instance || (instance = self.apply({}, arguments));
		return instance;
	};
}


'system.practices'.namespace()

	.Composite = genesis.extended(function(contract) {
	var
		self = this,

		_attached = [],

		decomposer = function(name) {
			return function() {
				decomposite(name, arguments);
			};
		},

		decomposite = function(name, args) {
			var i, l, child;

			for (i = 0, l = _attached.length; i < l; i++)
				(child = _attached[i])[name].apply(child, args);
		}

		;

	self.ctor = function(contract) {
		if (typeof contract !== 'object')
			throw new TypeError('Contract object expected');

		for (var i in contract) {
			if (typeof contract[i] === 'function') {
				if (self[i])
					throw new TypeError('Reserved name ' + i);

				self[i] = decomposer(i);
			}
		}
	};

	self.__attach = function(child) {
		_attached.push(child);
		return self;
	};

	//
	self.ctor(contract);
	return self;
})




'system.events'.namespace()

	.Event = function() {
	var callbacks = [];

	function event(callback) {
		if (typeof callback === 'function')
			callbacks.push(callback);
		else
			for (var i = 0, l = callbacks.length; i < l; i++)
				callbacks[i].apply(this, arguments);

		return this;
	}

	event.detach = function(callback) {
		var _callbacks = [];

		for (var i = callbacks.length; i--; )
			callbacks[i] === callback || _callbacks.push(callbacks[i]);

		callbacks = _callbacks;

		return this;
	};

	return event;
};


'system.events'.namespace()

	.Once = function() {
	var event = system.events.Event(),
		happend,
		args
		;

	var subscribe = function(fn) {
		if (!happend)
			return event.apply(this, arguments);

		fn.apply(this, args);
	};

	var process = function() {
		if (happend)
			return;

		happend = true;
		args = arguments;
		event.apply(this, arguments);
	};

	var once = function(fn) {
		typeof fn === 'function'
			? subscribe.apply(this, arguments)
			: process.apply(this, arguments)
		;
	};

	once.detach = event.detach;

	return once;
};


'system.events'.namespace()

	.Emitter = function () {
	var self = this,
		events = {},
		wildcard = new system.events.Event(),
		hooks = {};

	function eventNames() {
		var names = [], name;

		for (name in events)
			events.hasOwnProperty(name) && names.push(name);

		return names.join(' ');
	}

	function compose(name, fn) {
		var names = name.split(' '),
			evts = [],
			composite = {}
			;

		for (var i = 0, l = names.length; i < l; i++) {
			var e = new system.events.Event();
			evts.push(e);
			subscribe(names[i], e);
		}

		composite = system.events.Composite.apply(composite, evts).subscribe(function () {
			composite.unsubscribe(arguments.callee);
			composite = undefined;
			fn.apply(this, arguments);
		});
	}

	function subscribe(name, fn) {
		(events[name] || (events[name] = system.events.Event()))(fn);
	}

	function unsubscribe(name, fn) {
		if (!events[name])
			return;

		if (fn)
			return events[name].detach(fn);

		delete events[name];
	}

	function iterate(action, name, fn) {
		var names = name.split(' ');

		for (var i = 0, l = names.length; i < l; i++)
			action(names[i], fn);

		return this;
	}

	function emit() {
		var args = Array.prototype.slice.call(arguments),
			name = args.shift(),
			event = events[name],
			hook = hooks[name]
			;

		hook && (args = hook.apply(this, args));

		event && event.apply(this, args);
		wildcard.call(this, { name: name, data: args });

		return this;
	}

	this.on = this.subscribe = function (name, fn) {
		name === '*'
			? wildcard(fn)
			: iterate(subscribe, name, fn);

		return this;
	};

	this.remove = this.unsubscribe = function (name, fn) {
		iterate(unsubscribe, name || eventNames(), fn);
		return this;
	};

	this.hook = function (name, fn) {
		hooks[name] = fn;
		return this;
	};

	this.unhook = function (name, fn) {
		delete hooks[name];
		return this;
	};

	this.wait = function (name, fn) {
		compose(name, fn);
		return this;
	};

	this.emit = this.publish = emit;

	this.pipe = function(emitter) {
		emitter.on('*', function(e) {
			self.emit.apply(this, [e.name].concat(e.data));
		});

		return this;
	};

	return this;
};


'system.events'.namespace()
	.Hook = system.events.Emitter.extended(function () {
	var storage = system.storage.local,
		storageKey = '__hook';

	var emit = this.emit;

	function process(event) {
		if (storageKey == event.key)
			emit(event.newValue.key, event.newValue.value);
	}

	this.emit = function (key, value) {
		storage.set(storageKey, { key: key, value: value });
		storage.emitsToOwnWindow || emit(key, value);

		// TODO: двойной emit в IE

		return this;
	};

	storage.on('storage', process);

	return this;
});


'system.events'.namespace()
	.Hoox = system.events.Emitter.extended(function (url) {
	var frame,
		supportsPostMessage,
		ready = false,
		buffer = [];

	var emit = this.emit;

	function handle(event) {
		var message = (event.originalEvent || event).data;
		if(message === 'storage-ready'){
			loaded();
		} else {
			var data = JSON.parse(message);
			emit.apply(this, data.arguments);
		}
	};

	function loaded() {
		ready = true;

		for (var i = 0; i < buffer.length; i++){
			supportsPostMessage && frame.postMessage(buffer[i], '*');
		}

		buffer = undefined;
	};

	function send(data) {
		ready
			? (supportsPostMessage && frame.postMessage(data, '*'))
			: buffer.push(data);
	}

	this.emit = function () {
		send(JSON.stringify({ arguments: Array.prototype.slice.call(arguments) }));

		return this;
	}

	ui.window.on('message', handle);

	frame = document.createElement('iframe');
	//$(frame).bind('load', loaded); // TODO: !jquery
	frame.src = url;
	frame.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;';
	frame = document.body.appendChild(frame).contentWindow;
	supportsPostMessage = !!frame.postMessage;

	return this;
}).singleton();


'system.events'.namespace()

	.Composite = genesis.extended(function() {
	var
		self = this,

		_event = new system.events.Once(),
		_events = [],
		_happened = [],
		_count = 0,

		handle = function(i) {
			if (_happened[i])
				return;

			_happened[i] = ++_count;

			if (_count === _events.length)
				_event();
		}

		;

	self.ctor = function() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			var e = arguments[i];

			_events.push(e);

			e(handle.curry(i));
		}
	};

	self.subscribe = function(fn) {
		_event(fn);
		return self;
	};

	self.unsubscribe = function(fn) {
		_event.detach(fn);
	};

	//
	self.ctor.apply(self, arguments);
	return self;
});


'system.events'.namespace()

	.Spring = genesis.extended(function (patience, chilloutInterval, measureInterval, test) {
	var
		self = this,
		_index = 0,
		_chilloutInterval,
		_measureInterval,
		_patience,
		_test,

		_running,

		_chilloutIntervalInstance,
		_measureIntervalInstance,

		chillout = function () {
			if (!_index)
				return;

			_index--;
		},

		measure = function () {
			if (_test() && ++_index === _patience)
				self.attach();
		}

		;

	self.ctor = function (patience, chilloutInterval, measureInterval, test) {
		_chilloutInterval = chilloutInterval;
		_measureInterval = measureInterval;
		_patience = +patience;
		_test = test;

		self.attach(self.suspend);
	};

	self.attach = new system.events.Once();

	self.suspend = function () {
		clearInterval(_chilloutIntervalInstance);
		clearInterval(_measureIntervalInstance);
		_index = 0;
	};

	self.resume = self.start = function () {
		_chilloutIntervalInstance = setInterval(chillout, _chilloutInterval);
		_measureIntervalInstance = setInterval(measure, _measureInterval);
	};

	//
	self.ctor(patience, chilloutInterval, measureInterval, test);
	return self;
});




'system.net'.namespace();

system.net.channel = genesis.extended(function (url, transport) {
	var
		self = this,

		_url,
		_transport,

		request = function (verb, data, success, error, complete) {
			_transport({
				type: verb,
				url: _url,
				data: data,
				success: success,
				error: error,
				complete: complete
			});
		}

		;

	self.ctor = function (url, transport) {
		_url = url;
		_transport = transport;
	};

	self.post = function (data, success, error, complete) {
		request('POST', data, success, error, complete);
	};

	self.get = function (data, success, error, complete) {
		request('GET', data, success, error, complete);
	};

	self.put = function (data, success, error, complete) {
		request('PUT', success, error, complete);
	};

	self.del = function (data, success, error, complete) {
		request('DELETE', success, error, complete);
	};

	//
	self.ctor(url, transport);
	return self;
});



'system.net'.namespace();

system.net.channel = genesis.extended(function (url, transport) {
	var
		self = this,

		_url,
		_transport,

		request = function (verb, data, success, error, complete) {
			_transport({
				type: verb,
				url: _url,
				data: data,
				success: success,
				error: error,
				complete: complete
			});
		}

		;

	self.ctor = function (url, transport) {
		_url = url;
		_transport = transport;
	};

	self.post = function (data, success, error, complete) {
		request('POST', data, success, error, complete);
	};

	self.get = function (data, success, error, complete) {
		request('GET', data, success, error, complete);
	};

	self.put = function (data, success, error, complete) {
		request('PUT', success, error, complete);
	};

	self.del = function (data, success, error, complete) {
		request('DELETE', success, error, complete);
	};

	//
	self.ctor(url, transport);
	return self;
});


'system.net.channels'.namespace();

system.net.channels.get = genesis.extended(function (url, ajax, success, error, complete) {
	var
		self = this,

		_host = new system.uri(url).host(),
		_type = (_host === window.location.host || !_host) ? 'json' : 'jsonp'

		;

	self.ctor = function () {
		if (!ajax)
			throw new Error('jQuery ajax required');
	};

	self.reqest = self.send = function(data) {
		if (typeof data !== 'object')
			throw new TypeError('Argument expected to be an object');

		ajax({
			url: url,
			dataType: _type,
			method: 'GET',
			data: data,
			traditional: true,

			success: success,
			error: error,
			complete: complete
		});
	};

	return self;
});


'system.net.channels'.namespace();

system.net.channels.xpost = genesis.extended(function(url, point, document, serializer) {
	var PREFIX = 'frame';

	var
		self = this,
		querySeparator = url.contains('?') ? '&' : '?',

		_requests = {},

		ctor = function() {
			system.net.channels.xpoint(callback);
		},

		callback = function(data) {
			data = serializer.parse(data);

			var request = _requests[data.id];

			if (!request)
				return;
			data.status === 200
				? (request.success && request.success(data.data))
				: (request.error && request.error(data.status, data.data));

			request.complete && request.complete(data.status, data.data);

			dispose(data.id);
		},

		dispose = function(id) {
			var request = _requests[id];

			setTimeout(function() { document.body.removeChild(request.frame); }, 0);

			_requests[id] = undefined;
			delete _requests[id];
		},

		append = function(form, name, value) {
			if (value instanceof Array) {
				for (var i = 0, l = value.length; i < l; i++)
					append(form, name, value[i]);

				return;
			}

			var input = document.createElement('textarea');
			input.name = name;
			input.value = value;
			form.appendChild(input);
		}

		;

	self.send = function(data, success, error, complete) {
		var id = system.guid(),
			name = 'frame' + id,
			frame = document.createElement((navigator.appName === 'Microsoft Internet Explorer' && navigator.appVersion.indexOf('MSIE 9.0') == -1) ? '<iframe name="' + name + '">' : 'iframe'),
			form = document.createElement('form')
			;

		_requests[id] = { frame: frame, success: success, error: error, complete: complete };

		frame.id = frame.name = name;
		frame.style.display = 'none';

		form.action = [url, querySeparator, 'id=', id, '&point=', point].join('');
		form.method = 'POST';
		form.target = name;
		form.style.display = 'none';

		for (var i in data)
			if (data.hasOwnProperty(i))
				append(form, i, data[i]);

		document.body.appendChild(frame);
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
		return id;
	};

	//
	ctor();
	return self;
});

system.net.channels.xpoint = system.events.Event();





/*
 TODO: more keys
 */

'system.input'.namespace();

system.input.keys = new system.enumeration({
	any: 0,
	tab: 9,
	enter: 13,
	escape: 27,
	left: 37,
	up: 38,
	right: 39,
	down: 40
});


/*
 Usage:
 callback = function(){};
 var e = new system.input.event('keypress', 13, callback);
 e.detach(callback);
 */

'system.input'.namespace();

system.input.event = (function (doc) {
	var
		events = {},

		handler = function (type, key) {
			return function (e) {
				if (!key || e.keyCode === key)
					events[type][key](e);
			};
		}

		;

	return function (type, key, callback) {
		key = +key || system.input.keys.any;

		if (!events[type]) {
			events[type] = {};
			doc.bind(type, handler(type, key));
		}

		if (!events[type][key])
			events[type][key] = system.events.Event();

		events[type][key](callback);

		return events[type][key];
	};
})(window.jQuery && jQuery(document));


'system.input'.namespace();

system.input.sequence = genesis.extended(function(chars, callback) {
	var
		self = this,

		_cursor = 0,
		_length = chars.length,

		ctor = function() {
			system.input.event('keypress', system.input.keys.any, key);
		},

		test = function(code) {
			chars.charCodeAt(_cursor) === code
				? ++_cursor === _length && complete()
				: (_cursor = 0)
			;

			return _cursor;
		},

		key = function(e) {
			var code = e.keyCode;
			_cursor === test(code) - 1 || test(code);
		},

		complete = function() {
			if (callback(chars) === false) // once?
				_cursor = 0;
		}

		;

	ctor();
	return self;
});




'system.testing'.namespace();

system.testing.stub = function (value, callback) {
	var fn = function () {
		fn.calls++;
		fn.args = Array.prototype.slice.call(arguments);

		typeof callback === 'function' && callback.apply(null, arguments);

		return value;
	};

	fn.calls = 0;
	fn.args = [];

	return fn;
};


'system.testing'.namespace();

system.testing.stubvalue = function (value) {
	return function () {
		this.valueOf = function () {
			return value;
		}
	}
};


'system.testing'.namespace().stress = function (fn, calls) {
	var start = +new Date();

	for (var i = +calls || 10000; i--; )
		fn();

	return +new Date() - start;
};




'system.encoding.utf8'.namespace()

	.encode = function(string) {
	return unescape(encodeURIComponent(string));
};


'system.encoding.utf8'.namespace()

	.decode = function(string) {
	return decodeURIComponent(escape(string));
};


'system.encoding.base64'.namespace()

	.charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="


'system.encoding.base64'.namespace()

	.encode = (function() {
	var base64 = system.encoding.base64,
		utf8 = system.encoding.utf8
		;

	return function(input) {
		var output = [],
			c1, c2, c3, e1, e2, e3, e4,
			i = 0
			;

		input = utf8.encode(input);

		while (i < input.length) {

			c1 = input.charCodeAt(i++);
			c2 = input.charCodeAt(i++);
			c3 = input.charCodeAt(i++);

			e1 = c1 >> 2;
			e2 = ((c1 & 3) << 4) | (c2 >> 4);
			e3 = ((c2 & 15) << 2) | (c3 >> 6);
			e4 = c3 & 63;

			if (isNaN(c2))
				e3 = e4 = 64;
			else if (isNaN(c3))
				e4 = 64;

			output.push(base64.charset.charAt(e1));
			output.push(base64.charset.charAt(e2));
			output.push(base64.charset.charAt(e3));
			output.push(base64.charset.charAt(e4));
		}

		return output.join('');
	};
})();


'system.encoding.base64'.namespace()

	.decode = (function() {
	var base64 = system.encoding.base64,
		utf8 = system.encoding.utf8
		;

	return function(input) {
		var output = [],
			c1, c2, c3,
			e1, e2, e3, e4,
			i = 0
			;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

		while (i < input.length) {

			e1 = base64.charset.indexOf(input.charAt(i++));
			e2 = base64.charset.indexOf(input.charAt(i++));
			e3 = base64.charset.indexOf(input.charAt(i++));
			e4 = base64.charset.indexOf(input.charAt(i++));

			c1 = (e1 << 2) | (e2 >> 4);
			c2 = ((e2 & 15) << 4) | (e3 >> 2);
			c3 = ((e3 & 3) << 6) | e4;

			output.push(String.fromCharCode(c1));

			if (e3 != 64)
				output.push(String.fromCharCode(c2));

			if (e4 != 64)
				output.push(String.fromCharCode(c3));
		}

		return utf8.decode(output.join(''));
	};
})();



(function (exports, dom) {

	exports.Template = function (template) {
		if (!'Mustache' in window)
			throw new Error('Mustache template engine required');

		function render(data, partials) {
			return Mustache.to_html(template, data, partials)
		}

		this.render = render;
	};

})('system'.namespace(), document);



'system.time'.namespace();

/*
 Usage: new system.time.eye(function(){}, new system.time.timer(1000));
 */

system.time.eye = genesis.extended(function (timer) {
	var
		self = this,
		_fn,
		_value,

		watch = function (fn) {
			_value = (_fn = fn)();
			timer.attach(check);
		},

		check = function () {
			value(_fn());
		},

		value = function (_) {
			_ === _value || self.changed(_value = _);
		}

		;

	// events
	self.changed = system.events.Event();

	// public
	self.sync = function (eye, reverse) {
		eye.changed(value);
		reverse || eye.sync(self, true);
		return self;
	};

	self.value = function (_) {
		_value = _;
	};

	self.watch = function (fn) {
		if (_fn)
			return window.console && console.error('Already watching');

		watch(fn);
		return self;
	};

	// ctor
	return self;
});


'system.time'.namespace();

/*
 Usage:
 (new system.time.timer(1000)).attach(function () {});
 */

system.time.timer = genesis.extended(function (interval) {
	var
		self = this,
		_callbacks = [],
		_interval = null,
		_suspended = false,
		_resume = 0,
		_lastrun,

		ctor = function () {
			if (typeof interval !== 'number')
				throw new Error("Invalid argument type");

			if (interval <= 0)
				throw new Error("Invalid argument value");
		},

		run = function () {
			_lastrun = +new Date();

			for (var i = 0, l = _callbacks.length; i < l; i++)
				_callbacks[i] && _callbacks[i]();
		},

		process = function () {
			if (_suspended)
				return;

			_interval || (_interval = setInterval(run, _resume || interval));
		},

		clear = function () {
			_interval = clearInterval(_interval);
			_lastrun = undefined;
		},

		suspend = function () {
			_suspended = true;
			_resume = _lastrun ? interval - Math.min(+new Date() - _lastrun, interval) : interval;
			(_interval = clearInterval(_interval));
		},

		resume = function () {
			if (!_suspended || !_resume)
				return;

			setTimeout(function () {
				_suspended = false;
				process();
			}, _resume);

			_resume = 0;
		}

		;

	// public
	self.attach = function (callback, id) {
		callback.id = id;
		_callbacks.push(callback);
		process();
		return self;
	};

	self.suspend = function () {
		suspend();
		return self;
	};

	self.resume = function () {
		resume();
		return self;
	};

	self.detach = function (id) {
		var index = -1;

		for (var i = _callbacks.length; i--; ) {
			if (_callbacks[i].id === id) {
				index = i;
				break;
			}
		}

		if (index === -1)
			return window.console && console.error('Not attached ID: ' + id);

		_callbacks.length || clear();
		_callbacks.splice(index, 1);
	};

	// ctor
	ctor();
	return self;
});



'system.runtime'.namespace()
	.Disposer = function () {

	var self = this
		;

	self.dispose = system.noop;

	ui.window.bind('beforeunload', function () {
		return self.dispose();
	});

	return self;
};


'system.runtime'.namespace();

/*
 Async queue

 Usage:
 var q = new system.runtime.queue();

 var first = function (deq) {
 async(function () {
 deq();
 };

 var second = function (deq) {
 deq();
 };

 q.push(first).push(second);

 */

system.runtime.queue = genesis.extended(function () {
	var
		self = this,
		_queue = [],
		_dequeueing = false,

		enqueue = function (fn) {
			if (Object.prototype.toString.call(fn) !== "[object Function]")
				return window.console && console.error('Function expected ' + typeof fn + ' given');

			_dequeueing
				? _queue.push(fn)
				: dequeue(fn)
			;
		},

		dequeue = function (fn) {
			if (typeof fn === 'undefined' && _queue.length === 0)
				return;

			_dequeueing = true;

			var calld = false;

			(fn || _queue.shift())(function () {
				if (calld)
					return;

				calld = true;
				_queue.length ? dequeue() : (_dequeueing = false);
			});
		}

		;

	self.push = function (fn) {
		enqueue(fn);

		return self;
	};

	self.flush = function () {
		_queue = [];

		return self;
	};

	// ctor
	return self;
})


'system.runtime'.namespace();

/*
 TODO: СѓР±Р°СЂС‚СЊ try-catch РІ DEBUG
 */

system.runtime.conceal = function(fn, args) {
	try {
		return fn.apply(this, args || []);
	} catch (e) {
		window.console && console.error(e.message);
	}
};



'system.mvc'.namespace()

	.Router = genesis.extended(function(navigator) {
	var
		self = this,

		_navigator,
		_routes = [],
		_current,
		_location,

		test = function(uri, route) {
			if (uri === undefined)
				return;

			var match;

			if (match = uri.match(route.rx)) {
				return {
					controller: route.controller,
					args: match.slice(1)
				};
			}
		},

		find = function(uri) {
			var found;

			for (var i = 0, l = _routes.length; i < l; i++)
				if (found = test(uri, _routes[i]))
					return found;

			return null;
		},

		navigate = function(e) {
			var location = e.value,
				found
				;

			if (location === _location)
				return;

			_location = location;

			if (found = find(_location))
				process(found.controller, found.args);
		},

		process = function (controller, args) {
			if (!!controller.skip)
				return controller.update.apply(controller, args);

			if (_current !== controller) {
				_current && _current.disable();
				(_current = controller).enable(args);
			}

			_current.update.apply(_current, args);
		},

		compose = function(rx, controller) {
			return {
				rx: rx,
				controller: controller
			};
		}

		;

	self.ctor = function(navigator) {
		_navigator = navigator;
		_navigator.change(navigate);

		//IBydlo
		if($.browser.msie) {
			navigate({ value: _navigator.path() });
		}
	};

	self.route = function(rx, controller) {
		var match,
			route = compose(rx, controller)
			;

		_routes.push(route);

		if (_location !== undefined && (match = test(_location, route)))
			process.call(this, match.controller, match.args);

		return self;
	};

	self.back = function() {
		_navigator.back();
		return self;
	};

	//
	self.ctor(navigator);
	return self;
});



(function (exports) {
	// обозначение единиц изменения по-умолчанию
	var DEFAULT_UNIT = 'B',

	// префиксы единиц измерений высших порядков
		UNITS = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],

	// размер порядка измерения
		EXPSIZE = 1024,

	// значимое отклонение от целого. т.е. 9.8 отображать как 10, 8.2 как 8
		GAP = 0.2
		;

	function round(n) {
		return (
			(
				(
					// округляем до 1 знака после запятой и проверяем на попадание в значимое отклонение
					n = Math.abs(Math.round(n = Math.round(n * 10) / 10) - n) < GAP
						// если отклонение не значимое, округляем
						? Math.round(n)
						: n

					// если результат больше области точности (обратное GAP) и число не целое
					) > 1 / GAP && n % 1
				)

				// рекурсивно округляем
				? round(n / 10) * 10
				: n
			);
	}

	exports.filesize = function (size, unit) {
		unit || (unit = DEFAULT_UNIT);

		var exp = 0;

		// выбираем порядок единиц измерения (число должно быть меньше размера порядка — логика спорная)
		while (size > EXPSIZE && UNITS[exp + 1] !== undefined) {
			size = size / EXPSIZE;
			exp++;
		}

		return round(size) + UNITS[exp] + unit;
	};
})('system.text'.namespace());


(function (exports) {
	var
		UNITS = 'k M G T P E Z Y'.split(' '),
		i,
		escapedUnits = [],
		re
		;

	UNITS.forEach(function(unit) {
		escapedUnits.push(RegExp.escape(unit));
	});
	re = new RegExp('^((\\.\\d+)|(\\d+(\\.\\d+)?))((' + escapedUnits.join('|') + ')?B)?$');

	/**
	 * 0.1kB == 1024 / 10 = 102.4. Fix it.
	 */
	exports.size2bytes = function(size) {
		var
			result,
			unit,
			matches
			;
		matches = size.toString().match(re);
		if (!matches) {
			throw new Error('incorrect size format "' + size + '"');
		}
		result = +matches[1];
		if (matches[5] === 'B') {
			return result;
		}
		if (unit = matches[6]) {
			result *= Math.pow(2, (UNITS.indexOf(unit) + 1) * 10);
		}
		return result;
	};
})('system.text'.namespace());


(function (exports) {
	var _replacement = {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;'
		},
		_escape = function (match) {
			return _replacement[match] || match;
		}
		;
	exports.escape = function (text) {
		return text && text.replace( /[&<>'"]/g , _escape);
	};
})('system.text'.namespace());




'system.storage'.namespace()
	.Cookie = function (domain, path, lifetime) {

	var options = {};

	domain && (options.domain = domain);
	path && (options.path = path);

	function set(name, value) {
		lifetime && (options.expires = new Date(+new Date() + lifetime * 1000));
		$.cookie(name, value, options);
	};

	function get(name) {
		return $.cookie(name);
	};

	this.get = function (name) {
		var value = get(name);

        try {
            var ret = value && JSON.parse(value);
        } catch(e) { return false; }

        return ret;

	};

	this.set = function (name, value) {
		set(name, JSON.stringify(value));
	};

	this.getScalar = function (name) {
		return get(name);
	};

	this.setScalar = function (name, value) {
		set(name, value);

		return this;
	};
}


'system.storage'.namespace()
	.local = new (system.events.Emitter.extended(function () {

	var self = this,
		eventName = 'storage',
		cache = {},
		supportsLocalStorage = !!window.localStorage;

	var emit = this.emit;

	function parse(value){

        try {
            var ret = value && JSON.parse(value);
        } catch(e) { return false; }

        return ret;
	};

	function get(key) {
		try {
			var value = supportsLocalStorage && localStorage.getItem(key);
			return parse(value);
		} catch (e) {
			console.error('localStorage read error: key=' + key);
		}
	};

	function set(key, value) {
		var val = JSON.stringify(value);
		try {
			supportsLocalStorage && localStorage.setItem(key, val);
		} catch (e) {
			console.error('localStorage write error: key=' + key + ', value=' + val);
		}
	};

	function process(e) {
		if (e.key) {
			return emit(eventName, event(e.key, parse(e.newValue), parse(e.oldValue)));
		}

		setTimeout(function () { //нужен, так как в IE событие возникает до изменения данных в localStorage
			if (supportsLocalStorage) {
				if (cache.length < localStorage.length) {
					for (var i = 0, key; i < localStorage.length; i++) {
						if (!cache.values[localStorage.key(i)]) {
							key = localStorage.key(i);
							emit(eventName, event(key, get(key), null));
							cache.values[key] = localStorage.getItem(key);
							cache.length++; // = localStorage.length;
						}
					}
				} else if (cache.length > localStorage.length) {
					for (var item in cache.values) {
						if (!localStorage.getItem(item)) {
							emit(eventName, event(item, null, parse(cache.values[item])));
							delete cache.values[item];
							cache.length--; // = localStorage.length;
						}
					}
					cache.length = localStorage.length;
				} else {
					for (var item in cache.values) {
						if (cache.values[item] !== localStorage.getItem(item)) {
							emit(eventName, event(item, get(item), parse(cache.values[item])));
							cache.values[item] = localStorage.getItem(item);
							break;
						}
					}
				}
			}
		}, 0);
	}

	function event(key, newValue, oldValue) {
		return { key: key, newValue: newValue, oldValue: oldValue };
	}

	function emit(key, newValue, oldValue) {
		this.emit(eventName, { key: key, newValue: newValue, oldValue: oldValue });
	}

	function subscribe(fn) {
		if (document.addEventListener) {
			window.addEventListener(eventName, fn, false);
		} else {
			if (supportsLocalStorage) {
				cache.length = localStorage.length;
				cache.values = {};

				for (var i = localStorage.length, key; i--;) {
					key = localStorage.key(i);
					cache.values[key] = localStorage.getItem(key);
				}
			}

			document.attachEvent('on' + eventName, fn);
		}
	}

	this.get = get;
	this.set = set;

	(function($){
		if($){
			var browser = $.browser;
			if(browser.msie || (browser.opera && ((browser.version + '') < '11.00'))){
				self.emitsToOwnWindow = supportsLocalStorage; //if localStorage is undefined, the storage event doesn't get called so the value should be false
			}
		}
	})(jQuery);

	subscribe(process);


	return this;
}))();





(function (exports) {
	exports.Rewriter = function(config){
		var regex = /^^\s*(?:(https?):\/\/|(\/\/))?([^\/]+\.[^\/]+)?(\/)?(.*)\s*$/;

		config.hosts = config.hosts || {map: {}};

		function decompose(url){
			var parts = regex.exec(url);
			if(!parts) {
				return;
			}
			return {
				protocol: RegExp.$1,
				independent: RegExp.$2,
				host: RegExp.$3,
				relative: RegExp.$4,
				ref: RegExp.$5
			}
		}

		function compose(url) {
			return url.protocol + '://' + url.host + '/' + url.ref;
		}

		function resolve(host, ref) {
			var base = config.hosts.map[host.replace(/www\./,'')];
			if(!base) {
				return;
			}
			return number(ref) + base;
		}

		function number(ref) {
			var hash = 0;
			for(var i= 0, count = ref.length; i < count; i++){
				var ch = ref.charCodeAt(i);
				hash += ch;
			}
			return hash % (config.hosts.max - config.hosts.min) + (+config.hosts.min);
		}

		this.staticRef = function(url, location) {
			if (!location){
				if(window && window.location){
					location = window.location.href;
				} else {
					return url;
				}
			}

			var _url = decompose(url),
				_location = decompose(location);

			if(!_url.protocol && _url.independent) {
				_url.protocol = _location.protocol;
			}

			//resolve relative urls
			if(!_url.host) {
				_url.protocol = _location.protocol;
				_url.host = _location.host;

				//Resolve urls relative to current page
				if(!_url.relative) {
					_url.ref = _location.ref.replace(/\/(?:[^\/\.]+?\.[^\/\.]+?)?$/, '') + '/' + _url.ref;
				}
			}

			var _host = resolve(_url.host, _url.ref);
			if(!_host) {
				return url;
			} else {
				_url.host = _host;
			}

			return compose(_url);
		};
	};
})('system.url'.namespace());





'dom'.namespace();

dom.behaviour = genesis.extended(function(element, $) {
	if (!element)
		return window.console && console.error('Invalid arguments');

	if (!$)
		return window.console && console.error('jQuery required');

	var
		self = this,
		_element = element instanceof jQuery ? element : $(element)

		;

	self.element = function() {
		return _element;
	}

	self.bind = function(event, callback) {
		_element.bind(event, callback);

		return self;
	}

	self.delegate = function(selector, event, handler) {
		_element.delegate(selector, event, handler);
	}

	self.unbind = function(event) {
		_element.unbind(event);

		return self;
	}

	self.trigger = function(event, extra) {
		_element.trigger(event, extra);

		return self;
	}

	self.remove = function() {
		_element.remove();

		return self;
	}

	self.show = function() {
		_element.css({ display: '' });
	}

	self.hide = function() {
		_element.css({ display: 'none' });
	}

	self.bindo = function(data, clone) {
		var context = typeof clone === 'boolean' && !clone
				? _element
				: _element.clone().removeClass('template')
			;

		context.find('*[bind]').add(context.filter('[bind]')).each(function() {
			var fn, context = $(this);

			try {
				eval('fn = function(data) { ' + context.attr('bind') + ';};');
				fn.call(context, data);
			} catch (error) {
				window.console && console.error(error);
			}
		});

		return self;
	}

	return self;
});


// uses dom.behaviour
'dom.data'.namespace();

dom.data.loader = dom.behaviour.extended(function(element, $) {
	var
		self = this,
		_element = this.element()

		;

	self.load = function(url) {
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(data) {
				self.process(data);
			}
			// TODO: on error exception
		});

		return self;
	}

	self.process = function(data) {
		return self.bindo(data);
	}

	// ctor
	return self;
});


// uses dom.behaviour
'dom.data'.namespace();

dom.data.submitter = dom.behaviour.extended(function(element, $) {
	var
		PROCESSING_TIMEOUT = 100,
		SPINNER_FADE = 1000,
		REQUEST_TIMEOUT = 300000
		;

	var
		self = this,
		_element = self.element(),
		_inputs = _element.find('input, select, textarea'),
		_spinner = _element.find('.spinner'),
		_date = new Date(),
		_timeout,
		_processing = false,

		focus = function() {
			var input = _element.find('input[type="text"][value=""]:visible:first');

			input.length
				? input.focus()
				: _element.find('input:visible:first').focus()
			;
		}

		;

	self.check = function() {
		for (var i = 0, l = _inputs.length; i < l; i++) {
			var input = $(_inputs[i]);

			if (input.is(':visible[required="required"][value=""]')) {
				self.unfilled(input);
				return false;
			}
		}

		return true;
	}

	self.unfilled = function(input) {
		input.focus();
	}

	self.focus = function(element) {
		element
			? element.focus
			: focus()
		;
	}

	self.submit = function(e) {
		e.preventDefault();

		if (_processing)
			return;

		if (!self.check())
			return e.preventDefault();

		var dataType = _element.attr('dataType'); // TODO: автоматическое опеределение

		_processing = true;

		$.ajax({
			url: _element.attr('action'),
			dataType: dataType,
			data: _element.serialize(),
			timeout: REQUEST_TIMEOUT,

			success: function(d, s, x) {
				(dataType == 'jsonp' && $.inArray(Math.floor(d / 100), [4, 5]) !== -1)
					? self.error()
					: self.success(d, s, x)
				;
			},
			error: function(x, s, e) { self.error(x, s, e); },
			complete: function(x, s) { self.complete(x, s); }
		});

		_element.removeClass('failed').parent(':first').addClass('processing');
		_spinner.css('opacity', 0);

		_timeout && (_timeout = clearTimeout(_timeout));

		_timeout = setTimeout(function() {
			_spinner.animate({ opacity: 1 }, SPINNER_FADE);
		}, PROCESSING_TIMEOUT);

		_inputs.attr('disabled', 'disabled');

		e.preventDefault();

		return self;
	}

	self.success = function(data, status, request) {
		_element.trigger('success.submit', [data, status, request]);

		return self;
	}

	self.error = function(request, status, error) {
		_element.stop(true).addClass('failed').trigger('error.submit', [request, status, error]);

		return self;
	}

	self.complete = function(request, status) {
		_processing = false;
		_inputs.removeAttr('disabled');
		_element.trigger('complete.submit', [request, status]).parent(':first').removeClass('processing');
		_spinner.stop(true, true);
		_timeout && (_timeout = clearTimeout(_timeout));

		return self;
	}

	// ctor
	_element.bind('submit', function(e) {
		self.submit(e);
	});

	return self;
});




'ui'.namespace()

	.window = (function() {
	var TITLE_FIX_INTERVAL = 200,
		TITLE_FIX_COUNT = 10
		;

	var self = this,
		_document = this.document,
		_element = _document.documentElement

	/*@cc_on
	 , _titleFix,
	 _titleFixCount = 0
	 @*/

		;

	this.resize = function(width, height) {
		if (typeof width === 'object') {
			height = width.height;
			width = width.width;
		}

		width = +width || _element.clientWidth;
		height = +height || _element.clientHeight;

		if (_element.clientWidth === width
			&& _element.clientHeight === height)
			return this;

		this.resizeTo(
			width + ((this.outerWidth - this.innerWidth) || 0),
			height + ((this.outerHeight - this.innerHeight) || 0)
		);

		/*@cc_on
		 if (document.documentElement.style.opacity === undefined) // IE < 9
		 this.resizeTo(
		 width * 2 - _element.clientWidth,
		 height * 2 - _element.clientHeight
		 );
		 @*/

		return this;
	};

	this.title = function(value) {
		if (value === undefined)
			return _document.title;

		_document.title = '';
		_document.title = value;

		/*@cc_on
		 arguments[1] || (_titleFixCount = 0);

		 if (!_titleFix)
		 _titleFix = setInterval(function() {
		 _titleFixCount++;
		 self.title(value, true);

		 if (_titleFixCount === TITLE_FIX_COUNT) {
		 _titleFix = clearInterval(_titleFix);
		 _titleFixCount = 0;
		 }
		 }, TITLE_FIX_INTERVAL);
		 @*/

		return this;
	};

	// jQuery dependency
	this.on = this.bind = function() {
		this.$(this).bind.apply($(this), arguments);
		return this;
	};

	this.unbind = function() {
		this.$(this).unbind.apply($(this), arguments);
		return this;
	};

	/* IBydlo */

	var focusEvent = new system.events.Once();

	function focus() {
		focusEvent();
	}

	function blur() {
		focusEvent = new system.events.Once();
	}

	$.window && $.window.focus(focus);
	$.window && $.window.blur(blur);

	this.whenfocus = focusEvent;

	/* /IBydlo */

	return this;
}).apply(window);





'ui.widgets.multipage'.namespace().presenter = genesis.extended(function (container) {
	var
		self = this
		;

	self.events = {};

	self.events.next = system.events.Event();
	self.events.back = system.events.Event();


	self.ctor = function() {
		container.find('.next').click(self.events.next);
		container.find('.back').click(self.events.back);
	};

	self.activate = function(name) {
		container.find('#' + name).addClass('current').siblings().removeClass('current');
	};

	self.ctor();
	return self;
});


'ui.widgets.multipage'.namespace()
	.controller = genesis.extended(function(presenter, pages) {
	var

		self = this,

		_current

		;

	self.events = {};

	self.getPage = function(page_name) {
		var i, l;
		if (typeof(page_name) === 'number') {
			return pages[page_name] || false;
		}
		for (i = 0, l = pages.length; i < l; i++) {
			if (pages[i].getName() === page_name) {
				return pages[i];
			}
		}
		return false;
	};

	self.getIndex = function(page_name) {
		if (typeof(page_name) === 'number') {
			return page_name;
		} else if (typeof page_name === 'object') {
			for (var i = 0, l = pages.length; i < l; i++) {
				if (pages[i] === page_name) {
					return i;
				}
			}
		} else if (page_name) {
			return self.getIndex(self.getPage(page_name));
		} else if (pages.length) {
			return 0;
		}
		return false;
	};

	self.getCurrent = function() {
		return _current;
	};

	self.go = function(page_name) {
		function activate_page(page) {
			if (_current) {
				_current.deactivate();
			}
			_current = page;
			_current.activate();
			self.events.displayPage(_current.getName());
		}
		if (typeof(page_name) === 'number') {
			return pages.some(function(el, i) {
				if (el === _current && typeof this[i + page_name] !== 'undefined') {
					activate_page(this[i + page_name]);
					return true;
				}
			}, pages);
		} else if (page_name) {
			var page = self.getPage(page_name);
			if (page/* && (!_current || _current !== page)*/) {
				activate_page(page);
				//presenter.activate(page_name);
			}
			return true;
		} else if (pages.length) {
			activate_page(pages[0]);
			//presenter.activate(_current.getName());
			return true;
		}
		return false;
	};

	self.ctor = function (presenter, pages) {
		if (typeof pages === 'undefined' || pages.length === 0) {
			throw new Error('no pages have been given to Multipage constructor');
		}
		presenter.events.next(function() {
			self.go(1);
		});
		presenter.events.back(function() {
			self.go(-1);
		});
		self.go();
	};

	self.events.displayPage = system.events.Event();

	self.ctor(presenter, pages);
	return self;
});


'ui.widgets.multipage'.namespace().factory = genesis.extended(function(container, navigator) {
	var
		self = this,
		getSteps = function(steps) {
			steps = steps || container.find('.step');
			return Array.prototype.map.call(steps, function(el, i) {
				return new self.page.factory(this.eq(i), this.eq(i).attr('id') || ('step-' + i)).get();
			}, steps);
		}
		;
	self.controller = function (presenter, steps) {
		return new ui.widgets.multipage.controller(presenter, steps);
	};
	self.presenter = function (container) {
		return new ui.widgets.multipage.presenter(container);
	};
	self.page = ui.widgets.multipage.page;

	self.bind = function (controller, navigator) {
		navigator.change(function(e) {
			var name = e.value.replace(/^\//, '');
			controller.go(name);
		});
		controller.events.displayPage(function(name) {
			if (navigator.value().replace(/^\//, '') !== name) {
				navigator.value(name);
			}
		});
	};
	self.get = function(steps) {
		var controller = self.controller(self.presenter(container), getSteps(steps));
		self.bind(controller, navigator);
		return controller;
	};
	return self;
});




'ui.widgets.multipage.page'.namespace().presenter = system.events.Emitter.extended(function(container) {
	var
		self = this
		;

	self.events = {};

	self.ctor = function() {
	};

	self.activate = function() {
		//todo: only when in multipage context
		container.addClass('current');
	};

	self.deactivate = function() {
		container.removeClass('current');
	};

	self.ctor();
	return self;
});


'ui.widgets.multipage.page'.namespace().controller = system.events.Emitter.extended(function(presenter, pageName) {
	var
		self = this,
		_pageName,
		_presenter
		;

	self.events = {};

	self.activate = presenter.activate;
	self.deactivate = presenter.deactivate;

	self.getName = function() {
		return _pageName;
	};

	self.ctor = function(presenter, pageName) {
		_pageName = pageName;
		_presenter = presenter;
	};

	self.ctor(presenter, pageName);
	return self;
});


'ui.widgets.multipage.page'.namespace().factory = genesis.extended(function(container, page_name) {
	var
		self = this
		;

	self.controller = function(presenter, page_name) {
		return new ui.widgets.multipage.page.controller(presenter, page_name);
	};

	self.presenter = function(container) {
		return new ui.widgets.multipage.page.presenter(container);
	};

	self.get = function() {
		return self.controller(self.presenter(container), page_name);
	};
	return self;
});




'ui.widgets.menu'.namespace().presenter = genesis.extended(function(elements) {
	var
		self = this
		;

	self.activate = function(name) {
		elements.filter('.current').removeClass('current');
		elements.find('a[name=' + name + ']').parent().addClass('current');
	};

	self.enable = function(name) {
		elements.find('a' + (name ? ('[name=' + name + ']') : '')).attr('href', function() {
			return '#' + this.getAttribute('name');
		});
	};

	self.disable = function(name) {
		elements.find('a' + (name ? ('[name=' + name + ']') : '')).removeAttr('href');
	};

	self.ctor = function() {
		self.enable();
	};

	self.ctor();
	return self;
});




'ui.widgets.multiform'.namespace()
	.presenter = ui.widgets.multipage.presenter.extended(function(container) {
	var
		self = this
		;

	self.ctor = function() {
		var next = container.find('.next').unbind('click');
		if (next.prop('type') !== 'submit') {
			next.click(function(e) {
				if (!container.hasClass('loading')) {
					self.events.next(container);
				}
			});
		}
	};

	self.ctor();

	return self;
});


'ui.widgets.multiform'.namespace()
	.controller = ui.widgets.multipage.controller.extended(function(presenter, pages) {
	var
		self = this,
		base = self.base,
		getIndex = function(form) {
			if (!form) {
				return 0;
			} else if (typeof(form) === 'number') {
				return form;
			} else {
				return self.getIndex(form);
			}
		}
		;

	self.go = function(page_name) {
		var k, current_index, valid = true,
			current = self.getCurrent(),
			needed_index = self.getIndex(page_name)
			;
		if (current) {
			current_index = self.getIndex(current);
			var iter = new iterator({
				data: pages,
				callback: function(iter) {
					valid
						? self.events.enablePage(iter.current.getName())
						: self.events.disablePage(iter.current.getName())
					;
					var page_valid = iter.current.valid();
					if (typeof page_valid === 'function') {
						//TODO: block any ability to navigate pages
						iter.pause();
						page_valid(function(page_valid) {
							if (!page_valid && valid) {
								if (iter.index <= +current_index && iter.index < needed_index) {
									page_name = iter.current.getName();
								}
								valid = false;
							}
							iter.play();
						});
					} else {
						if (!page_valid && valid) {
							if (iter.index <= +current_index && iter.index < needed_index) {
								page_name = iter.current.getName();
							}
							valid = false;
						}
					}
				},
				final_callback: function() {
					//todo: make remote validation callback too, it works because of caching remote validation
					if (current_index < self.getIndex(page_name) && !current.valid()) {
						return false;
					}
					base.go(page_name);
				}
			});
			iter.play();
		} else {
			base.go(page_name);
		}
	};

	self.getJSONData = function(data) {
		data = data || {};
		pages.forEach(function(el) {
			data = el.getJSONData(data);
		});
		return data;
	};

	self.ctor = function(presenter, pages) {
		if (typeof pages === 'undefined' || pages.length === 0) {
			throw new Error('no pages have been given to Multipage constructor');
		}
		self.go();
		function go(container) {
			(getIndex(self.getCurrent()) === pages.length - 1)
				? self.events.submit(self.getJSONData())
				: self.go(1)
			;
		}
		presenter.events.next(go);
		//listen to submit event of form and go next;
		//how to pass container to this submit?
		pages.forEach(function(page, i) {
			page.events.submit(go);
		});
	};

	self.events.enablePage = system.events.Event();
	self.events.disablePage = system.events.Event();
	self.events.submit = system.events.Event();

	self.ctor(presenter, pages);
	return self;
});
/**
 * TODO: move to genesis
 */
var iterator = function(options) {
	this.index = 0;
	this.paused = false;
	var self = this;
	self.pause = function() {
		self.paused = true;
	};
	self.play = function() {
		self.paused = false;
		while (self.index < options.data.length && !self.paused) {
			self.current = options.data[self.index];
			options.callback(self);
			self.index++;
		}
		if (self.index === options.data.length) {
			options.final_callback();
			return true;
		} else {
			return false;
		}
	};
};


'ui.widgets.multiform'.namespace().factory = ui.widgets.multipage.factory.extended(function(container, navigator) {
	var
		self = this
		;
	self.controller = function(presenter, steps) {
		return new ui.widgets.multiform.controller(presenter, steps)
	};
	self.presenter = function(container) {
		return new ui.widgets.multiform.presenter(container);
	};
	self.page = ui.forms.form;

	return self;
});



'ui.widgets'.namespace()

	.toggle = genesis.extended(function (element, classname, binded, bclassname) {
	var
		DEFAULT_CLASSNAME = 'pushed',
		DEFAULT_BCLASSNAME = 'active'
		;

	var
		self = this,
		_element,
		_class,
		_pushed,
		_binded,
		_bclass,

		_disabled = false,

		state = function (state) {
			_element.toggleClass(_class, state);
			_binded.toggleClass(_bclass, state);

			return _pushed = state;
		},

		toggle = function () {
			if (_disabled)
				return;

			self.toggle(state(_pushed = !_pushed));
		}

		;

	self.toggle = system.events.Event();

	self.ctor = function (element) {
		_pushed = (_element = element).click(toggle).hasClass(_class = classname || DEFAULT_CLASSNAME);

		if (binded) {
			_binded = binded;
			_bclass = bclassname || DEFAULT_BCLASSNAME;
		}
	};

	self.push = function () {
		toggle();

		return self;
	};

	self.release = function () {
		if (!_pushed)
			return;

		state(false);

		return self;
	};

	self.disable = function () {
		_disabled = true;

		return self;
	};

	self.enable = function () {
		_disabled = false;

		return self;
	};

	self.ctor(element);
	return self;
})


'ui.widgets'.namespace()

	.FileUploader = genesis.extended(function(doc) {
	var
		self = this,
		_doc,
		_id,
		_uploadForm
		;

	self.ctor = function(doc) {
		_doc = doc;
		_id = 'file-' + Math.round(Math.random() * 1000000);
	};

	self.upload = function(url, fileEl) {
		_uploadForm = $('<form action="' + url + '" target="' + _id + '" method="POST" enctype="multipart/form-data" style="display: none;"></form>');
		var iframe = $('<iframe name="' + _id + '" style="display: none;"></iframe>');
		_doc.find('body')
			.append(iframe)
			.append(_uploadForm)
		;
		fileEl.before('<div id="' + _id + '"></div>');
		_uploadForm.append(fileEl).submit();
	};

	self.finishUploading = function() {
		if (_uploadForm.reset) {
			_uploadForm.reset();
		} else {
			_uploadForm.each(function () {
				if (this.reset) {
					this.reset();
				}
			});
		}
		_doc.find('#' + _id).after(_uploadForm.find(':file')).remove();
		_uploadForm.remove();
		_doc.find('[name="' + _id + '"]').remove();
	};

	self.ctor(doc);
	return self;
});


'ui.widgets'.namespace()

	.StateMachine = function(handlers, states) {
	var currentState = false;
	states = states || [];
	if (typeof states === 'string') {
		states = states.split(' ');
	}

	states.some(function(state) {
		if (handlers.check(state)) {
			currentState = state;
			return true;
		}
	});

	return {
		state: function(newState) {
			if (arguments.length === 0) {
				return currentState;
			}
			newState = newState || false;
			if (currentState === newState) {
				return;
			}
			if (newState && !states.some(function(state) {
				return newState === state;
			})) {
				states.push(newState);
			}
			currentState && handlers.remove(currentState);
			newState && handlers.set(newState);
			currentState = newState;
			return this;
		},
		clear: function() {
			return this.state(false);
		}
	};
};





'ui.forms.element'.namespace().factory = genesis.extended(function(container) {
	var
		self = this
		;

	function compareType(fieldContainer, type) {
		var el = fieldContainer.filter('input');
		if (!el.length) {
			el = fieldContainer.find('input');
		}
		return container.data('type') || el.attr('type') === type || el.prop('type') === type;
	}

	self.get = function() {
		var engine, validator;

		if (validator = container.data('validator')) {
			engine = validator.namespace();
		} else if (container.find('.field ').length) {
			engine = ui.forms.fieldset;
		} else if (compareType(container, 'number')) {
			engine = ui.forms.fields.number;
		} else if (compareType(container, 'checkbox')) {
			engine = ui.forms.fields.checkbox;
		} else {
			engine = ui.forms.fields;
		}
		return new engine.factory(container).get();
	};
	return self;
});


'ui.forms.element'.namespace()

	.controller = system.events.Emitter.extended(function(presenter, validator) {

	var
		self = this,
		_sessionValue,
		_presenter,
		_validator,
		_errors = []
		;

	function onActivate() {
		self.active = true;
		_sessionValue = self.getValue();
		self.emit('changeStart');
	}

	function onDeactivate() {
		var result;

		// If deactivation was called without paired activation.
		// E.g. when refresh page and immediate blurring window in Chrome.
		if (_sessionValue === undefined) {
			return;
		}

		self.active = false;
		if (_sessionValue !== self.getValue()) {
			result = self.valid();
			self.validate(result);
			self.emit('change', result);
		}
		_sessionValue = undefined;
		self.emit('changeEnd', result);
	}

	function onChange() {
		return self.onChange.apply(self, Array.prototype.slice.call(arguments));
	}

	//describe class here temporary
	//TODO: container param is deprecated, remove from any calling new self.error and remove from function declaration
	self.error = function(container, code, message) {
		code = code || false;
		message = message || false;

		this.toString = function() {

			if (message) {
				return message;
			}

			if (code && container) {
				return container.data('message-' + code) || self.getElement().data('message-' + code) || code;
			}

			return 'error';
		};

		this.getCode = function () {
			return code;
		};

		//@deprecated
		this.getLog = function () {
			//todo: remove message as alternative
			return code || message || 'error';
		};
	};

	self.throwError = function(error) {
		_errors.push(error || 'error');
		return self;
	};

	/**
	 * TODO: make reset of errors by additional method.
	 * @return {Array}
	 */
	self.getErrors = function() {
		return _errors;
	};

	self.clearErrors = function () {
		_errors = [];
	};

	self.onChange = function() {
		var result = self.valid();
		if (result !== false) {
			self.validate(result);
			//_sessionValue = self.getValue();
			self.emit('change', result);
		}
	};

	self.validate = function(result) {
		result = arguments.length ? result : self.valid();
		if (typeof result === 'function') {
			var callback = result;
			callback(function(result) {
				if (result === false) {
					presenter.invalid(self.getErrors());
					self.clearErrors();
				} else {
					presenter.valid();
				}
			});
		} else {
			if (result === false) {
				presenter.invalid(self.getErrors());
				self.clearErrors();
			} else {
				presenter.valid();
			}
		}
	};

	self.testEmpty = function() {
		return validator.testEmpty();
	};

	self.focus = function() {
		presenter.focus();
		return self;
	};

	self.enable = function() {
		presenter.enable();
		return self;
	};

	self.disable = function() {
		presenter.disable();
		return self;
	};

	self.getElement = function() {
		return presenter.getElement();
	};

	self.getName = function() {
		return presenter.getName();
	};

	self.getValue = function() {
		return presenter.getValue();
	};

	/**
	 * @param {object} data
	 * @param {primitive} data
	 */
	self.setValue = function(value) {
		var
			type = typeof value,
			name
			;
		if ('number boolean string undefined'.split(' ').indexOf(type) !== -1 || value === null) {
			presenter.setValue(value);
		} else {
			name = self.getName();
			if (name in value) {
				presenter.setValue(value[name]);
			}
		}
		return self;
	};

	self.getJSONData = function(data) {
		var name = presenter.getName(),
			value = self.getValue()
			;
		data = data || {};
		if (typeof value !== 'undefined') {
			if (name) {
				data[name] = value;
			} else if (data instanceof Array) {
				data.push(value);
			}
		}
		return data;
	};

	self.refreshElement = function() {
	};

	self.ctor = function(presenter, validator) {
		_presenter = presenter;
		_validator = validator;

		_validator.on('error', function(container, code, message) {
			//console.log(self.getName())
			self.throwError(new self.error(container, code, message));
		});

		//hack for ui.forms.fields.file.presenter. Move error generating from presenter to validator.
		_presenter.on('error', function(container, code, message) {
			self.throwError(new self.error(container, code, message));
		});

		_presenter.remove('change')
			.on('change', onChange)
			.on('changeStart', onActivate)
			.on('changeEnd', onDeactivate)
		;

	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.element'.namespace()

	.presenter = system.events.Emitter.extended(function(container) {
	var self = this
		, _disabled = false
		, _container
		, _state
		;

	/**
	 *
	 *
	 * @return {jQuery} Container for error messages
	 * @private
	 */
	self._getMessageContainer = function() {
		return container.find('.validation-message');
	};

	self.disabled = function() {
		return _disabled;
	};

	self.enable = function() {
		_disabled = false;
		self.getElement().attr('disabled', false);
	};

	self.disable = function() {
		_disabled = true;
		self.getElement().attr('disabled', 'disabled');
	};

	self.valid = function() {
		self._getMessageContainer().hide();
		container.removeClass('invalid');
		_state.clear();
	};

	self.invalid = function(errors) {
		var error = self.getMessage(errors);
		container.addClass('invalid');

		if (error) {

			//check for getCode method presence
			//todo: fix absense of getCode in error object and remove this condition
			if (errors[errors.length - 1].getCode) {
				_state.state(errors[errors.length - 1].getCode());
			} else {
				//debugger
			}

			self._getMessageContainer()
				.show()
				.html(error)
			;
		} else {
			//throw new Error('no error object');
		}
	};

	self.getElement = function() {
		return container.find('input, select, textarea');
	};

	self.getName = function() {
		var el;
		return container.data('name')
			|| (el = self.getElement()).data('name')
			|| el.attr('name');
	};

	self.getParam = function(name) {
		return container.data(name);
	};

	self.getMessage = function(errors) {
		if (!errors || !errors.length) {
			return;
		}
		return errors[errors.length - 1].toString();
	};

	self.ctor = function(container) {
		_container = container;
		_state = new ui.widgets.StateMachine({
			check: function(state) {
				return _container.hasClass('invalid-' + state);
			},
			set: function(state) {
				_container.addClass('invalid-' + state);
			},
			remove: function(state) {
				_container.removeClass('invalid-' + state);
			}
		});

	};

	//self.nativeValidate = typeof $('<input>').prop('validity') === 'object';
	self.nativeValidate = false;

	self.ctor(container);

	return self;
});


'ui.forms.element'.namespace()
	.validator = system.events.Emitter.extended(function(container) {
	var
		self = this,

		_container,
		_validation_progress = false
		;

	self.validate = function(event) {
		var fail = self.getValidators().some(function(validatorName) {
			var valid = self['test' + validatorName]();
			if (!valid) {
				self.publish('error', container, validatorName.replace(/(?!^)([A-Z]+)/, '-$1').toLowerCase());
			}
			return !valid;
		});

		return !fail;

		/*
		 var
		 validators,
		 invalid = false
		 ;

		 if (_validation_progress !== false) {
		 return;
		 }
		 validators = self.getValidators();
		 _validation_progress = _validation_progress || 0;

		 while (_validation_progress < validators.length) {
		 invalid = validators[_validation_progress]();
		 if (typeof invalid === 'function') {
		 _validation_progress += 1;
		 invalid((function(event) {
		 return function(status) {
		 if (status) {
		 self.validate(event);
		 } else {
		 self.events.invalid();
		 _validation_progress = false;
		 event(false);
		 }
		 }
		 })(event || new system.events.Event()));
		 return;
		 } else if (!invalid) {
		 break;
		 }
		 _validation_progress += 1;
		 }

		 invalid ? self.events.valid() : self.events.invalid();
		 _validation_progress = false;

		 if (event) {
		 event(invalid);
		 return;
		 }
		 return invalid;
		 */
	};

	self.getValidators = function() {
		return [];
	};

	self.ctor = function(container) {
		_container = container;
	};

	//private method
	self.propRequired = function(field) {
		var required = field.prop('required')
			;

		//for browsers, which do not support 'required' property (not attribute)
		if (typeof required !== 'boolean') {
			required = !!field.attr('required');
		}
		return required;
	};

	self.ctor(container);

	return self;
});




'ui.forms.fields'.namespace().factory = genesis.extended(function(container) {
	var
		self = this
		;

	self.controller = function(presenter, validator) {
		return new ui.forms.fields.field.controller(presenter, validator);
	};

	self.presenter = function(container) {
		return new ui.forms.fields.field.presenter(container);
	};

	self.validator = function(container) {
		return new ui.forms.fields.field.validator(container);
	};

	self.get = function() {
		var presenter = new self.presenter(container),
			validator = new self.validator(container),
			controller = new self.controller(presenter, validator);
		return controller;
	};
	return self;
});



'ui.forms.fields.field'.namespace()

	.presenter = ui.forms.element.presenter.extended(function(container) {
	var
		self = this
		;

	self.getType = function() {
		var tagName = self.getElement().prop('tagName').toLowerCase();
		if (tagName !== 'input') {
			return tagName;
		}
		return container.data('type') ||
			self.getElement().attr('type') ||
			self.getElement().prop('type');
	};

	self.getElement = function() {
		var el = container.filter('input, select, textarea');
		if (!el.length) {
			el = container.find('input, select, textarea');
		}
		return el;
	};

	self.getValidateURL = function() {
		return container.data('validate-url');
	};

	self.focus = function() {
		var el = self.getElement();
		el.length && !el[0].disabled && el[0].focus();
	};

	/**
	 * TODO: split into select, radio etc. classes
	 */
	self.getValue = function() {
		var el = self.getElement();
		if (el.prop('type') === 'radio') {
			return container.find('input:radio:checked').val();
		}
		return el.val();
	};

	self.setValue = function(value) {
		var el = self.getElement(), radio;
		if (el.prop('type') === 'radio') {
			radio = container.find('input:radio');
			radio.prop('checked', false).filter('[value="' + value + '"]').prop('checked', true);
			if (!radio.filter(':checked').length) {
				radio.filter(':first').prop('checked', true);
			}

		} else {
			el.val(value);
		}
		return self;
	};

	self.ctor = function(container) {
		var el = self.getElement()
			, value
			, sessionValue
			, type = self.getType()
			;

		(type === 'select' || type === 'radio') && el.change(function () {
			value = self.getValue();
			self.emit('change');
		});

		self.getType() === 'select' && el.change(function () {
			value = self.getValue();
			self.emit('change');
		});

		el.focus(function() {
			value = self.getValue();
			sessionValue = value;
			self.emit('changeStart');
		}).blur(function() {
				if (sessionValue !== self.getValue()) {
					self.emit('change');
				}
				self.emit('changeEnd');
			});


		ui.forms.fields.checkInputEvent(function () {
			el.bind('input', function() {
				self.emit('change');
			});
		}, function () {
			el.keyup(function() {
				if (value !== self.getValue()) {
					self.emit('change');
					value = self.getValue();
				}
			});
		});

	};

	self.ctor(container);
	return self;
});


'ui.forms.fields.field'.namespace().controller = ui.forms.element.controller.extended(function(presenter, validator) {

	//todo: remove validator mapping
	this.validator = validator;

	this.valid = function() {
		return validator.validate();
	};

	return this;
});


'ui.forms.fields.field'.namespace()
	.validator = ui.forms.element.validator.extended(function(container) {
	var
		self = this,

		_container,
		_field
		;

	self.getValidators = function() {
		return [
			'Required',
			'Pattern',
			'MinMax'
		];
	};

	self.testRequired = function() {
		return !self.propRequired(_field) || !self.testEmpty();
	};

	/**
	 * Test even if no required property is set.
	 * todo: support check radiobutton
	 */
	self.testEmpty = function() {
		var val
			, selectedElement
			;
		if (_field.attr('type') === 'checkbox') {
			return !_field[0].checked;
		} else if (_field.attr('type') === 'radio') {
			selectedElement = _field.filter('input:radio:checked');
			return !selectedElement.length || !selectedElement.val();
		} else if (_field[0].nodeName === 'SELECT') {
			val = _field.val();
			return !val || !val.trim() || val === '0';
		}
		return !_field.val().trim();
	};

	self.testPattern = function() {
		var empty = self.testEmpty();
		if (empty) {
			return true;
		}
		var pattern = _field.attr('pattern');
		if (pattern) {
			try {
				var re = new RegExp(pattern);
				return re.test(_field.val());
			} catch (e) {
				throw e;
			}
		}
		return true;
	};

	self.testMinMax = function() {
		var empty = self.testEmpty();
		if (empty) {
			return true;
		}
		var min = _field.attr('min'),
			max = _field.attr('max'),
			val;
		if (min || max) {
			val = +_field.val();
			return (!min || val >= min) && (!max || val <= max);
		}
		return true;
	};

	self.ctor = function(container) {
		_container = container;
		_field = _container.filter('input, textarea, select');
		if (!_field.length) {
			_field = _container.find('input, textarea, select');
		}
	};

	self.ctor(container);

	return self;
});





'ui.forms.fields.creditcard'.namespace()

	.factory = ui.forms.fields.factory.extended(function(container) {
	var
		self = this
		;

	self.controller = function(presenter, validator) {
		return new ui.forms.fields.creditcard.controller(presenter, validator);
	};

	self.presenter = function(container) {
		return new ui.forms.fields.creditcard.presenter(container);
	};

	return self;
});


'ui.forms.fields.creditcard'.namespace()

	.controller = ui.forms.fields.field.controller.extended(function(presenter, validator) {

	var
		self = this,
		_presenter,
		_validator
		;

	self.getJSONData = function(data) {
		var name = presenter.getName();
		data = data || {};
		if (name) {
			data[name] = _presenter.getProcessedValue();
		}
		return data;
	};

	self.ctor = function(presenter, validator) {
		_presenter = presenter;
		_validator = validator;
	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.fields.creditcard'.namespace()

	.presenter = ui.forms.fields.field.presenter.extended(function() {

	this.getProcessedValue = function() {
		return this.getValue().replace(/[^\d]+/g, '');
	};

	return this;
});




'ui.forms.fields.checkbox'.namespace()

	.factory = ui.forms.fields.factory.extended(function(container) {
	var
		self = this
		;

	self.presenter = function(container) {
		return new ui.forms.fields.checkbox.presenter(container);
	};

	self.controller = function(presenter, validator) {
		return new ui.forms.fields.checkbox.controller(presenter, validator);
	};

	return self;
});


'ui.forms.fields.checkbox'.namespace()

	.controller = ui.forms.fields.field.controller.extended(function(presenter) {

	this.getNativeValue = function(value) {
		return presenter.getElement()[0].getAttribute('value');
	};

	return this;
});


'ui.forms.fields.checkbox'.namespace().presenter = ui.forms.fields.field.presenter.extended(function () {

	var self = this
		;

	self.getValue = function() {
		var el = self.getElement()
			, value = el[0].getAttribute('value')//el.attr('value') always returns 'on'
			;
		if (el.prop('checked')) {
			// in fact there should not check value.length, because if value is present (even empty string) it should be
			// returned, not true/false. But in many forms value has been already put into input-element as value="".
			return ((typeof value === 'string' && value.length) ? value : true);
		}
		return ((typeof value === 'string' && value.length) ? undefined : false);
	};

	self.setValue = function(value) {
		var el = self.getElement()
			, checked = false
			;

		if ('boolean' === typeof value) {
			checked = value;
		} else {
			checked = value.toString && el[0].getAttribute('value') === value.toString();
		}
		el.prop('checked', checked);

		return self;
	};

	self.ctor = function() {
		self.getElement().click(function() {
			self.emit('change').emit('changeEnd');
		});
	};

	self.ctor();

	return self;

});




'ui.forms.fields.number'.namespace()

	.factory = ui.forms.fields.factory.extended(function(container) {
	var
		self = this
		;

	self.presenter = function(container) {
		return new ui.forms.fields.number.presenter(container);
	};

	return self;
});


'ui.forms.fields.number'.namespace()

	.presenter = ui.forms.fields.field.presenter.extended(function(container) {
	var
		KEYS = {
			UP: 38,
			DOWN: 40
		},

		self = this
		;

	function validateValue(el, increment) {
		var
			value,
			processedValue,
			max = el.prop('max'),
			min = el.prop('min')
			;

		increment = +increment;
		value = self.getValue().replace(/^.*?(\d+).*$/, '$1');
		if (!value.length) {
			el.val(value);
			return;
		}

		processedValue = +value;

		max = (typeof max === 'string' && max.length) ? +max : false;
		min = (typeof min === 'string' && min.length) ? +min : false;

		if ((min !== false && processedValue < min && (processedValue = min)) || (max !== false && processedValue > max && (processedValue = max))) {
			el.val(processedValue);
			return;
		}

		if (increment && (max === false || processedValue + increment <= max) && (min === false || processedValue + increment >= min)) {
			processedValue = processedValue + increment
		} else if (!value.length) {
			return;
		}
		el.val(processedValue);
	}

	self.getValue = function() {
		if (self.nativeValidate) {
			return self.getElement().val();
		} else {
			return self.getElement().val().replace(/[^\d]+/g, '');
		}
	};

	self.ctor = function(container) {
		var
			el = self.getElement(),
			value,
			sessionValue
			;

		!self.nativeValidate && el.keydown(function(e) {
			if (e.altKey || e.ctrlKey || e.metaKey) {
				return;
			}
			//todo: make more stable and check for MacOS keycodes.
			if (e.which === KEYS.UP) {
				validateValue(self.getElement(), 1);
				e.preventDefault();
			} else if (e.which === KEYS.DOWN) {
				validateValue(self.getElement(), -1);
				e.preventDefault();
			}
			if ((e.which > 64 && e.which < 91) || (e.which > 105 && e.which < 112) || e.which > 185) {
				e.preventDefault();
			}
		});

		//todo: prevent several event subscriptions if field creates several times.
		el.focus(function() {
			value = self.getValue();
			sessionValue = value;
			self.emit('changeStart');
		}).blur(function() {
				if (!self.nativeValidate) {
					validateValue(self.getElement());
				}
				if (sessionValue !== self.getValue()) {
					self.emit('change');
				}
				self.emit('changeEnd');
			});

		ui.forms.fields.checkInputEvent(function () {
			el.bind('input', function() {
				self.emit('change');
			});
		}, function () {
			el.keyup(function() {
				if (value !== self.getValue()) {
					self.emit('change');
					value = self.getValue();
				}
			});
		});

	};

	self.ctor(container);
	return self;
});




'ui.forms.fields.file'.namespace()
	.factory = ui.forms.fields.factory.extended(function(container) {
	var
		NS = ui.forms.fields.file,
		self = this
		;

	self.controller = function(presenter, validator) {
		return new NS.controller(presenter, validator);
	};

	self.presenter = function(container) {
		return new NS.presenter(container, new ui.widgets.FileUploader($(window.document)));
	};

	self.validator = function(container) {
		return new NS.validator(container);
	};

	return self;
});


'ui.forms.fields.file'.namespace().controller = ui.forms.fields.field.controller.extended(function(presenter, validator) {
	'use strict';

	var self = this
		, _presenter
		, _validator
		;

	//Temporary hack for fields, which make asynchronous validation.
	self.inProgress = function () {
		return _presenter.inProgress();
	};

	//describe class here temporary
	self.error = function (container, code) {
		code = code || false;

		this.toString = function () {
			return code ? (container.data('message-' + code) || self.getElement().data('message-' + code) || code) : 'error';
		};

		this.getLog = function () {
			return code || 'error';
		};

	};

	self.getJSONData = function (data) {
		var name = self.getName();

		if (!data) {
			data = name ? {} : [];
		}

		if (data instanceof Array) {
			if (!self.testEmpty()) {
				data.push(self.getValue());
			}
		} else {
			data[name] = self.getValue();
		}

		return data;
	};

	self.onChange = function (element) {
		var validateResult = self.valid();
		self.validate(validateResult);
		if (validateResult) {
			self.emit('change', validateResult, element);
		}
	};

	self.testEmpty = function () {
		return !self.getValue();
	};

	self.validate = function (result) {
		result = arguments.length ? result : self.valid();
		if (typeof result === 'function') {
			var callback = result;
			callback(function (result) {
				if (result === false) {
					presenter.invalid(self.getErrors());
					self.clearErrors();
				} else {
					presenter.valid();
				}
			});
		} else {
			if (result === false) {
				presenter.invalid(self.getErrors());
				self.clearErrors();
			} else {
				presenter.valid();
			}
		}
	};

	self.ctor = function (presenter, validator) {
		_presenter = presenter;
		_validator = validator;
		_presenter.on('fileUploadError', function (container, fileData) {
			var args = Array.prototype.slice.call(arguments);
            args.unshift('fileUploadError');
			self.emit.apply(self, args);
			self.throwError(new self.error(container, fileData.error));
			presenter.invalid(self.getErrors());
			self.clearErrors();
		}).on('fileUploaded', function () {
				var args = Array.prototype.slice.call(arguments);
				args.unshift('fileUploaded');
				self.emit.apply(self, args);
			}).on('fileRemoved', function () {
				var args = Array.prototype.slice.call(arguments);
				args.unshift('fileRemoved');
				self.emit.apply(self, args);
			});
	};

	self.ctor(presenter, validator);

	return self;
});


'ui.forms.fields.file'.namespace().presenter = ui.forms.fields.field.presenter.extended(function(container, fileUploader) {
	var FILE_UPLOAD_TIMEOUT = 600000//10 min * 60 sec * 1000 ms
		, DEFAULT_ERROR_MESSAGE = 'upload-error'

		, self = this
		, base = this.base

		, _container
		, _element
		, _containerState
		, _uploadTimeout
		;

	function fileUploadHandler(fileData) {
		var info = window.fileUploadHandler.uploadsPlaceholders[fileData.key]
			;

		if (!info) {
			return;
		}

		window.fileUploadHandler.uploadsPlaceholders[fileData.key] = null;
		//clearTimeout(info.timeout);
		(function(fileData, info) {
			var self = info.fileField
				, _containerState = info.state
				, _container = info.container
				;

			info.uploader.finishUploading();
			if (fileData.error) {
				self.emit('fileUploadError', _container, fileData);
				return;
			}

			_containerState.state('uploaded');
			self.getElement().data('value', '');
			_container.find('[type=hidden]').val(fileData.fileid);//change hidden before event
			self.emit('fileUploaded', _container, fileData);

		}).prolong(info.time, 600, fileData, info);
	}

	self.getElement = function() {
		if (_element) {
			return _element;
		}
		var el = container.filter(':file');
		if (!el.length) {
			el = container.find(':file');
		}
		return (_element = el);
	};

	self.getValue = function() {
		return container.find('[type=hidden]').val();
	};

	self.setValue = function(value) {
		if (value) {
			_containerState.state('uploaded');
			self.getElement().data('value', '');
			_container.find('[type=hidden]').val(value);
		}
		return self;
	};

	//todo: block form sending while file uploading
	self.valid = function() {
		//getMessageContainer().hide();
		//if valid is calling when file was not selected and is not uploading
		if (!self.getElement().data('value')) {
			return;
		}

		if (_uploadTimeout) {
			clearTimeout(_uploadTimeout);
		}
		_containerState.state('uploading');

		var now = +new Date()
			;

		window.fileUploadHandler.uploadsPlaceholders[self.getElement().attr('name')] = {
			container: _container,
			uploader: fileUploader,
			time: now,
			fileField: self,
			state: _containerState
			//timeout: timeout
		};

		(function() {
			fileUploader.upload(self.getValidateURL(), self.getElement());
		}).prolong(now, 600);

		_uploadTimeout = setTimeout(function () {
			var name
				;
			//if iframe was loaded but fileUploadHandler did not call (check it by presence uploadsPlaceholders[name])
			if (window.fileUploadHandler.uploadsPlaceholders[name = self.getElement().attr('name')]) {
				window.fileUploadHandler.uploadsPlaceholders[name] = null;
				fileUploader.finishUploading();
				self.emit('fileUploadError', container, {error: DEFAULT_ERROR_MESSAGE});
			}
		}, FILE_UPLOAD_TIMEOUT);

	};

	self.invalid = function(errors) {
		base.invalid(errors);
		_containerState.state('invalid');
		self.getElement().data('value', '');
	};

	self.inProgress = function () {
		return _container.hasClass('uploading');
	};

	self.ctor = function(container) {
		_container = container;
		_containerState = new ui.widgets.StateMachine({
			check: function(state) {
				return _container.hasClass(state);
			},
			set: function(state) {
				_container.addClass(state);
			},
			remove: function(state) {
				_container.removeClass(state);
			}
		}, 'uploading invalid uploaded');

		_container.find('[data-name=remove]').click(function(e) {
			e.stopPropagation();
			e.preventDefault();
			if (!self.disabled()) {
				_containerState.clear();
				_container.find('[type=hidden]').val('');
				self.emit('fileRemoved', _container);
			}
		});
		if (!window.fileUploadHandler) {
			window.fileUploadHandler = fileUploadHandler;
			window.fileUploadHandler.uploadsPlaceholders = [];
		}
		self.getElement().unbind('focus blur change').change(function() {
			self.getElement().data('value', self.getElement().val());
			self.emit('change', self.getElement());
		});
	};

	self.ctor(container);
	return self;
});


'ui.forms.fields.file'.namespace()
	.validator = ui.forms.fields.field.validator.extended(function(container) {
	var
		CONTENT_TYPE_FILEXTS = {
			'image/png': 'png',
			'image/jpeg': ['jpg', 'jpeg', 'jpe'],
			'image/gif': 'gif',
			'image/bmp': 'bmp',
			'image/tiff': ['tiff', 'tif']
		},

		self = this,
		_field
		;

	_field = container.filter(':file');
	if (!_field.length) {
		_field = container.find(':file');
	}

	self.getValidators = function() {
		var validators = [];

		if (_field.data('value')) {
			validators.push('ContentType');
		}

		if (_field.val().length) {
			validators.push('Size');
		}
		if (!_field.data('value')) {
			validators.push('Required');
		}

		//validators.push('ServerValidationPassed');

		return validators;
	};

//	self.testServerValidationPassed = function() {
//		var event = new system.events.Event();
//
//		var callback = function() {
//			alert('!');
//			event(true);
//		};
//		setTimeout(callback, 2000);
//		return event;
//	};

	self.testSize = function() {
		var
			size = container.data('size'),
			files
			;
		if (!size || !(files = _field.prop('files')) || !files.length) {
			return true;
		}
		size = system.text.size2bytes(size);
		return !Array.prototype.some.call(files, function(file) {
			if (file.size > size) {
				return true;
			}
		});
	};

	self.testRequired = function() {
		return !self.propRequired(_field) || !self.testEmpty();
	};

	self.testEmpty = function() {
		return !container.find('[type=hidden]').val();
	};

	self.testContentType = function() {
		var accept = (_field.attr('accept') || '').split(',')
			, ext
			, files = _field.prop('files')
			;

		accept.forEach(function(el, i) {
			accept[i] = accept[i].trim();
		});

		if (files) {
			return !files.length || !Array.prototype.some.call(files, function(file) {
				return accept.indexOf(file.type) === -1;
			});
		}

		//for browsers, which do not support HTML5 File API
		ext = _field.data('value').replace(/^.*?\.([^.]+)$/, '$1').toLowerCase();
		return accept.some(function(item) {
			var filexts = CONTENT_TYPE_FILEXTS[item];
			if (typeof filexts === 'undefined') {
				//throw new TypeError();
				return false;
			}
			if (typeof filexts === 'string') {
				filexts = [filexts];
			}
			return filexts.some(function(item) {
				return ext === item;
			});
		});
	};

	self.ctor = function() {
	};

	self.ctor();
	return self;
});


'ui.forms.fields.file2'.namespace()
.factory = ui.forms.fields.file.factory.extended(function(container) {
	var
	NS = ui.forms.fields.file2,
	self = this
	;

	self.controller = function(presenter, validator) {
		return new NS.controller(presenter, validator, container);
	};

	self.presenter = function(container) {
		return new NS.presenter(container, new ui.widgets.FileUploader($(window.document)));
	};

	return self;
});


'ui.forms.fields.file2'.namespace()
.controller = ui.forms.fields.file.controller.extended(function(presenter, validator, container) {
	var
	self = this,

	_presenter,
	_validator,
	_container,
	_reader = window.FileReader && new FileReader()
	;

	self.ctor = function(presenter, validator, container) {
		_presenter = presenter;
		_validator = validator;
		_container = container;
		_presenter
		.on('fileUploaded', function(container, fileData) {
			if (!container.hasClass('preview')) {
				presenter.setPreview(fileData.fileid);

			}
		}).on('fileUploadError fileRemoved', function(container) {
			_reader && (_reader.readyState === _reader.LOADING) && _reader.abort();
			_presenter.setPreview();
		});

		self.on('change', function(validationResult, element) {
			//clear previous preview
			_presenter.setPreview();

			if (!_reader || !element) {
				return;
			}

			//below is for thumbnails, test in Safari, Chrome does not support local files, Firefox works fine.
			var files = element.prop('files')
			;

			//don't preview files more than 1MB
			if (!files || !files.length || files[0].size > Math.pow(2, 20)) {
				return;
			}

			_reader.onload = function (e) {
				//if image was already uploaded and thumbnail was taken from server.
				if (_container.hasClass('preview')) {
					return;
				}

				_presenter.setPreview(e.target.result);
			};

			_reader.readAsDataURL(files[0]);

		});
	};

	self.ctor(presenter, validator, container);

	return self;
});


'ui.forms.fields.file2'.namespace()

.presenter = ui.forms.fields.file.presenter.extended(function(container, fileUploader) {
	var
	self = this,

	_container
	;

	self.setPreview = function (src) {
		var dimensionsImg = document.createElement('img')
			, preview = _container.find('img[data-name=preview]')
			, width = +preview.data('width')
			, height = +preview.data('height')
			;

		if (!src) {
			preview.attr('src', '');
			_container.removeClass('preview');
			return;
		}

		if (!width || !height) {
			preview.attr('src', src);
			_container.addClass('preview');
			return;
		}

		dimensionsImg.onload = function () {
			var vertical = width * dimensionsImg.height >= height * dimensionsImg.width
			;

			var calcWidth = dimensionsImg.width * height / dimensionsImg.height;
			var calcHeight = dimensionsImg.height * width / dimensionsImg.width;
			
			preview.attr('src',src).css({
				"width": vertical ? (width + 'px') : (calcWidth + 'px'),
				"height": vertical ? (calcHeight + 'px') : (height + 'px'),
				"margin-left": vertical ? -width / 2 + 'px' : -calcWidth / 2 + 'px',
				"margin-top": vertical ? -calcHeight / 2 + 'px' : -height / 2 + 'px'
			});
			
			_container.addClass('preview');
		};

		dimensionsImg.src = src;

	};

	self.setValue = function(value) {
		self.base.setValue(value);
		self.setPreview(value || '');
	};

	self.ctor = function(container) {
		_container = container;
	};

	self.ctor(container);

	return self;
});




/**
 * http://blog.danielfriesen.name/2010/02/16/html5-browser-maze-oninput-support/
 * http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
 */
'ui.forms.fields'.namespace().checkInputEvent = function input(success, error) {

	'use strict';

	var inputElement, ie, e, undef;

	if (input.support !== undef) {
		if (input.support) {
			success();
		} else {
			error();
		}
		return;
	}

	//ignore support in IE9, because it does not work for delete symbols.
	//IE lt 9 does not support input event.
	ie = (function () {
		var div = document.createElement('div');
		div.innerHTML = '<!--[if IE ]><i></i><![endif]-->';
		return !!div.getElementsByTagName('i')[0];
	}());
	if (ie) {
		input.support = false;
		error();
		return;
	}

	inputElement = document.createElement('input');

	if (inputElement.hasOwnProperty('oninput')) {
		input.support = true;
		success();
		return;
	}

	inputElement.setAttribute('oninput', 'return;');

	if (typeof inputElement.oninput === 'function') {
		input.support = true;
		success();
		return;
	}

	try {//for Firefox till at least version 3.6
		e = document.createEvent('KeyboardEvent');
		e.initKeyEvent('keypress', true, true, window, false, false, false, false, 0, 'e'.charCodeAt(0));
		document.body.appendChild(inputElement);
		inputElement.addEventListener('input', function (e) {
			input.support = true;
			success();
			e.preventDefault();
			e.stopPropagation();
		}, false);
		inputElement.focus();
		inputElement.dispatchEvent(e);
		document.body.removeChild(inputElement);

		setTimeout(function () {
			if (input.support === undef) {
				input.support = false;
				error();
			}
		}, 0);

	} catch (err) {
		input.support = false;
		error();
	}
};




'ui.forms.form'.namespace().presenter = ui.widgets.multipage.page.presenter.extended(function(container) {
	var _active_element = false;//IE only
	var
		self = this,
		base = self.base,
		_form = container.closest('form'),
		_original_submit = _form.length ? _form[0].onsubmit : null,
		_submitButtonClicked = false,
        _submitButtons,
        _states,

		onsubmit = function(e) {
			//todo: make submit preventing to controller (or even move up from controller to multipage)
			var active_element;

            if ((_states && !_submitButtonClicked) || _submitButtons.filter('[disabled=disabled]').length !== 0) {
                return false;
            }

			// if (!_form.parents('form').length) {//if this is not form in form (E.g. this is ASP WebForms)
			if ((_form.length && _form[0] === container[0]) || _submitButtonClicked || (function () {
				active_element = $(_active_element || document.activeElement);
				while (active_element.length && active_element[0] !== container[0]) {
					active_element = active_element.parent();
				}
				return active_element.length;
			})()) {
				e.preventDefault();
				self.events.submit(container);
			} else if (_original_submit) {
				_original_submit.apply(_form[0]);
			}
			_submitButtonClicked = false;
		}
		;

	self.ctor = function() {
        // IE before calling submit event handlers switches their focus to <input type="submit"...> element.
		// That's why we can not get activeElement to detect if we submit login-form or registration-form.
		// TODO: check this case in another browsers, e.g. Opera. In Chrome all is OK.
		$.browser.msie && setTimeout(function timeout() {
			_active_element = document.activeElement;
			setTimeout(timeout, 200);
		}, 200);

		if (!_form.length) {
			//not keyup or keypress, because suggest and expanded "select" will also generate keypress
			container.keydown(function(e) {
				if (e.which === 13 && e.target.nodeName !== 'TEXTAREA') {
					e.preventDefault();
					e.stopPropagation();
					self.events.submit(container);
				}
			});
		}

        container.on('keypress', function(e) {
            var code = e.keyCode ? e.keyCode : e.which;

            if (code !== 13 && !_submitButtonClicked) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            _submitButtonClicked = true;
            container.find('[type="submit"]:enabled').first().trigger('click');
            _submitButtonClicked = false;
        });

	};

	self.valid = function() {
	};

	self.invalid = function(errors) {
	};

	self.activate = function(state) {
        _submitButtons = container.find('[type=submit]');
        state && (_submitButtons = _submitButtons.filter('[value*="' + state + '"]'));

        _submitButtons.each(function(i, node) {

            if ($(node).data('lockable')){
                return;
            }

            $(node).data('lockable', node.getAttribute('disabled') ? 'true' : 'false');
        });
        _submitButtons.click(function () {
			_submitButtonClicked = true;
		});

		base.activate();
		_form.prop('originalOnsubmit', _form.attr('onsubmit'));
		_form.removeAttr('onsubmit')
			.prop('originalNovalidate', !!_form.prop('noValidate'))
			.prop('noValidate', true)
			.bind('submit', onsubmit);

		if ($.browser.opera) {
			_form.attr('novalidate', 'novalidate'); // Opera do not recognize novalidate as property
		}

		container.find('*[autofocus]').eq(0).focus();
        self.activated = true;
	};

    self.toggleStates = function(states) {
        _states && _states.forEach(function(st) {
            container.toggleClass(st, false);
        });

        _states = states;

        _states.forEach(function(st) {
            container.toggleClass(st, true);
        });

    }

	self.deactivate = function() {
		base.deactivate();

		if (!_form.prop('originalNovalidate')) {
			_form
				.prop('novalidate', false)
				.removeAttr('novalidate')
			;
		}

		_form
			.unbind('submit', onsubmit)
			.attr('onsubmit', _form.prop('originalOnsubmit'))
		;

        self.activated = false;
    };

	self.disable = function() {
        _submitButtons.attr('disabled', 'disabled');
		return self;
	};

	self.enable = function() {
        _submitButtons.attr('disabled', false);
		return self;
	};

	self.events.submit = system.events.Event();

    self.toggleSubmitButtons = function(state) {
        var buttons = _submitButtons.filter(function() {
            return $(this).data('lockable') !== 'false';
        });

        state
                ? buttons.removeAttr('disabled')
                : buttons.attr('disabled', 'disabled');

    };



	self.ctor();
    self.activated = false;

	return self;
});


'ui.forms.form'.namespace().controller = ui.widgets.multipage.page.controller.extended(function(presenter, page_name, EventManager) {
	var
		self = this,
	//todo: store validation state in field object
		_validationState = false,
		_fields = [],
		_disabled = false;

	//Temporary hack for fields, which make asynchronous validation.
	function validationInProgress() {
		return _fields.some(function (field) {
			return field.inProgress && field.inProgress();
		});
	}

    function validateRequiredField(fields, callback) {

        return function(field) {
            var node = field.getElement(),
                current = null;

            function check(){
                var validFields = fields.filter(function(f) {return f.valid()}),
                    state;

                state = validFields.length === fields.length;

                if (current === state) {
                    return;
                }

                current = state;
                callback(current);
            }

            if(node.data('listen')) {

                node
                    .off('change', check)
                    .off('input', check)
                    .off('keyup', check);

            }

            node
                .on('change', check)
                .on('input', check)
                .on('keyup', check);

            node.data('listen', true);

            check();
        };

    }

	function validate () {
		_validationState = [];
		_fields.forEach(function (field) {
			_validationState.push({
				name: field.getName(),
				field: field,
				valid: field.valid()
			});
		});
	}

	function focusInvalid() {
		_validationState && _validationState.some(function (data) {
			!data.valid && data.field.focus();
			return !data.valid;
		});
		return self;
	}

	self.addField = function (field) {
		_fields.push(field);
	};

	self.attachField = function (field) {
        var node = field.getElement();

        node.attr('tabindex', 2);
		self.addField(field);
		return self;
	};

	self.detachField = function (field) {
		var node = field.getElement();

        _fields = _fields.filter(function(f) {
            return f.getElement().get(0) !== field.getElement().get(0);
        });

        node.attr('tabindex', 1);
		return self;
	};

	self.getField = function(name) {
		var i, l;
		for (i = 0, l = _fields.length; i < l; i++) {
			if (_fields[i].getName() === name) {
				return _fields[i];
			}
		}
		return false;
	};

	self.getFields = function() {
		return _fields;
	};

	/**
	 * TODO: СЂР°Р·РґРµР»РёС‚СЊ РґРµР№СЃС‚РІРёРµ valid Рё РІРѕР·РІСЂР°С‚ СЂРµР·СѓР»СЊС‚Р°С‚Р° isValid.
	 */
	self.valid = function () {
		var valid = true
			, callback
			;

		validate();
		_validationState.forEach(function (info) {
			if (typeof info.valid === 'function') {
				callback = info.valid;
			} else {
				valid = info.valid && valid;
			}
		});

		return valid ? (callback || true) : false;
	};

	/*
	 * TODO: rename it to smth like redrawValidationResult
	 */
	self.validate = function () {
		//todo: cache result
		validate();
		_validationState.forEach(function (info) {
			info.field.validate(info.valid);//visualize validation
		});
		focusInvalid();
		return self;
	};

	self.disabled = function() {
		return _disabled;
	};

	self.disable = function() {
		_disabled = true;
		_fields.forEach(function(field) {
			field.disable && field.disable();
		});
		presenter.disable();
		return self;
	};

	self.enable = function() {
        var requiredFields = _fields.filter(function(f) { return f.required });

        _disabled = false;
		_fields.forEach(function(field) {
			field.enable && field.enable();
		});

        if(!presenter.activated) {
            presenter.activate();
        }

        presenter.enable();
        presenter.state = self.state;

        requiredFields.length && requiredFields.map(validateRequiredField(requiredFields, presenter.toggleSubmitButtons));
        focusInvalid();

        return self;
	};

	self.getJSONData = function(data) {
		data = data || {};
		_fields.forEach(function(field) {
			data = field.getJSONData(data);
		});
		return data;
	};

	self.getLog = function () {
		var log = {
			success: true,
			fields: {}
		};

		validate();
		_validationState.forEach(function (info) {
			var errors = [];
			info.field.getErrors().forEach(function (error) {
				errors.push(error.getLog());
			});
			log.fields[info.name] = {
				filled: !info.field.testEmpty(),
				valid: !!info.valid,
				errors: errors
			};
			log.success = log.success && info.valid;
		});

		return log;
	};

	/**
	 * Bind data to fields.
	 * @param {json} data
	 */
	self.bindData = function (data) {
		_fields.forEach(function(field) {
			field.setValue(data);
		});
		return self;
	};

	/**
	 * Bind validation state to invalid fields and make UI changing.
	 * @param {json} options Information about validation state of invalid field.
	 * 	@param {String} options.field Name of field, which initiates an error.
	 * 	@param {String} [options.validator] Name of error type. E.g. "required" or "content-type" for "file"-field.
	 * 	@param {String} [options.message] Error description in human language, no culture supported.
	 * @return self
	 */
	self.bindValidation = function(data) {
		data.forEach(function (data) {
			var field = self.getField(data.field);
			field.throwError(new field.error(false, data.validator, data.message)).validate(false);
			_validationState.push({
				name: data.field,
				field: field,
				valid: false
			});
		});
		focusInvalid();
		return self;
	};

	//back compatibility
	self.setCustomValidity = function(fieldName, data) {
		var field = self.getField(fieldName);
		if (field) {
			field.throwError(new field.error(false, '', data.text || '')).validate(false);
			_validationState.push({
				name: fieldName,
				field: field,
				valid: false
			});
			focusInvalid();
			return self;
		}
	};

	self.ctor = function(presenter, page_name, EventManager) {
		presenter.events.submit(function() {
			var formValid = self.valid();
			EventManager && EventManager.emit('form.submit', self.getLog());
			self.validate();
			if (formValid && !validationInProgress()) {
				self.events.submit(self.getJSONData(), self);
			}
		});
	};

	self.events.submit = system.events.Event();

	self.ctor(presenter, page_name, EventManager);
	return self;
});


'ui.forms.form'.namespace().factory = ui.widgets.multipage.page.factory.extended(function(container, page_name, EventsManager) {
	var
		FIELD_SELECTOR = '.field',

		NS = ui.forms.form,
		self = this
		;

    function getStates(classes) {
        var states = classes.split(' ');

        return states.length ? states : null;
    }

	function refreshFields(controller, selector) {
		var elements = container.find(selector);
		elements.each(function(i) {
			var field, el = elements.eq(i);
			if (!el.parents(selector).length) {
				var el = elements.eq(i);
				field = new ui.forms.element.factory(el).get();
                field.states = getStates(el.attr('class'));
                el.find('input, textarea, select').attr('required') && (field.required = true);
				controller.attachField(field);
			}
		});
	}

	self.controller = function(presenter, page_name) {
		return new NS.controller(presenter, page_name, EventsManager);
	};

	self.presenter = function(container) {
		return new NS.presenter(container);
	};

	self.get = function(state) {
		var presenter = self.presenter(container),
            controller = new self.controller(presenter, page_name, EventsManager);

        controller.state = function() {
            var states = Array.prototype.slice.call(arguments).filter(function(s) { return !!s }),
                selector = FIELD_SELECTOR + (states && states.length ? '.' + states.join('.') : ' ');

            controller.getFields().forEach(controller.detachField);
            presenter.deactivate();
            refreshFields(controller, selector);
            presenter.activate.apply(presenter, states);

            presenter.toggleStates(states);
            return controller;
        }

        return controller.state(state);
	};

	return self;
});




'ui.forms.fieldset'.namespace()

	.factory = genesis.extended(function(container) {
	var
		NS = ui.forms.fieldset,
		self = this
		;

	self.controller = function (presenter, validator) {
		return new NS.controller(presenter, validator);
	};
	self.presenter = function (container) {
		return new NS.presenter(container);
	};

	self.validator = function (container) {
		return new NS.validator(container);
	};

	self.get = function() {
		var
			validator = self.validator(container),
			presenter = self.presenter(container),
			controller = self.controller(presenter, validator),
			elements = container.find('.field ')
			;
		elements.each(function(i) {
			var
				field,
				el = elements.eq(i)
				;
			if (el.parents('.field ')[0] === container[0]) {
				field = new ui.forms.element.factory(el).get();
				validator.addField(field);
				controller.addField(field);
			}
		});
		return controller;
	};

	return self;
});


'ui.forms.fieldset'.namespace()

	.controller = ui.forms.element.controller.extended(function(presenter, validator) {
	var
		self = this,
		_presenter,
		_validator,
		_sessionValue = []
		;

	//move fields collection to new class
	self._fields = [];

	self.addField = function(field) {
		self._fields.push(field);

		field.on('changeStart', function() {
			if (self.active) {
				return;
			}
			self._fields.forEach(function(field) {
				_sessionValue.push(field.getValue());
			});
			self.active = true;
			self.emit('changeStart');
		});

		field.on('changeEnd', function() {
			(function() {

				//do nothing if after blur we jumped to the field of the same fieldset
				var active = self._fields.some(function(field) {
						return field.active;
					})
					, valueChanged
					;
				if (active) {
					return;
				}

				valueChanged = self._fields.some(function(field, i) {
					return field.getValue() !== _sessionValue[i];
				});

				if (valueChanged) {
					var result = self.valid();
					self.validate(result);
					self.emit('change', result);
				}

				_sessionValue = [];
				self.active = false;
				self.emit('changeEnd');

			}).postpone();
		});

		field.on('change', function(result) {
			//run this part after current thread
			(function() {
				//todo: compare result with previous value of change event
				var result = self.valid();
				if (result === true) {
					self.validate(result);
					_sessionValue = [];
					self._fields.forEach(function(field) {
						_sessionValue.push(field.getValue());
					});
					self.emit('change', result);
				}
			}).postpone();
		});
	};

	self.getField = function(name) {
		var i, l;
		for (i = 0, l = self._fields.length; i < l; i++) {
			if (self._fields[i].getName() === name) {
				return self._fields[i];
			}
		}
		return false;
	};

	self.getFields = function() {
		return self._fields;
	};

	/**
	 * todo: make in conjunction with getJSONData
	 */
	self.getValue = function() {
		var value = {};
		self._fields.forEach(function(field) {
			value = field.getJSONData(value);
		});
		return value;
	};

	self.setValue = function(value) {
		var
			name = self.getName()
			;
		if (name) {
			(name in value) && self._fields.forEach(function(field) {
				field.setValue(value[name]);
			});
		} else {
			self._fields.forEach(function(field) {
				field.setValue(value);
			});
		}
		return self;
	};

	self.testEmpty = function() {
		return !self._fields.some(function(field) {
			return !field.testEmpty();
		});
	};

	//TODO: refactor and make more common method with 'element's method validate (ui.forms.element.controller.validate)
	self.validate = function(cached_result) {
		var result = cached_result;
		if ('undefined' == typeof result) {
			result = self.valid();
		}

		var processValid = function(result) {
			if (result === false) {
				//check if validator is presend was done for svadba hack
				presenter.invalid(self.getErrors());
				self.clearErrors();
			} else {
				presenter.valid();
				//if some of child field is invalid, make visual validation all of them
				result === null && self._fields.forEach(function(field) {
					field.validate();
				});
			}
		};

		if (typeof result === 'function') {
			var callback = result;
			callback(processValid);
		} else {
			processValid(result);
		}
	};

	/**
	 * null returns if at least one of the child fields are invalid.
	 */
	self.valid = function() {
		var invalid = self._fields.some(function(field) {
				return !field.valid();
			})
			, valid
			;
		valid = invalid ? false : validator.validate();
		return valid;
	};

	/**
	 * Focus first invalid field in fieldset or first field if all fields are valid.
	 */
	self.focus = function() {
		if (self._fields.length && !self._fields.some(function(el) {
			if (!el.valid()) {
				el.focus();
				return true;
			}
		})) {
			self._fields[0].focus();
		}
	};

	self.getJSONData = function(data) {
		var name = self.getName()
			, list = (presenter.getParam('type') === 'list')
			, preparedData
			;

		if (!data) {
			data = list ? [] : {};
		}

		//input data as Array means that this is list.
		if (data instanceof Array) {
			self._fields.forEach(function(field) {
				preparedData = field.getJSONData();
				data.push(preparedData);
			});
			return data;
		}

		if (!name && list) {
			throw new Error ('There may not be "list"-like fieldset when input data is hash and field has no name.');
		}

		if (name) {
			if (!data[name]) {
				data[name] = list ? [] : {};
			}
			preparedData = data[name];
		} else {
			preparedData = data;
		}

		self._fields.forEach(function(field) {
			field.getJSONData(preparedData);
		});

		return data;
	};

	self.refreshElement = function() {
	};

	self.ctor = function(presenter, validator) {
		_presenter = presenter;
		_validator = validator;
	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.fieldset'.namespace()
	.presenter = ui.forms.element.presenter.extended(function(container) {
	var self = this
		, base = self.base
		;

	/**
	 *
	 *
	 * @return {jQuery} Container for error messages
	 * @private
	 */
	self._getMessageContainer = function() {
		var messageContainer = base._getMessageContainer();
		//get only fieldset ancestor container, not child fields message containers
		return messageContainer.filter(function(i) {
			return messageContainer.eq(i).closest('.field ')[0] === container[0];
		}).eq(0);
	};

	self.getName = function() {
		return container.data('name');
	};


	self.ctor = function(container) {

	};

	self.ctor(container);
	return self;
});


'ui.forms.fieldset'.namespace()
	.validator = ui.forms.element.validator.extended(function(container) {
	var
		self = this,

		_container

		;

	self.addField = function(field) {
		self.fields.push(field);
	};

	self.getField = function(name) {
		var i, l;
		for (i = 0, l = self.fields.length; i < l; i++) {
			if (self.fields[i].getName() === name) {
				return self.fields[i];
			}
		}
		return false;
	};

	self.getValidators = function() {
		return [
			'Required',
			'MinMax'
		];
	};

	self.testRequired = function() {
		if (!container.data('required')) {
			return true;
		}

		return !self.fields.some(function(field) {
			return field.testEmpty();
		});
	};

	self.testMinMax = function () {
		var min = container.data('min')
			, max = container.data('max')
			, count = 0
			;
		if (!min && !max) {
			return true;
		}
		self.fields.forEach(function(field) {
			!field.testEmpty() && count++;
		});
		return ((!max || count <= max) && (!min || count >= min));
	};

	self.ctor = function(container) {
		_container = container;
		self.fields = [];
	};

	self.ctor(container);

	return self;
});




'ui.forms.fieldset.atleast'.namespace().factory = ui.forms.fieldset.factory.extended(function(container) {
	var
		self = this
		;

	this.validator = function(container) {
		return new ui.forms.fieldset.atleast.validator(container);
	};

	return self;
});


'ui.forms.fieldset.atleast'.namespace()

	.validator = ui.forms.fieldset.validator.extended(function(container) {

	var
		self = this
		, _container
		;

	/**
	 * "Atleast"-field is always required. But requirement of this field is determined differently
	 * than in standard fields.
	 * @return {*}
	 */
	self.testRequired = function() {
		return self.fields.some(function(field) {
			return !field.testEmpty();
		});
	};

	self.ctor = function(container) {
		_container = container;
	};

	self.ctor(container);
	return self;
});




'ui.forms.fieldset.date'.namespace()

	.factory = ui.forms.fieldset.factory.extended(function(container) {

	this.controller = function(presenter, validator) {
		return new ui.forms.fieldset.date.controller(presenter, validator, container);
	};

	this.validator = function(container) {
		return new ui.forms.fieldset.date.validator(container);
	};

	return this;
});


'ui.forms.fieldset.date'.namespace()

	.controller = ui.forms.fieldset.controller.extended(function(presenter, validator, controller) {
	var
		self = this
		;

	self.getJSONData = function(data) {
		var
			d = Date.UTC(
				self.getField('year').getValue(),
				self.getField('month').getValue() - 1,
				self.getField('day').getValue(),
				0, 0, 0, 0
			)
			;
		data = data || {};
		data[self.getName()] = controller.data('format')==='iso'?new Date(d).toISOString():'/Date(' + d.valueOf() + ')/';
		return data;
	};

	self.setValue = function(value) {
		var
			name = self.getName()
			, date
			, data
			;

		if (name && name in value) {
			date = new Date(parseInt(value[name].replace(/\/Date\((.*?)\)\//, '$1'), 10));
			data = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate()
			};
			self.getField('year').setValue(data);
			self.getField('month').setValue(data);
			self.getField('day').setValue(data);
		}
		return self;
	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.fieldset.date'.namespace()

	.validator = ui.forms.fieldset.validator.extended(function(container) {
	var
		self = this,
		base = this.base,
		_container
		;

	self.getValidators = function() {
		return base.getValidators().concat(['Correctness']);
	};

	self.testCorrectness = function() {
		var
			month = +self.getField('month').getValue()
			, day = +self.getField('day').getValue()
			, year = +self.getField('year').getValue()
			, date = new Date(year, month - 1, day)
			;
		if (date.getMonth() + 1 !== month || date.getDate() !== day || date.getFullYear() !== year) {
			return false;
		}
		return true;
	};

	self.ctor = function(container) {
		_container = container;
	};

	self.ctor(container);
	return self;
});




'ui.forms.fieldset.password'.namespace()

	.factory = ui.forms.fieldset.factory.extended(function(container) {

	var
		NS = ui.forms.fieldset.password,
		self = this
		;

	self.controller = function (presenter, validator) {
		return new NS.controller(presenter, validator);
	};

	self.validator = function (container) {
		return new NS.validator(container);
	};

	return this;
});


'ui.forms.fieldset.password'.namespace()

	.controller = ui.forms.fieldset.controller.extended(function(presenter, validator) {
	var
		self = this
		;

	/**
	 * Focus password repeat if all fields in this control are valid.
	 */
	self.focus = function() {
		if (self._fields.length && !self._fields.some(function(el) {
			if (!el.valid()) {
				el.focus();
				return true;
			}
		})) {
			self.getField('password-repeat').focus();
		}
	};

	self.getJSONData = function(data) {
		var name = presenter.getName();
		data = data || {};
		data[self.getField('password').getName()] = self.getField('password').getValue();
		return data;
	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.fieldset.password'.namespace()

	.validator = ui.forms.fieldset.validator.extended(function(container) {
	var
		self = this,
		_container
		;

	self.getValidators = function() {
		return [
			'PasswordRepeat'
		];
	};

	self.testPasswordRepeat = function() {
		var
			password = self.getField('password').getValue().trim(),
			repeat = self.getField('password-repeat').getValue().trim()
			;
		return password === repeat;
	};

	self.ctor = function(container) {
		_container = container;
	};

	self.ctor(container);
	return self;
});




'ui.forms.fieldset.tel'.namespace()

	.factory = ui.forms.fieldset.factory.extended(function(container) {

	var
		NS = ui.forms.fieldset.tel,
		self = this
		;

	self.validator = function (container) {
		return new NS.validator(container);
	};

	return self;
});


'ui.forms.fieldset.tel'.namespace()
	.validator = ui.forms.fieldset.validator.extended(function(container) {
	var
		self = this,
		base = self.base,

		_container

		;

	self.getValidators = function() {
		var validators = base.getValidators();
		//cancelled, because tel is required in any case
		//don't remove this method, because it will be useful in future, move it to standard fieldset
		//validators.push(self.testConsistency);
		return validators;
	};

	self.testConsistency = function() {
		return !self.fields.some(function(field) {
			return !field.testEmpty();
		}) || !self.fields.some(function(field) {
			return field.testEmpty();
		});
	};

	self.ctor = function(container) {
		_container = container;
	};

	self.ctor(container);

	return self;
});




'ui.forms.fieldset.list'.namespace()

	.factory = ui.forms.fieldset.factory.extended(function() {

	var
		self = this
		;

	self.controller = function (presenter, validator) {
		return new ui.forms.fieldset.list.controller(presenter, validator);
	};

	return self;
});


'ui.forms.fieldset.list'.namespace()

//todo: make custom getValue method and inject it into getJSONData
	.controller = ui.forms.fieldset.controller.extended(function(presenter, validator) {
	var
		self = this,
		_presenter,
		_validator
		;

	//todo: make recursive list types
	self.getJSONData = function(data) {
		var name = _presenter.getName();
		if (!name && !(data instanceof Array)) {
			//throw new Error()
			return data;
		}

		(function(data) {
			self._fields.forEach(function(field) {
				!field.testEmpty() && data.push(field.getValue());
			});
		})(data instanceof Array ? data : (data[name] = []));

		return data;
	};

	/**
	 * @param {array} value
	 */
	self.setValue = function(value) {
		var
			l,
			name = self.getName(),
			data
			;

		if (!name && !(value instanceof Array)) {
			//throw new Error()
			return self;
		}
		if (value instanceof Array) {
			//for recursive lists
		} else if (name in value) {
			data = value[name];
			if (!(data instanceof Array)) {
				//todo: make error reporting for developer
				return self;
			}
			l = data.length;
			data.forEach(function(value) {
				self._fields.forEach(function(field) {
					//todo: refactor this, remove getNativeValue or make more common logic
					if (field.getNativeValue && field.getNativeValue() === value.toString()) {
						field.setValue(true);
					}
				});
			});

			self._fields.forEach(function(field, i) {
				field.setValue(i < l ? data[i] : null);
			});
		}
		return self;
	};

	self.ctor = function(presenter, validator) {
		_presenter = presenter;
		_validator = validator;
	};

	self.ctor(presenter, validator);
	return self;
});




'ui.forms.fieldset.expires'.namespace()

	.factory = ui.forms.fieldset.factory.extended(function () {

	this.controller = function (presenter, validator) {
		return new ui.forms.fieldset.expires.controller(presenter, validator);
	};

	this.validator = function (container) {
		return new ui.forms.fieldset.expires.validator(container);
	};

	return this;
});


'ui.forms.fieldset.expires'.namespace()

	.controller = ui.forms.fieldset.controller.extended(function (presenter, validator) {
	var
		self = this
		;

	self.getJSONData = function (data) {
		var
			d = Date.UTC(
				self.getField('year').getValue(),
				self.getField('month').getValue() - 1,
				1,
				0, 0, 0, 0
			)
			;

		data = data || {};
		data[self.getName()] = new Date(d).toISOString();
		return data;
	};

	self.setValue = function(value) {
		var
			name = self.getName()
			, date
			, data
			;

		if (name && name in value) {
			date = new Date(value[name]);
			data = {
				year: date.getFullYear(),
				month: date.getMonth() + 1
			};
			self.getField('year').setValue(data);
			self.getField('month').setValue(data);
		}
		return self;
	};

	self.ctor(presenter, validator);
	return self;
});


'ui.forms.fieldset.expires'.namespace()

	.validator = ui.forms.fieldset.validator.extended(function (container) {
	var
		self = this,
		base = this.base,
		_container
		;

	self.getValidators = function () {
		return base.getValidators().concat(['Correctness']);
	};

	self.testCorrectness = function () {
		var
			month = +self.getField('month').getValue(),
			year = +self.getField('year').getValue(),
			day = 1,
			date = new Date(year, month - 1, day)
			;
		if (date.getMonth() + 1 !== month || date.getDate() !== day || date.getFullYear() !== year) {
			return false;
		}
		return true;
	};

	self.ctor = function (container) {
		_container = container;
	};

	self.ctor(container);
	return self;
});






'ui.validator'.namespace().controller = genesis.extended(function() {
	var

		self = this

		;

	self.test = function() {
		return false;
	};

	self.testRequired = function() {
		return false;
	};

	self.testPattern = function() {
		return false;
	};

	self.ctor = function() {
	};

	//self.ctor();
	return self;
});




// uses dom.behaviour;
'ui.controls'.namespace();

ui.controls.button = dom.behaviour.extended(function(element, $) {
	var
		self = this,
		_element = self.element(),

		attach = function() {
			_element
				.mousedown(push)
				.mouseup(release)
				.mouseout(release)
			;
		},

		push = function() {
			_element.addClass('pushed');
			outline(false);
		},

		release = function() {
			_element.removeClass('pushed');
			outline(true);
		},

		outline = function(state) {
			typeof _element.attr('hideFocus') === 'undefined'
				? _element.toggleClass('disable-outline', state)
				: _element.attr('hideFocus', state)
			;
		}

		;

	// ctor
	attach();


	return self;
})


// uses dom.behaviour;
'ui.controls'.namespace();

ui.controls.hoverable = dom.behaviour.extended(function(element, $) {
	var
		self = this,
		_element = self.element(),

		mousein = function() {
			_element.addClass('hover');
		},

		mouseout = function() {
			_element.removeClass('hover');
		}

		;

	// ctor

	$.browser.msie && _element.hover(mousein, mouseout);

	return self;
})


// uses dom.behaviour
'ui.controls'.namespace();

ui.controls.popup = dom.behaviour.extended(function(element, $, close, trigga) {
	var
		FADE_SPEED = 125
		;

	if (!close)
		return window.console && console.error('Invalid arguments');

	var
		self = this,
		_element = self.element(),
		_shown = _element.css('display') !== 'none',

		attach = function() {
			close.bind('click', function(e, extra) {
				self.close(extra);
			});
		}

		;

	self.trigga = trigga;

	self.show = function(callback) {
		_shown = true;

		_element.stop(true).css('opacity') == 1 && _element.css('opacity', 0);

		_element.css('display', 'block').animate({ opacity: 1 }, FADE_SPEED, function() {
			$.browser.msie && this.style.removeAttribute('filter');
			$.isFunction(callback) && callback();
			self.trigger('show');
		});

		return self;
	}

	self.hide = function(callback) {
		_shown = false;

		_element.stop(true).animate({ opacity: 0 }, FADE_SPEED, function() {
			_element.css('display', 'none');
			$.isFunction(callback) && callback();
			self.trigger('hide');
		});

		return self;
	}

	self.toggle = function(callback) {
		_shown ? self.hide(callback) : self.show(callback);
		return self;
	}

	self.close = function(callback) {
		_shown && self.hide(callback);
		return self;
	}

	// ctor
	attach();

	return self;
})



ui.controls.popup.toggle = ui.controls.popup.extended(function(element, $, close, trigger) {
	var
		self = this
		;

	self.close = function(callback) {
		trigger.trigger('click', [callback]);

		return self;
	}

	// ctor
	trigger.bind('trigger', function(e, callback) {
		self.toggle(callback);
	});

	return this;
})



ui.controls.popup.trigger = ui.controls.popup.extended(function(element, $, close, trigger) {
	var
		self = this

		;

	trigger.bind('trigger', function() {
		self.toggle();
	});

	return self;
})


// uses dom.behaviour;
'ui.controls'.namespace();

ui.controls.pseudoform = dom.behaviour.extended(function(element, $, submit) {
	var
		self = this.element(),

		_submit = submit || self.find(':submit')

		;

	// ctor
	_submit.bind('click', function(e, extra) {
		self.trigger('submit', extra);
		e.preventDefault();
	});

	self.serialize = function() {
		return self.find('input, textarea, select').serialize();
	}

	self.keydown(function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			self.trigger('submit');
		}
	});

	return self;
});


// uses dom.behaviour;
'ui.controls'.namespace();

ui.controls.toggle = dom.behaviour.extended(function(element, $, className) {
	var
		self = this,
		base = self.base,

		_element = this.element(),
		_class = className || 'on',
		_state = _element.hasClass(_class),

		attach = function() {
			_element.click(self.trigger);
		}

		;

	self.toggle = function(state) {
		_element.toggleClass(_class, _state = typeof state === 'undefined' ? !_state : state);

		return self;
	}

	self.trigger = function(e, extra) {
		self.toggle();
		base.trigger('trigger', extra || _state);

		return self;
	}

	// ctor
	attach();

	return self;
})


// uses dom.behaviour;
'ui.controls'.namespace();

ui.controls.trigger = dom.behaviour.extended(function(element, $) {
	var
		self = this,
		_element = self.element()

		;

	self.trigger = function(e, extra) {
		_element.trigger('trigger', extra);

		return self;
	}

	// ctor
	_element.click(function(e, extra) {
		self.trigger(e, extra);
	});

	return self;
})



ui.controls.trigger.link = ui.controls.trigger.extended(function(element) {
	this.element().addClass('active').click(function(e) {
		e.preventDefault();
	});

	return this;
})


/*
 Usage:
 new ui.controls.tooltip($('.tooltip'), $, $('.icon'), { opacity: 1, marginTop: '10px' }, 'inline');

 CSS стили для элемента должны описывать его скрытое состояние
 */

// uses dom.behavior
'ui.controls'.namespace();

ui.controls.tooltip = dom.behaviour.extended(function(element, $, trigger, animation, display) {
	var
		SHOW_SPEED = 250,
		HIDE_SPEED = 50,
		CHILL_DELAY = 350,
		DEFAULT_ANIMATION = { opacity: 1 }
		;

	var
		_element = this.element(),
		_animation = animation || DEFAULT_ANIMATION,
		_virgin = {},
		_display = display || 'block',
		_timeout,

		gather = function() {
			for (var name in animation)
				_virgin[name] = _element.css(name);
		},

		attach = function() {
			trigger.bind('mouseenter', show).bind('mouseleave', chill);
		},

		show = function() {
			if (_timeout)
				return _timeout = clearTimeout(_timeout);

			_element.css('display', _display).stop(true).animate(animation, SHOW_SPEED);
		},

		chill = function() {
			_timeout && clearTimeout(_timeout);
			_timeout = setTimeout(hide, CHILL_DELAY);
		},

		hide = function() {
			_timeout = window.undefined;

			_element.stop(true).animate(_virgin, HIDE_SPEED, function() {
				this.style.display = 'none';
			});
		}

		;

	// ctor
	gather();
	attach();
	return this;
});

}); // end define




