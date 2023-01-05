/** [Ova Assistant]
 * Date: 2022-11-04 10:21:20
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../ova/atoms/form/FormField
 */

/** @libraries
 * 
 */

'use strict';

class Checkbox extends FormField {
    constructor({_name, _label, _checked_value=!0, _unchecked_value=undefined}) {
        super(_name);
        this.checked_value = _checked_value;
        this.unchecked_value = _unchecked_value;
        this._value = this.unchecked_value;
        this._is_checked = !1;
        this.label_str = _label;
        this.events.define(["checked", "unchecked", "state_changed"]);
        this.build();
    }

    get is_checked() {
        return this._is_checked;
    }

    get is_valid() {
        return !0;
    }

    get value() {
        return this._value;
    }

    set value(_val) {
        this._value = (_val === this.checked_value) ? this.checked_value:this.unchecked_value;
    }

    fill(_data) {
        if(_data.hasOwnProperty(this.name)) {
            (_data[this.name] === this.checked_value) ? this.check():this.uncheck();
        }
    }

    reset() {
        this.uncheck();
    }

    check() {
        if(this.is_disabled) return;

        this.container.classList.add("checked");
        this._is_checked = !0;
        this.value = this.checked_value;
        this.events.trigger("checked");
        this.events.trigger("state_changed", !0);
    }

    uncheck() {
        if(this.is_disabled) return;

        this.container.classList.remove("checked");
        this._is_checked = !1;
        this.value = this.unchecked_value;
        this.events.trigger("unchecked");
        this.events.trigger("state_changed", !1);
    }

    toggle() {
        if(this.is_disabled) return;

        if(this.is_checked) this.uncheck();
        else this.check();
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.container.classList.remove("disabled");
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.container.classList.add("disabled");
    }

    base_bld() {
        super.base_bld(document.createElement("a"));
        this.container.classList.add("checkbox");
        if(this.name) this.container.classList.add(this.name);
        this.inner.innerHTML = `
            <div class="icon">
                <span class="fi fi-rr-check"></span>
            </div>
            ${this.label_str ? `<div class="label">${this.label_str}</div>`:""}
        `;
        this.input = document.createElement("input");
        this.input.type = "hidden";
        this.inner.appendChild(this.input);
    }

    build() {
        super.build();
        this.container.addEventListener("click", () => this.toggle(), !1);
    }
}