/** [Ova Assistant]
 * Date: 2022-02-04 12:10:28
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Molecule
 */

/** @libraries
 * 
 */

'use strict';

class Toolbar extends Molecule {
    constructor(_id="toolbar", _auto_bld=!0) {
        super();
        this.id = _id;
        this.items = {};
        if(_auto_bld) this.build();
    }

    build() {
        super.build();
        this.container.classList.add("toolbar");
        this.id && this.container.classList.add(this.id);
    }

    add_item(_id, _toolbar_item, _before=null) {
        if(this.items.hasOwnProperty(_id)) return !1;

        this.items[_id] = _toolbar_item;
        if(_before) this.inner.insertBefore(_toolbar_item.html(), this.items[_before].html());
        else this.inner.appendChild(_toolbar_item.html());

        return !0;
    }

    remove_item(_id) {
        if(!this.items.hasOwnProperty(_id))
            return !1;

        this.items[_id].remove();
        delete this.items[_id];

        return !0;
    }

    show_item(_id) {
        if(!this.items.hasOwnProperty(_id))
            return !1;

        this.items[_id].show();

        return !0;
    }

    hide_item(_id) {
        if(!this.items.hasOwnProperty(_id))
            return !1;

        this.items[_id].hide();

        return !0;
    }

    disable() {}
}