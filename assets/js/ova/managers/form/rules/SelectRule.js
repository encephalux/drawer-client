/** [Ova Assistant]
 * Date: 2021-06-16 07:44:53
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormRule
 */

/** @libraries
 * 
 */

'use strict';

class SelectRule extends FormRule {
    constructor(_unavailable_indexes=new Set()) {
        super();
        this.unavailable_indexes = _unavailable_indexes;
        this.unavailable_indexes.add(-1);
        this.message = "Veuillez sélectionner une option valide";
    }

    validate(_value, _fld) {
        return !this.unavailable_indexes.has(_fld.selected_index);
    }
}