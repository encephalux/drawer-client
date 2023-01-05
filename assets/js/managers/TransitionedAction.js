/** [Ova Assistant]
 * Date: 2022-02-13 23:08:58
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/HTML
 * ../ova/Events
 */

/** @libraries
 * 
 */

'use strict';

class TransitionedAction {
    constructor(_element, _on, _actionClass) {
        this.events = new Events();
        this.events.define("action");
        this.element = HTML.parse_element(_element);
        this.cssEventType = _on;
        this.class = _actionClass;
        this.listen();
    }

    listen() {
        this.element.addEventListener(this.cssEventType, _ev => {
            if(_ev.target === this.element && this.element.classList.contains(this.class)) {
                _ev.stopPropagation();
                this.events.trigger("action", this.element);
                this.element.classList.remove(this.class);
            }
        }, !1);
    }

    transition() {
        this.element.classList.add(this.class);
    }
}