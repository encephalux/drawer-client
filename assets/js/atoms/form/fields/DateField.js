/** [Ova Assistant]
 * Date: 2021-11-01 08:17:43
 * Author: ova
 * Description: 
 */

/** @includes
 * ShortText
 * ../../../ova/managers/form/rules/DateRule
 */

/** @libraries
 * 
 */

'use strict';

class DateField extends ShortText {
    constructor(_name) {
        super(_name);
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.input.type = "date";
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);
        this.add_rule(new DateRule());
    }

    static from_DOM(_container, _name) {
        const fld = ShortText.from_DOM(_container, _name);
        fld.input.type = "date";
        fld.add_rule(new DateRule());

        return fld;
    }
}