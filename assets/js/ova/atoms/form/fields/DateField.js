/** [Ova Assistant]
 * Date: 2021-11-01 08:17:43
 * Author: ova
 * Description: 
 */

/** @includes
 * ShortText
 * ../../../../ova/managers/form/rules/DateRule
 */

/** @libraries
 * 
 */

'use strict';

class DateField extends ShortText {
    constructor(_container, _name) {
        super(_container, _name);
        this.value = "";
    }

    build() {
        super.build();
        this.add_rule(new DateRule());
    }
}