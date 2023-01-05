/** [Ova Assistant]
 * Date: 2019-08-26 16:30:45
 * Author: ova
 * Description:
 */

/** @includes
 * Events
 */

/** @libraries
 *
 */

"use strict";

class HTML {
    constructor(){
        this.events = new Events();
    }

    get auto_build() {
        return !0;
    }

    base_bld() {}

    build(_can_build=!0){
        this.base_bld();
    }

    html(){}

    static parse_element(element, tag='div'){
        if(element instanceof HTMLElement) return element;

        if(tag instanceof String || typeof tag === 'string') {
            let el = document.createElement(tag);
            el.innerHTML += element;
            return el;
        }

        return null;
    }

    static from_DOM(_node) {} // { Method to permit to entity builds from DOM }
}