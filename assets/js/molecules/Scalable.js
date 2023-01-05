/** [Ova Assistant]
 * Date: 2022-12-15 18:52:35
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 * ../managers/TransitionedAction
 */

/** @libraries
 * 
 */

'use strict';

class Scalable extends Molecule {

    show() {
        this.container.style.display = "unset";
    }

    hide() {
        this.hiding.transition();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("scalable");
        this.container.style.display = "none";

        this.closer = document.createElement("a");
        this.closer.className = "scalable-closer";
        this.closer.addEventListener("click", () => this.hide());
        this.inner.appendChild(this.closer);
    }

    build() {
        super.build();
        this.hiding = new TransitionedAction(this.container, "transitionend", "hide")
        this.hiding.events.add_listener("action", () => {
            this.container.style.display = "none";
        });
    }
}