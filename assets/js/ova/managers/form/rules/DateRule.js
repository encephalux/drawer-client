/** [Ova Assistant]
 * Date: 2021-06-16 06:46:45
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../RegexCollection
 */

/** @libraries
 * 
 */

'use strict';

class DateRule extends FormRule {
    constructor() {
        super();
        this._message = "Veuillez sélectionner une date";
    }

    validate(_value) {
        if(_value.length === 0 || !_value) return false;
        return RegexCollection.patterns.date.en.test(_value);
    }
}