/** [Ova Assistant]
 * Date: 2022-07-07 00:25:46
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/HTML
 * ../ova/atoms/LoadableAtom
 * Button
 */

/** @libraries
 * 
 */

'use strict';

class PushButton extends LoadableAtom {
    constructor(_label) {
        super();
        this.label = _label;
        this.events.define(["pushed", "released"]);
        this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("button", "push-button");
        this.inner.innerHTML = this.label;

        this.loading_layer = document.createElement("div");
        this.loading_layer.className = "layer loading";
        this.loading_layer.innerHTML = `<img src="/assets/media/loading.gif" alt=""/>`;
        this.container.appendChild(this.loading_layer);
    }

    build() {
        super.build();

        this.container.addEventListener("click", _ev => {
            if(!this.loading_state.busy) this.push();
        }, !1);

        this.loading_state.events.add_listener("unloaded", () => this.events.trigger("released"));
    }

    push() {
        this.loading_state.load();
        this.events.trigger("pushed");
    }

    release() {
        this.loading_state.unload();
    }

    static from_DOM(_container) {

        return new class extends PushButton {

            base_bld() {
                this.container = _container;
                this.container.classList.add(window.env.APP_CSS_CLASS, "atom", "button", "push-button");

                this.inner = this.container.children[0];
                this.inner.classList.add("inner");

                this.loading_layer = this.container.children[1];
                this.loading_layer.classList.add("layer", "loading");
            }
        };
    }
}