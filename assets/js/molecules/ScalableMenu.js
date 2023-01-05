/** [Ova Assistant]
 * Date: 2022-12-16 10:52:40
 * Author: ova
 * Description: 
 */

/** @includes
 * Menu
 * Scalable
 */

/** @libraries
 * 
 */

'use strict';

class ScalableMenu extends Scalable {
    constructor(_items=[], _opts={}, _auto_bld=!0) {
        super(_opts);
        this.items_list = _items;
        if(_auto_bld) this.build();
    }

    add_item(_item) {
        this.menu.add_item(_item);
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("scalable-menu");
        this.menu = new Menu(this.items_list);
        this.menu.events.pipe(this.events, null, {
            selected: (_p) => {
                this.hide();
                return _p;
            }
        });
        this.inner.appendChild(this.menu.html());
    }
}