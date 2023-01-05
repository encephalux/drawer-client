/** [Ova Assistant]
 * Date: 2021-06-12 18:30:19
 * Author: ova
 * Description:
 */

/** @includes
 * LengthRule
 * ../../../RegexCollection
 */

/** @libraries
 *
 */

"use strict";

class TextRule extends LengthRule {
    constructor(_constraints={min: 3, max: 5000}) {
        super(_constraints);
        this.constraints = _constraints;
        this._message = "Votre texte doit avoir une longueur comprise entre "+ this.constraints.min +" et "+ this.constraints.max +" caractères";
    }
}