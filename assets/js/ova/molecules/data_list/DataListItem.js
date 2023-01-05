/** [Ova Assistant]
 * Date: 2022-02-04 21:31:57
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../Molecule
 */

/** @libraries
 * 
 */

'use strict';

class DataListItem extends Molecule {
    constructor(_oid, _data, _mngmt_mode=DataList.mngmt_modes.full) {
        super();
        this.oid = _oid;
        this.mngmt_mode = _mngmt_mode;
        this.data = _data;
        this.selected = !1;
        this.events.define(["edit", "remove", "select", "unselect"]);
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add(`data-list-item`);
    }

    update(_data) {}

    release() {}
}