/** [Ova Assistant]
 * Date: 2021-06-13 23:05:37
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormField
 */

/** @libraries
 * 
 */

'use strict';

class ShortText extends FormField {
    constructor(_container, _name) {
        super(_container, _name);
        this._value = "";
        this.build();
    }

    build() {
        super.build();
        this.input = this.container.querySelector("input");
        //TODO: Think to manage realtime validation on typing
        /*this.input.addEventListener("keyup", _ev => {
            this.isValid;
        }, false);*/
        this.input.addEventListener("focus", _ev => {
            this._has_focus = !0;
            this.events.trigger("focus");
        }, false);

        this.input.addEventListener("blur", _ev => {
            this._has_focus = !1;
            this._value = this.input.value;
            this.isValid;
            this.events.trigger("blur");
        }, false);
    }

    get value() {
        return this._value;
    }

    set value(_value) {
        super.value = _value;
        this.input.value = _value;
    }

    get is_enabled() {
        return super.is_enabled;
    }

    set is_enabled(_bool) {
        this.input.disabled = !_bool;
        super.is_enabled = _bool;
    }

    get has_focus() {
        return super.has_focus;
    }

    set has_focus(_bool) {
        this.input.focus();
        super.has_focus = _bool;
    }

    get isValid() {
        if(!this.is_enabled) return true;

        return super.isValid;
    }

    static builder(_name, _personalize=(_inner, _input, _container) => {}) {
        let container = document.createElement("div");
        container.className = `${env.APP_CSS_CLASS} field short-text ${_name}`;

        let inner = document.createElement("div");
        inner.className = "inner";
        container.appendChild(inner);

        let messenger = document.createElement("div");
        messenger.className = `ova collapsible ${env.APP_CSS_CLASS} messenger field-notice collapsed`;
        messenger.setAttribute("data-collapsed-height", "0");
        messenger.innerHTML = `<div class="inner"></div>`;
        inner.appendChild(messenger);

        let input = document.createElement("input");
        input.name = _name;

        _personalize(inner, input, container);

        return container;
    }
}