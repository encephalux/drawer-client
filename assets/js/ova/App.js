/** [Ova Assistant]
 * Date: 2021-04-26 10:14:08
 * Author: ova
 * Description: 
 */

/** @includes
 * core
 * Events
 */

/** @libraries
 * 
 */

"use strict";

class App {
    constructor() {
        this.events = new Events();
        project.instance = this;
    }

    init() {
        // { Define vh css property and body height to fit viewport inner height }
        this.updateBodyHeight();
        window.addEventListener("resize", _ev => {
            this.updateBodyHeight();
            this.updateVhProperty();
        }, !1);
    }

    run() {
        window.addEventListener("DOMContentLoaded", _ev => {
            this.init();
        }, !1);
    }

    updateBodyHeight() {
        document.body.style.height = `${window.innerHeight}px`;
        document.documentElement.style.setProperty("--body-height", `${window.innerHeight}px`);
    }

    updateVhProperty() {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight/100}px`);
    }
}