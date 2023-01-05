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
    constructor(_container, _name, _title) {
        super(_container, _name);
        this.value = [];
        this.title = _title;
        this.build();
    }

    build() {
        this.input = this.container.querySelector("input");
        this.icon = this.container.querySelector(".badge span");
        this.input.addEventListener("change", _ev => {
            this.isValid;
        }, false);
    }

    get is_enabled() {
        return super.is_enabled;
    }

    set is_enabled(_bool) {
        this.input.disabled = !_bool;
        super.is_enabled = _bool;
    }

    get isValid() {
        if(!this.is_enabled) return !0;

        this.value = this.input.files;
        if(super.isValid) {
            this.icon.className = "icofont-checked";
            return !0;
        } else {
            this.input.value = "";
            this.value = [];
            this.icon.className = "icofont-attachment";
        }

        return !1;
    }

    error(_rule) {
        (new Notification(this.title + ": " + _rule.message)).notify();
    }
}