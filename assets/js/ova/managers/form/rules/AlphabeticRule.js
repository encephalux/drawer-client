/** [Ova Assistant]
 * Date: 2021-06-10 10:14:08
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

class AlphabeticRule extends FormRule {
    constructor() {
        super();
        this._message = "Seuls les caratères alphabetiques sont autorisés";
    }

    validate(_value) {
        return RegexCollection.patterns.alphabetic.test(_value);
    }
}