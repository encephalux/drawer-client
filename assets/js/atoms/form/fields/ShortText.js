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
    constructor(_name, _opts=ShortText.dflt_opts) {
        super(_name, _opts);
        this.value = "";
        this.build();
    }

    get placeholder() {
        return this.input.placeholder;
    }

    set placeholder(_str) {
        this.input.placeholder = _str;
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.input.disabled = !1;
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.input.disabled = !0;
    }

    focus() {
        super.focus();
        this.input.focus();
    }

    blur() {
        super.blur();
        this.input.blur();
    }

    fill(_data) {
        super.fill(_data);
        this.input.value = this.value ?? "";
    }

    clear() {
        this.value = "";
    }

    reset() {
        super.reset();
        this.input.value = this.opts.dflt_value;
    }

    set_type(_type) {
        this.opts.type = _type;
        this.input.type = _type;
    }

    type_parser(_value) {
        return this.opts.type === "number" ? parseFloat(_value):_value;
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("short-text", this.name);

        this.input = document.createElement("input");
        this.input.name = this.name;
        this.inner.appendChild(this.input);

        this.error_messenger_bld();
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);
        this.input.addEventListener("focus", _ev => {
            this._has_focus = !0;
            this.events.trigger("focus");
        }, false);

        this.input.addEventListener("blur", _ev => {
            this._has_focus = !1;
            this.value = this.input.value;
            this.is_valid;
            this.events.trigger("blur");
        }, false);
    }

    static from_DOM(_container, _name) {

        return new class extends ShortText {
            constructor() {
                super(_name);
            }

            base_bld() {
                this.container = _container;
                this.inner = this.container.children[0];
                this.input = this.container.querySelector("input");

                this.error_messenger_bld(this.container.querySelector(".error_messenger"));
            }
        };
    }

    static get dflt_opts() {
        return Object.assign(FormField.dflt_opts, {
            type: "text",
            dflt_value: "",
            error_value: ""
        });
    }
}