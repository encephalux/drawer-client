/** [Ova Assistant]
 * Date: 2021-06-13 23:10:09
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

class LongText extends FormField {
    constructor(_container, _name) {
        super(_container, _name);
        this._value = "";
        this.build();
    }

    build() {
        super.build();
        this.textarea = this.container.querySelector("textarea");
        //TODO: Think to manage realtime validation on typing
        /*this.textarea.addEventListener("keyup", _ev => {
            this.isValid;
        }, false);*/
        this.textarea.addEventListener("blur", _ev => {
            this.isValid;
        }, false);
    }

    get is_enabled() {
        return super.is_enabled;
    }

    set is_enabled(_bool) {
        this.textarea.disabled = !_bool;
        super.is_enabled = _bool;
    }

    get value() {
        return super.value;
    }

    set value(_value) {
        this.textarea.value = _value;
        super.value = _value;
    }

    get isValid() {
        if(!this.is_enabled) return true;

        this.value = this.textarea.value;
        return super.isValid;
    }

    static builder(_name, _personalize=(_inner, _textArea, _container) => {}) {
        let container = document.createElement("div");
        container.className = `${env.APP_CSS_CLASS} field long-text ${_name}`;

        let inner = document.createElement("div");
        inner.className = "inner";
        container.appendChild(inner);

        let messenger = document.createElement("div");
        messenger.className = `${env.APP_CSS_CLASS} collapsible messenger`;
        messenger.innerHTML = `<div class="inner"></div>`;
        inner.appendChild(messenger);

        let textArea = document.createElement("textarea");
        textArea.name = _name;

        _personalize(inner, textArea, container);

        return container;
    }
}