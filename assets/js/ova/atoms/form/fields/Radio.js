/** [Ova Assistant]
 * Date: 2021-06-13 23:06:21
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../ova/managers/form/rules/RadioRule
 * ../../../molecules/Notification
 * ../FormField
 */

/** @libraries
 * 
 */

'use strict';

class Radio extends FormField {
    constructor(_container, _name, _message) {
        super(_container, _name);
        this.message = _message;
        this.build();
    }

    build() {
        this.radios = this.container.querySelectorAll('input[name="'+this.name+'"]');
        this.set_rules([new RadioRule(this.radios, this.message)]);
    }

    get isValid() {
        if(!this.is_enabled) return true;
        return super.isValid;
    }

    error(_rule) {
        (new Notification(_rule.message)).notify();
    }
}