define(function (require, exports) {
    'use strict';

    require('genesis');

    return function (container, state) {
        var form = new ui.forms.form.factory(container).get(state),
            fieldElems = container.find('.field'),
            handler;

        form.focus = function () {
            var fields,
                first,
                i;

            fields = form.getFields();

            function focus(el) {
                // FIXME i can't solve problem with hidden input in ie8
                try {
                    if (el.is(':visible')) {
                        el.focus();
                    }
                } catch(e) {}
            }

            if (!fields.length) {
                return;
            }

            first = fields[0].getElement();

            for (i = 0; i < fields.length; i++) {
                var el = fields[i].getElement()[0];

                // if empty filed, then focus and stop search
                if (el.value === '') {
                    focus(el);
                    return this;
                }

            }

            if (first) {
                focus(first[0]);
            }

            return this;
        };

        form.fail = function (err) {

            if (err && err.src) {
                fieldElems = fieldElems.has('[name="' + err.src + '"]');
            }

            fieldElems.toggleClass('invalid', true);

            return this;
        };

        form.clear = function () {
            typeof container.get(0).reset === "function" && container.get(0).reset();

            var elements = fieldElems.find('input, select, textarea');

            elements.not('[type=checkbox], [type=radio]').val('');
            elements.filter('[type=checkbox], [type=radio]').prop('checked', false);

            fieldElems
                .toggleClass('invalid', false)
                .toggleClass('invalid-pattern', false)
                .toggleClass('invalid-required', false);

            return this;
        };

        form.submit = function (callback) {

            if (handler) {
                form.events.submit.detach(handler);
            }

            handler = function (data) {
                callback(data);
                container.trigger('processing');
            };

            form.events.submit(handler);
            return this;
        };

        form.bind = form.bindData;
        return form;
    };

});