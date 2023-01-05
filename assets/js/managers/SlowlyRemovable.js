/** [Ova Assistant]
 * Date: 2022-02-10 19:52:18
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/HTML
 * TransitionedAction
 */

/** @libraries
 * 
 */

'use strict';

class SlowlyRemovable extends TransitionedAction {
    constructor(_element, _on) {
        super(_element, _on, "slowly-removable-remove");
        this.events.define("removed");
        this.events.add_listener("action", () => {
            this.element.remove();
            this.events.trigger("removed", this.element);
        });
    }

    remove() {
        this.element.classList.add("slowly-removable-remove");
    }
}