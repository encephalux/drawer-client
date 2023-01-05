/** [Ova Assistant]
 * Date: 2021-06-12 18:14:08
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

class NameRule extends FormRule {
    constructor() {
        super();
        this._message = "Seuls les caratères alphabetiques, les espaces, apostrophes et tirets sont autorisés";
    }

    validate(_value) {
        return RegexCollection.patterns.name.test(_value);
    }
}