/** [Ova Assistant]
 * Date: 2023-01-04 06:50:16
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

class CardsLayoutItem extends Molecule {
    constructor(_opts={}) {
        super({});
        this.id = null;
        this.shown = !1;
    }

    show() {
        super.show();
        this.shown = !0;
    }

    hide() {
        super.hide();
        this.shown = !1;
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("cards-layout-item", this.id);
    }
}