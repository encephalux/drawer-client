/** [Ova Assistant]
 * Date: 2022-10-16 11:13:11
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Layout
 */

/** @libraries
 * 
 */

'use strict';

class ListLayout extends Layout {
    constructor(_container) {
        super(_container);
    }

    init() {
        this.container.classList.add("list-layout");
        this.clear();
    }

    add_item(_item) {
        this.container.appendChild(_item);
    }

    remove_item(_item) {
        _item.remove();
    }

    update() {
        // TODO: Implements when constraints will be added
    }

    clear() {
        this.container.innerHTML = "";
    }
}