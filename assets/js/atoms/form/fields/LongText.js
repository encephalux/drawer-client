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
    constructor(_name, _opts) {
        super(_name, Object.assign(LongText.dflt_opts, _opts));
        this._value = "";
        this.build();
    }

    get placeholder() {
        this.textarea.placeholder;
    }

    set placeholder(_str) {
        this.textarea.placeholder = _str;
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.textarea.disabled = !1;
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.textarea.disabled = !0;
    }

    focus() {
        super.focus();
        this.textarea.focus();
    }

    blur() {
        super.blur();
        this.textarea.blur();
    }

    fill(_data) {
        if(!_data.hasOwnProperty(this.name)) return this.value = "";

        super.fill(_data);
        this.textarea.value = this.value ?? "";
    }

    reset() {
        this.clear();
    }

    clear() {
        this.value = "";
        this.textarea.value = "";
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("long-text", this.name);
        this.textarea = document.createElement("textarea");
        this.textarea.name = this.name;
        this.inner.appendChild(this.textarea);

        this.error_messenger_bld();
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);
        this.textarea.addEventListener("focus", _ev => {
            this._has_focus = !0;
            this.events.trigger("focus");
        }, false);

        this.textarea.addEventListener("blur", _ev => {
            this._has_focus = !1;
            this.value = this.textarea.value;
            this.is_valid;
            this.events.trigger("blur");
        }, false);
    }

    static from_DOM(_container, _name) {

        return new class extends LongText {
            constructor() {
                super(_name);
            }

            base_bld() {
                this.container = HTML.parse_element(_container);
                this.inner = this.container.children[0];
                this.textarea = this.container.querySelector("textarea");
                this.error_messenger_bld(this.container.querySelector(".error_messenger"));
            }
        }
    }

    static get dflt_opts() {

        return {
            dflt_value: "",
            error_value: ""
        };
    }
}