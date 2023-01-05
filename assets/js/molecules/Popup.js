/** [Ova Assistant]
 * Date: 2022-02-10 19:06:45
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 * ../atoms/PageOverlay
 * ../managers/SlowlyRemovable
 * ../managers/TransitionedAction
 */

/** @libraries
 * 
 */

'use strict';

class Popup extends Molecule {
    constructor(_id, _opts={}, _auto_bld=!0) {
        super(Object.assign(Popup.dflt_opts, _opts));
        this.id = _id;
        this.is_shown = !1;
        if(_auto_bld)
            this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add(`popup`);
        if(this.id)
            this.container.classList.add(this.id);

        // { Wrapper }
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("wrapper");
        this.container.appendChild(this.wrapper);

        // { Header }
        this.header = document.createElement("div");
        this.header.className = 'header';
        this.wrapper.appendChild(this.header);

        this.wrapper.appendChild(this.inner);

        this.badge = document.createElement("div");
        this.badge.className = "badge";
        this.header.appendChild(this.badge);

        // { Closer }
        if(this.opts.closer) {
            this.closer = document.createElement("a");
            this.closer.className = `${env.APP_CSS_CLASS} closer`;
            this.header.appendChild(this.closer);
        }

        // { Slowly removing }
        this.remover = new SlowlyRemovable(this.container, "transitionend");

        // { Hide action }
        this.transitioned_hiding = new TransitionedAction(this.container, "transitionend", "hide");

        // { Page overlay }
        this.page_overlay = new PageOverlay(this.id);

        // { Attach to the body }
        document.body.appendChild(this.container);
    }

    build() {
        super.build();
        this.transitioned_hiding.events.add_listener("action", () => {
            this.container.classList.remove("active");
        });

        if(this.opts.closer)
            this.closer.addEventListener("click", _ev => {
                this.hide();
            }, !1);
    }

    show() {
        this.is_shown = !0;
        this.page_overlay.show();
        this.container.style.zIndex = `${this.page_overlay.z_index + 1}`;
        this.container.classList.add("active");
    }

    hide() {
        this.page_overlay.hide();
        this.transitioned_hiding.transition();
        this.is_shown = !1;
    }

    remove() {
        this.page_overlay.remove();
        this.remover.remove();
        this.is_shown = !1;
    }

    static get dflt_opts() {
        return {
            closer: !0
        };
    }
}