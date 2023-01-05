/** [Ova Assistant]
 * Date: 2022-03-08 06:26:07
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../Molecule
 */

/** @libraries
 * 
 */

'use strict';

class DataListNavigator extends Molecule {
    constructor(_data_list) {
        super();
        this.events.define(["next", "previous"]);
        this.data_list = _data_list;
        if(this.auto_build) this.build();
    }

    build() {
        super.build();
        this.container.classList.add(`data-list-navigator`);

        this.previous_page = document.createElement("a");
        this.previous_page.className = `${window.env.APP_CSS_CLASS} atom button icon previous disabled`;
        this.previous_page.innerHTML = `<div class="inner"><span class="fi fi-rr-arrow-small-left"></span></div>`;
        this.previous_page.addEventListener("click", _ev => {
            if(this.previous_page.classList.contains("disabled")) return;

            this.next_page.classList.remove("disabled");
            this.data_list.previous().then(() => {
                if(this.data_list.is_first_page) {
                    this.previous_page.classList.add("disabled");
                }
            });
            this.events.trigger("previous");
        }, !1);
        this.inner.appendChild(this.previous_page);

        this.next_page = document.createElement("a");
        this.next_page.className = `${window.env.APP_CSS_CLASS} atom button icon next disabled`;
        this.next_page.innerHTML = `<div class="inner"><span class="fi fi-rr-arrow-small-right"></span></div>`;
        this.next_page.addEventListener("click", _ev => {
            if(this.next_page.classList.contains("disabled")) return;

            this.previous_page.classList.remove("disabled");
            this.data_list.next().then(() => {
                if(this.data_list.is_last_page) {
                    this.next_page.classList.add("disabled");
                }
            });
            this.events.trigger("next");
        }, !1);
        this.inner.appendChild(this.next_page);
        this.refresh();

        this.data_list.events.add_listener("loaded", () => this.refresh());
    }

    refresh_prev() {
        if(this.data_list.is_first_page) {
            this.previous_page.classList.add("disabled");
        } else this.previous_page.classList.remove("disabled");
    }

    refresh_next() {
        if(this.data_list.is_last_page) {
            this.next_page.classList.add("disabled");
        } else this.next_page.classList.remove("disabled");
    }

    refresh() {
        this.refresh_prev();
        this.refresh_next();
    }
}