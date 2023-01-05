/** [Ova Assistant]
 * Date: 2022-03-17 11:32:24
 * Author: ova
 * Description: 
 */

/** @includes
 * HTML
 */

/** @libraries
 * 
 */

'use strict';

class Molecule extends HTML {
    constructor(_opts={}) {
        super();
        this.opts = Object.assign(Molecule.dflt_opts, _opts);
    }

    base_bld(_container=null, _inner=null) {
        let inner = _inner || (_container && Array.from(_container.children).find(_element => _element.classList.contains("inner")));
        this.container = _container || document.createElement("div");
        this.container.classList.add("ova", window.env.APP_CSS_CLASS, "molecule");
        this.opts.molecule_id && this.container.setAttribute("data-molecule-id", this.opts.molecule_id);

        if(!inner) {
            this.inner = document.createElement("div");
            this.inner.className = "inner";
            this.container.appendChild(this.inner);
        } else this.inner = inner;
    }

    build(_container=null, _inner=null) {
        this.base_bld(_container, _inner);
    }

    html() {
        return this.container;
    }

    add_event_listener(_event, _callback, _bubbling) {
        return this.container.addEventListener(_event, _callback, _bubbling);
    }

    remove() {
        this.container.remove();
    }

    show() {
        this.container.classList.add("active");
    }

    hide() {
        this.container.classList.remove("active");
    }

    static likefy(_element) {
        _element.classList.add("ova", window.env.APP_CSS_CLASS, "molecule");
    }

    static get dflt_opts() {
        return {
            molecule_id: null
        };
    }
}