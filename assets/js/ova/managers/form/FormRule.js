/** [Ova Assistant]
 * Date: 2021-06-10 23:35:06
 * Author: ova
 * Description:
 */

/** @includes
 * ../../RegexCollection
 */

/** @libraries
 *
 */

"use strict";

class FormRule {
    constructor() {
        this._message = "";
    }

    validate(_value) {}

    get message() { return this._message; }

    set message(_str) { this._message = _str; }
}