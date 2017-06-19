define(function (require) {
    'use strict';

    var facebook = require('facebook-connect'),
        config = require('app/config');

    facebook.init(config.facebook, function (err) {
        err && console.log(err);
    });

    return function (done) {
        facebook.authorize(function (err, token) {

            if (err && err.close) {
                return;
            }

            done(err, token);
        });
    };

});