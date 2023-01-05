/** [Ova Assistant]
 * Date: 2022-11-20 09:15:06
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

class NotNull extends FormRule {
    constructor(_message) {
        super();
        this._message = _message;
    }

    validate(_value) {
        return _value !== null;
    }
}