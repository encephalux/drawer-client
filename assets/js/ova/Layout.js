/** [Ova Assistant]
 * Date: 2022-02-08 21:06:20
 * Author: ova
 * Description: 
 */

/** @includes
 * HTML
 * Events
 */

/** @libraries
 * 
 */

'use strict';

class Layout {
    constructor(_container) {
        this.container = HTML.parse_element(_container);
        this.container.classList.add(env.APP_CSS_CLASS, "layout");
        this.events = new Events();
    }

    init() {}

    add_item(_item) {}

    remove_item(_item) {}

    update() {}

    clear() {}

    empty() {}
}