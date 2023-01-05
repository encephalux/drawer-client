/** [Ova Assistant]
 * Date: 2022-10-31 13:55:20
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/molecules/data_list/DataListItem
 */

/** @libraries
 * 
 */

'use strict';

class SelectorItem extends DataListItem {
    constructor(_oid, _data) {
        super(_oid, _data);
        this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("selector-item");
        this.container.addEventListener("click", () => this.events.trigger(this.selected ? "unselect":"select", this), !1);
    }

    select() {
        if(this.selected) return;

        this.selected = !0;
        this.container.classList.add("selected");
    }

    unselect() {
        if(!this.selected) return;

        this.selected = !1;
        this.container.classList.remove("selected");
    }
}