define(function (require, exports) {
    'use strict';

    var config = {
        "facebook": {
            "base": {
                "appId": 158958267595192,
                "version": "v2.6",
                "channelUrl": "/js/facebookChanel.html",
                "status": false,
                "cookie": false,
                "xfbml": true
            },
            "permissions": "email,user_birthday,user_location,user_photos,user_education_history,user_relationships",
            "photos": {
                "width": 845,
                "is_silhouette": false
            }
        },
        "origin": "https://www.triptogether.com/"
    };

    return config;
});