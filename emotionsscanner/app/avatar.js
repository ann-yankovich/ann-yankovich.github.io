define(function (require) {
    'use strict';

    var $ = require('jquery'),
        facebook = require('facebook-connect'),
        session = require('app/session'),
        emotions = require('app/emotions');

    var body = $('body'),
        avatar = $('.from-library #avatar'),
        avatarButton = $('.from-library .btn'),
        avatarImage = $('img.avatar'),

        facebookButton = $('.photo-upload .from-facebook .btn'),
        shareButton = $('.scan-result .facebook.btn'),

        title = $('.scaning-result-header h1'),
        description = $('.scaning-result-footer .page-description.custom'),
        happiness = $('.scan-result .emotions-list .happiness'),
        curiosity = $('.scan-result .emotions-list .curiosity'),
        boredom = $('.scan-result .emotions-list .boredom');

    function upload(event) {
        renderImage(this.files[0]);
    }

    function startUpload() {
        avatar.click();
    }

    function renderImage(file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            avatarImage.attr('src', event.target.result);
            processEmotions();
        }

        reader.readAsDataURL(file);
    }

    function uploadFacebook() {
        facebook.authorize(function (error, token) {
            if (error) {
                return;
            }
            session.put('facebook', {token: token});

            facebook.thumbnail(function(error, data) {
                if(!error && data.thumbnail) {
                    avatarImage.attr('src', data.thumbnail);
                    processEmotions();
                }
            });
        });
    }

    function share() {
        FB.ui({method: 'share'});
    }

    function processEmotions() {
        var emotion = emotions.getRandomEmotion();

        renderEmotion(emotion);
        session.put('emotion', emotion);

        body.removeClass('first-screen');
        body.addClass('second-screen');
    }

    function renderEmotion(emotion) {
        body.addClass(emotion.photo);
        title.html(emotion.title);
        description.html(emotion.description);

        happiness.find('.percent').html(emotion.happiness + '%');
        happiness.find('.progress').css('width', emotion.happiness + '%');
        curiosity.find('.percent').html(emotion.curiosity + '%');
        curiosity.find('.progress').css('width', emotion.curiosity + '%');
        boredom.find('.percent').html(emotion.boredom + '%');
        boredom.find('.progress').css('width', emotion.boredom + '%');
    }

    avatar.on('change', upload);
    avatarButton.on('click', startUpload);
    facebookButton.on('click', uploadFacebook);
    shareButton.on('click', share);

});