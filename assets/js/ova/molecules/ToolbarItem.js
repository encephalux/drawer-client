/** [Ova Assistant]
 * Date: 2022-06-12 08:19:17
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

class ToolbarItem extends Molecule {
    constructor(_id="toolbar-item", _auto_bld=!0) {
        super();
        this.id = _id;
        if(_auto_bld) this.build();
    }

    build() {
        super.build();
        this.container.classList.add("toolbar-item", this.id);
    }

    show() {
        this.container.classList.remove("hide");
    }

    hide() {
        this.container.classList.add("hide");
    }

    static likefy(_container) {
        _container.classList.add("toolbar-item");
    }
}