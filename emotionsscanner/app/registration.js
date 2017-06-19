define(function (require) {
    'use strict';

    var $ = require('jquery'),
        Forms = require('forms'),
        registerFromFacebook = require('app/facebook'),
        redirect = require('app/redirect'),
        session = require('app/session'),
        registerUser = require('app/register');

    var body = $('body'),
        registerForm = $('#register'),
        form = new Forms(registerForm),
        registrationButton = $('.scaning-result-footer .btn'),
        facebookBtn = $('.registration-form').find('.btn.facebook');

    function register(data) {
        form.disable();
        data.email = data.email.trim();

        registerUser(data, function (err, token) {
            form.enable();

            if (err) {
                return console.log(err);
            }

            redirect('basic', token);
        });
    }

    function facebookAuth() {

        registerFromFacebook(function (err, token) {

            if (err) {
                return console.log(err);
            }

            redirect('facebook', token);
        });
    }

    function processRegistration() {
        if(session.get('facebook')) {
            facebookAuth();
        } else {
            body.removeClass('second-screen');
            body.addClass('third-screen');
        }
    }

    form.submit(register);
    registrationButton.click(processRegistration);
    facebookBtn.click(facebookAuth);
});