/** [Ova Assistant]
 * Date: 2022-04-16 23:12:48
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormRule
 */

/** @libraries
 * 
 */

'use strict';

class URLRule extends FormRule {
    constructor() {
        super();
        this._message = "Veuillez entrer un lien correct";
    }

    validate(_value) {
        try {
            return _value === "" || !!(new URL(_value));
        } catch(_e) {
            this.message = "Veuillez entrer un lien correct";
            return !1;
        }
    }
}