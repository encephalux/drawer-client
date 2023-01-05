/** [Ova Assistant]
 * Date: 2022-11-25 12:42:37
 * Author: ova
 * Description: 
 */

/** @includes
 * Button
 */

/** @libraries
 * 
 */

'use strict';

class Toggler extends Button {
    constructor() {
        super(!1);
        this.events.define("toggled");
        this.toggled = !1;
        this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("toggler");
        this.add_event_listener("click", () => {
            this.container.classList.toggle("toggled");
            this.toggled = !this.toggled;
            this.events.trigger("toggled", this.toggled);
        });
    }
}