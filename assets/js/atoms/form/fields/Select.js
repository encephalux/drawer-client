/** [Ova Assistant]
 * Date: 2021-06-13 23:06:45
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormField
 * ../../../ova/managers/form/rules/SelectRule
 */

/** @libraries
 * 
 */

'use strict';

class Select extends FormField {
    constructor(_name, _options=[], _opts= {}) {
        super(_name, Object.assign(Select.dflt_opts, _opts));
        this.selected_index = this.opts.dflt_index;
        this.options = _options;
        this.build();
    }

    get placeholder() {
        return this.select.placeholder; // TODO: Implement placeholder system
    }

    set placeholder(_str) {
        this.select.placeholder = _str;
    }

    get value() {
        return super.value;
    }

    set value(_value) {
        this.process_value(_value);
        this.select.selectedIndex = this.selected_index;
        this.last_err && this.error(this.last_err);
    }

    process_value(_value) {
        const idx = this.options.findIndex(_option => (_option.value === _value));
        this.selected_index = idx;
        this._value = (idx >= 0) ? this.options[idx].value:null;

        this.last_err = this.validate(_value);

        return this.last_err;
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.select.disabled = !1;
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.select.disabled = !0;
    }

    focus() {
        super.focus();
        this.select.focus();
    }

    blur() {
        super.blur();
        this.select.blur();
    }

    reset() {
        this.value = (this.options.find(_option => _option.selected) || (this.opts.dflt_index < 0 && {value: null}) || this.options[this.opts.dflt_index]).value;
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("select", this.name);
        this.select = document.createElement("select");
        this.select.name = this.name;
        this.select.selectedIndex = this.selected_index;
        this.select.innerHTML = this.options.reduce((_str, _option, _idx) => _str += `
            <option value="${_option.value}" ${(_option.selected || (_idx === this.opts.dflt_index)) ? " selected":""}>${_option.label || _option.value}</option>
        `, "");
        this.inner.appendChild(this.select);

        this.error_messenger_bld();
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);

        this.select.addEventListener("change", _ev => {
            const old_val = this.value;
            if(this.process_value(this.select.value))
                this.error(this.last_err);

            if(this.value !== old_val)
                this.events.trigger("change", this.value);
        }, false);

        this.select.addEventListener("blur", _ev => {
            this.is_valid;
        }, false);

        this.value = (this.options.find(_option => _option.selected) || (this.opts.dflt_index < 0 && {value: null}) || this.options[this.opts.dflt_index]).value;
    }

    static from_DOM(_container, _name, _unavailable_indexes=new Set(), _options= {}) {

        return new class extends Select {
            constructor() {
                super(_name, _unavailable_indexes, _options);
            }

            base_bld() {
                this.container = HTML.parse_element(_container);
                this.inner = this.container.children[0];
                this.select = this.container.querySelector("select");

                this.error_messenger_bld(this.container.querySelector(".error-messenger"));
            }
        }
    }

    static get dflt_opts() {
        return {dflt_index: 0};
    }
}