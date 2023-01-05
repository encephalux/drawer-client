/** [Ova Assistant]
 * Date: 2021-05-03 10:14:08
 * Author: ova
 * Description:
 */

/** @includes
 * ../LoadingState
 * ../../Events
 */

/** @libraries
 *
 */

"use strict";

class FormManager {
    constructor(_form, _options=FormManager.dflt_opts()) {
        this.form = _form;
        this.async = _options.async;
        this.fields = _options.fields ?? new Map();
        this.loading_state = _options.loading_state ?? new LoadingState();
        this.events = new Events();
        this.events.define(['submit']);
    }

    values() {
        let mapped = {};
        this.fields.forEach((_fld, _key) => {
            mapped[_key] = _fld.value;
        });

        return mapped;
    }

    form_data() {
        return new FormData(this.form);
    }

    fill(_data) {
        for(let _name in _data){
            if(_data.hasOwnProperty(_name))
                if(this.fields.has(_name))
                    this.fields.get(_name).fill(_data);
        }
    }

    /**
     * @description it is the function which validates the form  field with the set rules
      * @returns {boolean}
     */
    is_valid(_name=null) {
        if(_name && this.fields.has(_name)) return this.fields.get(_name).is_valid;

        for(let _field of this.fields.values()) if(!_field.is_valid) return !1;

        return !0;
    }

    /**
     * @param _name: it is the name associate to the field
     * @param _field: must be a FormField or descendant
     */
    add_field(_name, _field) {
        this.fields.set(_name, _field);
    }

    set_fields(_fields) {
        this.fields = _fields;
    }

    submit() {
        this.loading_state.load();

        if(this.is_valid()) {
            if(this.async) {
                this.events.trigger("submit", {callback: () => {
                    this.loading_state.unload();
                }});
            } else {
                this.form.submit(); // Submit event will not be catchable
                this.loading_state.unload();
            }
        }
    }

    reset() {
        for(let _field of this.fields.values()) _field.reset();
    }

    enabled(_bool, _names=null) {
        if(_names) {
            return _names.forEach(_name => {
                const fld = this.fields.get(_name);
                (fld && ((_bool && (_fld.enable() || !0))) || _fld.disable());
            });
        }

        this.fields.forEach((_fld) => {
            (_bool && (_fld.enable() || !0)) || _fld.disable();
        });
    }

    enable() {
        this.enabled(!0);
    }

    disable() {
        this.enabled(!1);
    }

    static dflt_opts() {
        return {
            async: true,
            loading_state: new LoadingState(),
            rules: {}
        };
    }
}