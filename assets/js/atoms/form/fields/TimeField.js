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
    constructor(_name) {
        super(_name);
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.input.type = "time";
    }

    build() {
        super.build();
        this.add_rule(new TimeRule());
    }
}