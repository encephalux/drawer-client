/** [Ova Assistant]
 * Date: 2023-01-04 06:29:14
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Atom
 */

/** @libraries
 * 
 */

'use strict';

class Tab extends Atom {
    constructor(_id, _label, _opts={}, _auto_bld=!0) {
        super(_opts);
        this.id = _id;
        this.label = _label;
        this.events.define("show");
        this.selected = !1;
        if(_auto_bld) this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("tab", this.id);
        this.inner.innerHTML = this.label;
        this.container.addEventListener("click", () => {
            this.events.trigger("show", this.id);
        });
    }

    select() {
        this.selected = !0;
        this.container.classList.add("selected");
    }

    unselect() {
        this.selected = !1;
        this.container.classList.remove("selected");
    }
}