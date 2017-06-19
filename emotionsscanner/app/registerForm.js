define(function (require) {
    'use strict';

    var $ = require('jquery');
    require('jquery.browser');

    var Forms = require('forms'),
        registerFromFacebook = require('./facebook'),
        redirect = require('./redirect'),
        registerUser = require('./register');

    var registerForm = $('#register'),
        form = new Forms(registerForm),
        facebookBtn = registerForm.find('.facebook');

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

    form.enable();
    form.submit(register);
    facebookBtn.click(facebookAuth);


});