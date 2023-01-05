/** [Ova Assistant]
 * Date: 2022-10-16 11:28:24
 * Author: ova
 * Description: 
 */

/** @includes
 * ListLayout
 */

/** @libraries
 * 
 */

'use strict';

class DataListLayout extends ListLayout {
    constructor(_container) {
        super(_container);
        this.is_empty = !0;
    }

    init() {
        super.init();
        this.container.classList.add("data-list-layout");
    }

    add_item(_item) {
        if(this.is_empty) {
            this.clear();
            this.is_empty = !1;
        }

        super.add_item(_item.html());
    }

    remove_item(_item) {
        super.remove_item(_item.html());
    }

    empty() {
        this.is_empty = !0;
        this.container.classList.add("empty");
        this.clear();
    }
}