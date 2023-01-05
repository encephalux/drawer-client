/** [Ova Assistant]
 * Date: 2021-06-12 18:14:13
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

class PasswordRule extends LengthRule {
    constructor(_constraints={min: 6, max: 32}) {
        super(_constraints);
        this._message = "Votre mot de passe doit contenir au moins une lettre majuscule et minuscule, un chiffre et avoir une longueur comprise entre "+ this.constraints.min +" et "+ this.constraints.max +" caractères";
    }

    validate(_value) {

        return (
            super.validate(_value)
            &&RegexCollection.patterns.password.test(_value)
            && /[A-Z]/.test(_value)
            && /[a-z]/.test(_value)
            && /[0-9]/.test(_value)
        );
    }
}