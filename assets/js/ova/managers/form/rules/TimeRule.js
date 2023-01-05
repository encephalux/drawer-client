/** [Ova Assistant]
 * Date: 2021-11-01 08:35:16
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormRule
 * ../../../RegexCollection
 */

/** @libraries
 * 
 */

'use strict';

class TimeRule extends FormRule {
    constructor() {
        super();
        this._message = "Veuillez définir une heure correcte";
    }

    validate(_value) {
        return _value && _value.length > 0 && RegexCollection.patterns.time.test(_value);
    }
}