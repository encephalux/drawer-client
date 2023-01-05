/** [Ova Assistant]
 * Date: 2021-06-13 23:06:21
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../ova/managers/form/rules/RadioRule
 * ../../../molecules/Notification
 * ../FormField
 */

/** @libraries
 * 
 */

'use strict';

class Radio extends FormField {
    constructor(_form, _name, _message) {
        super(_name);
        this.form = HTML.parse_element(_form);
        this.message = _message;
        this.enum = new Set();
        this.build();
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.radios.forEach(_el => _el.disabled = !1);
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.radios.forEach(_el => _el.disabled = !0);
    }

    focus() {
        super.focus();
        this.radios[0].focus();
    }

    blur() {
        super.blur();
        this.radios.forEach(_el => _el.blur());
    }

    fill(_data) {
        super.fill(_data);
        if(this.last_err !== null) {
            for (let radio of this.radios)
                if (radio.checked) return radio.checked = !1;
        } else this.control.value = this.value;
    }

    error_messenger_bld() {}

    reset() {
        this.radios.forEach(_radio => (_radio.checked = !1));
    }

    build() {
        this.radios = this.form.querySelectorAll(`input[name=${this.name}]`);
        this.radios.forEach(_element => {
            this.enum.add(_element.value);
            _element.addEventListener("change", _ev => {
                this.value = this.control.value;
            }, !1);
        });

        this.control = this.form.elements[this.name];
        this.add_rule(new RadioRule(this.enum, this.message));

        this.value = this.control.value;
    }

    error(_rule) {
        (new Notification(_rule.message)).notify();
    }
}