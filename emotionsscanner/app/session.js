define(function (require, exports) {
    'use strict';

    var session = {};

    exports.put = function(key, value) {
        session[key] = value;
    }

    exports.get = function(key) {
        return session[key];
    }

    exports.clean = function() {
        session = {};
    }
});