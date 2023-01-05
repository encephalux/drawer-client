/** [Ova Assistant]
 * Date: 2022-12-16 11:38:46
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 */

/** @libraries
 * 
 */

'use strict';

class Menu extends Molecule {
    constructor(_items, _opts={}, _auto_bld=!0) {
        super(_opts);
        this.events.define("selected");
        this.items_list = _items;
        this.items = [];
        if(_auto_bld) this.build();
    }

    add_item(_item, _container=document.createElement("a")) {
        _container.innerHTML = _item.label;
        _container.className = `item ${_item.class}`;
        this.events.define(_item.event);
        _container.addEventListener("click", () => {
            this.events.trigger("selected", _item);
            this.events.trigger(_item.event);
        });
        this.inner.appendChild(_container);
        this.items.push(_container);

        return _container;
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("menu");
        this.items_list.forEach(_item => this.add_item(_item));
    }
}