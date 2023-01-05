/** [Ova Assistant]
 * Date: 2021-06-16 08:28:30
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

class RadioRule extends FormRule {
    constructor(_enum, _message) {
        super();
        this.enum = _enum;
        this.message = _message;
    }

    validate(_value) {
        return  _value !== undefined && _value !== null && this.enum.has(_value);
    }
}