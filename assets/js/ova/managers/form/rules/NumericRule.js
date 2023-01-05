/** [Ova Assistant]
 * Date: 2021-06-12 18:04:08
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

"use strict";

class NumericRule extends FormRule {
    constructor() {
        super();
        this._message = "Seuls les caractères numériques sont autorisés";
    }

    validate(_value) {
        return RegexCollection.patterns.numeric.test(_value);
    }
}