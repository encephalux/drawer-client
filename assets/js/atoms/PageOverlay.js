/** [Ova Assistant]
 * Date: 2021-09-03 20:59:26
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/HTML
 * ../managers/SlowlyRemovable
 * ../managers/TransitionedAction
 */

/** @libraries
 * 
 */

'use strict';

class PageOverlay extends HTML {
    constructor(_id) {
        super();
        this.id = _id;
        this.z_index = 0;
        this.build();
    }

    build() {
        // { Container }
        this.container = document.createElement("div");
        this.container.className = `${env.APP_CSS_CLASS} page-overlay ${this.id}`;

        // { Hide action }
        this.transitioned_hiding = new TransitionedAction(this.container, "transitionend", "hide");
        this.transitioned_hiding.events.add_listener("action", () => {
            this.container.classList.remove("active");
        });

        // { Slowly removing }
        this.remover = new SlowlyRemovable(this.container, "transitionend");
        document.body.appendChild(this.container);
    }

    show() {
        this.z_index = env.page_overlay_z_index + (2 * window.project.page_overlay_count++) + 1;
        this.container.style.zIndex = this.z_index;
        this.container.classList.add("active");
    }

    hide() {
        --project.page_overlay_count;
        this.transitioned_hiding.transition();
    }

    remove() {
        --project.page_overlay_count;
        this.remover.remove();
    }
}