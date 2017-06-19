define(function (require) {
    'use strict';

    var location = window.location,
        session = require('app/session'),
        config = require('app/config');

    return function(reason, token) {
        var hashString = location.hash.slice(1),
            hashParams = hashString ? hashString.split('&') : [],
            emotion = session.get('emotion');

        if (reason === 'facebook') {
            hashParams = ['facebook=' + token].concat(hashParams);
        } else {
            hashParams = ['token=' + token].concat(hashParams);
        }

        var hash = '#!/findtravelbuddy/' + emotion.location + (hashParams ? '&' + hashParams.join('&') : '');

        location.href = config.origin + 'travellers/' + location.search + hash;
    };

});