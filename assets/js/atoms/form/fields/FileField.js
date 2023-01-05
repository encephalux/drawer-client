/** [Ova Assistant]
 * Date: 2021-06-13 23:07:36
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormField
 * ../../../molecules/Notification
 */

/** @libraries
 * 
 */

'use strict';

class FileField extends FormField {
    constructor(_name, _label, _opts={}) {
        super(_name);
        this.events.define("change");
        this.label = _label;
        this.options = Object.assign(FileField.dflt_opts, _opts);
        this.build();
    }

    get value() {
        return super.value;
    }

    set value(_value) {
        this.process_value();
        if(this.last_err) {
            this.error(this.last_err)
            this.input.value = "";
        } else this.input.value = _value;
    }

    process_value(_value) {
        if(_value instanceof FileList) {
            this.last_err = this.validate(_value);
            if(!this.last_err)
                this._value = _value;
        } else this._value = null;
    }

    get is_valid() {
        if(this.is_disabled) return !0;

        if(this.options.optional && (this.value === null || this.value.length === 0)) return !0;

        const vld = this.validate(this.value);
        if(vld) this.error(vld);

        return !vld;
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

    fill(_data) {
        if(_data.hasOwnProperty(this.name))
            this.value = _data[this.name];
    }

    reset() {
        this.value = null;
        this.input.value = "";
    }

    error_messenger_bld() {}

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("file");

        this.input = document.createElement("input");
        this.input.type = "file";
        this.input.name = this.name;
        this.inner.appendChild(this.input);
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);
        this.input.addEventListener("change", _ev => {
            this.process_value(this.input.files);
            if(this.is_enabled) {
                if (this.last_err) this.error(this.last_err);
                else this.events.trigger("change", this.value);
            }
        }, false);
    }

    from_DOM(_container, _name, _opts={}) {

        return new class extends FileField {
            constructor() {
                super(_name, _title, _opts);
            }

            base_bld() {
                this.container = HTML.parse_element(_container);
                this.inner = this.container.children[0];
                this.input = this.container.querySelector("input");
            }
        };
    }

    error(_rule) {
        (new Notification(_rule.message)).notify();
    }

    static get dflt_opts() {
        return {
            optional: !1
        };
    }
}