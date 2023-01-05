/** [Ova Assistant]
 * Date: 2021-11-01 08:18:07
 * Author: ova
 * Description: 
 */

/** @includes
 * ShortText
 * ../../../ova/managers/form/rules/TimeRule
 */

/** @libraries
 * 
 */

'use strict';

class TimeField extends ShortText {
    constructor(_container, _name) {
        super(_container, _name);
        this.value = "";
    }

    build() {
        super.build();
        this.add_rule(new TimeRule());
    }
}