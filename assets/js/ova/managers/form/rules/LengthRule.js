/** [Ova Assistant]
 * Date: 2021-06-12 18:08:43
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

class LengthRule extends FormRule {
    constructor(_constraints) {
        super();
        this.constraints = _constraints;
        this._message = "Veuillez entrer une chaîne de longueur";
        if(this.constraints.hasOwnProperty("is"))
            this._message += " égale à " + this.constraints.is;
        if(this.constraints.hasOwnProperty("min"))
            this._message += " supérieure à " + this.constraints.min;
        if(this.constraints.hasOwnProperty("max"))
            this._message += (this.constraints.hasOwnProperty("min") ? " et":"") + " inférieure à " + this.constraints.max;
    }

    validate(_value) {

        if(this.constraints.hasOwnProperty("is")) { if(_value.length !== this.constraints.is) return false; }
        else if (this.constraints.hasOwnProperty("min")) { if (_value.length < this.constraints.min) return false; }
        else if (this.constraints.hasOwnProperty("max")) { if (_value.length > this.constraints.max) return false; }

        return true;
    }
}