/** [Ova Assistant]
 * Date: 2021-06-12 18:05:48
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

class EmailRule extends FormRule {
    constructor() {
        super();
        this._message = "Entrez un email correct. ex: example@domaine.com";
    }

    validate(_value) {
        return RegexCollection.patterns.email.test(_value);
    }
}