/** [Ova Assistant]
 * Date: 2021-06-10 19:33:06
 * Author: ova
 * Description:
 */

/** @includes
 * ../../Atom
 */

/** @libraries
 *
 */

"use strict";

class FormField extends Atom {
    constructor(_name, _options = {}) {
        super();
        this.events.define(["change", "not_valid_value", "error", "disabled", "enabled", "focus", "blur", "submit"]);
        this.opts = Object.assign(FormField.dflt_opts, _options);
        this.name = _name;
        this._value = null;
        this._has_focus = !1;
        this._is_enabled = !0;
        this._is_locked = !1;
        this._rules = [];
        this.last_err = null;
    }

    get value() {
        return this._value;
    }

    set value(_value) {
        this.last_err = this.validate(_value);
        this._value = (this.last_err === null) ? this.type_parser(_value):this.opts.error_value;
    }

    get has_focus() {
        return this._has_focus;
    }

    get is_enabled() {
        return this._is_enabled;
    }

    get is_disabled() {
        return !this.is_enabled;
    }

    get is_locked() {
        return this._is_locked;
    }

    get is_valid() {
        if(this.is_disabled) return true;
        this.last_err = this.validate(this.value);

        if(this.last_err === null) {
            if(this.error_messenger) this.error_messenger.leave();

            return !0;
        }

        this.error(this.last_err);

        return !1;
    }

    process_value(_value) {}

    fill(_data) {
        this.value = _data[this.name];
    }

    clear() {}

    enable() {
        if(!this.is_locked) this._is_enabled = !0;
    }

    disable() {
        if(!this.is_locked) this._is_enabled = !1;
    }

    lock(_enable) {
        _enable ? this.enable():this.disable();
        this._is_locked = !0;
    }

    unlock(_enable) {
        this._is_locked = !1;
        _enable ? this.enable():this.disable();
    }

    focus() {
        this._has_focus = !0;
    }

    blur() {
        this._has_focus = !1;
    }

    validate(_value) {
        if(this.is_disabled) return null;

        for (let rule of this._rules)
            if(!rule.validate(_value, this))
                return rule;

        return null;
    }

    reset() {
        this._value = this.opts.dflt_value;
        this.error_messenger.leave();
    }

    add_rule(_rule) {
        this._rules.push(_rule);
        this.last_err = this.validate(this.value);
    }

    remove_rule(_rule) {
        this._rules.splice(this._rules.indexOf(_rule), 1);
    }

    set_rules(_rules) {
        this._rules = _rules;
    }

    error_messenger_bld() {}

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("field");
    }

    /**
     * @param _rule
     */
    error(_rule) {}

    type_parser(_value) {
        return _value;
    }

    static get dflt_opts() {

        return {
            interactive_control: !1,
            dflt_value: null,
            error_value: null
        };
    }
}