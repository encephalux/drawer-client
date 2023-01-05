/** [Ova Assistant]
 * Date: 2021-06-12 18:27:23
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

class TelephoneRule extends FormRule {
    constructor() {
        super();
        this._message = "Veuillez entrer un numéro de téléphone correct. ex: +22877663301";
    }

    validate(_value) {
        return RegexCollection.patterns.telephone.test(_value);
    }
}