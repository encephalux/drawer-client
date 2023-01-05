/** [Ova Assistant]
 * Date: 2021-05-27 16:30:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../Molecule
 */

/** @libraries
 *
 */

'use strict';

class Collapsible extends Molecule { // TODO: Modify the molecule to permit building in js
    constructor(_container=null, _rocker=null, _options={}) {
        super();
        this.rocker = _rocker ? HTML.parse_element(_rocker):null;
        this.options = _options;
        this.collapsed = _options.collapsed ?? !0;
        this.events.define(["collapsed", "expanded"]);
        this.build(_container);
    }

    build(_container=null) {
        super.build(_container);
        this.container.classList.add("collapsible");
        this.collapsedHeight = this.options.collapsedHeight ?? this.container.getAttribute("data-collapsed-height") ?? Collapsible.DEFAULT_COLLAPSE_HEIGHT;

        this.rockerContainer = this.container.querySelector(".rocker-container");
        // { Build rocker }
        if(!this.rocker) this.rocker = this.container.querySelector(".collapsible-rocker");
        if(this.rocker) this.rocker.addEventListener("click", _ev => {
            this.toggle();
        }, false);

        // { Normalize initial state }
        if(this.collapsed) this.collapse();
        else this.expand();
    }

    collapse() {
        this.container.style.height = this.collapsedHeight;
        if(this.rocker) this.rocker.classList.remove("collapse");
        if(this.rocker) this.rocker.classList.add("expand");
        this.collapsed = true;
        this.events.trigger("collapsed");
    }

    expand() {
        this.container.style.height = (this.inner.offsetHeight + (this.rockerContainer ? this.rockerContainer.offsetHeight:0)) + "px";
        if(this.rocker) this.rocker.classList.remove("expand" );
        if(this.rocker) this.rocker.classList.add("collapse");
        this.collapsed = false;
        this.events.trigger("expanded");
    }

    toggle() {
        if(this.collapsed) this.expand();
        else this.collapse();
    }

    activate() {
        this.container.classList.remove("deactivated");
        this.collapse();
    }

    deactivate() {
        this.container.classList.add("deactivated");
        this.container.style.height = "unset";
    }

    static scan() {
        for(let element of document.querySelectorAll(".ova.collapsible"))
            if(!element.hasAttribute("data-scan-ignore"))  {
                if(element.hasAttribute("id"))
                    Collapsible.stack[element.id] = new Collapsible(element, document.querySelector(element.getAttribute("data-rocker")));
                else
                    new Collapsible(element, document.querySelector(element.getAttribute("data-rocker")));
            }
    }
}

Collapsible.stack = {};
Collapsible.DEFAULT_COLLAPSE_HEIGHT = "0";