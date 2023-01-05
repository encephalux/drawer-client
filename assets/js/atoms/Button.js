/** [Ova Assistant]
 * Date: 2022-03-17 19:25:39
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Atom
 */

/** @libraries
 * 
 */

'use strict';

class Button extends Atom {
    constructor(_auto_build=!0) {
        super();
        if(_auto_build) this.build();
    }

    base_bld(_container=document.createElement("a"), _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add("button");
        this.container.setAttribute("tabindex", 0);
    }

    static from_DOM(_node) {

        return new class extends Button {
            base_bld() {
                super.base_bld(_node);
            }
        };
    }
}