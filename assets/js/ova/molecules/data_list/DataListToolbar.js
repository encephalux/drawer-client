/** [Ova Assistant]
 * Date: 2022-02-14 09:11:38
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Toolbar
 * ../ToolbarItem
 * ../../../atoms/form/fields/ShortText
 */

/** @libraries
 * 
 */

'use strict';

class DataListToolbar extends Toolbar {
    constructor(_id="data-list-toolbar", _actions={}) {
        super(_id, !1);
        this.events.define(["add", "delete", "edit", "search", "refresh"]);
        this.actions = Object.assign(DataListToolbar.dflt_actions, _actions);
        this.build();
    }

    get auto_build() {
        return !1;
    }

    build() {
        super.build();
        this.container.classList.add("data-list-toolbar");
        this.id && this.container.classList.add(this.id);

        // { Search field }
        if(this.actions.search) {
            this.searcher = new class extends ToolbarItem {

                base_bld() {
                    super.base_bld();
                    this.container.classList.add("searcher");

                    let icon = document.createElement("span");
                    icon.className = `fi fi-rr-search prefix`;
                    this.inner.appendChild(icon);

                    this.search_fld = new class extends ShortText {
                        constructor() {
                            super("search_str");
                            this.events.define("search");
                        }

                        base_bld() {
                            super.base_bld();
                            this.input.type = "text";
                            this.input.name = "searcher";
                            this.input.placeholder = "Rechercher";
                        }

                        build() {
                            super.build();
                            this.input.addEventListener("keyup", _ev => {
                                const str = this.input.value.trim();
                                if(str === "") this.input.value = "";
                                this.events.trigger("search", str);
                            }, !1);
                        }
                    };
                    this.inner.appendChild(this.search_fld.html());
                }

                build() {
                    super.build();
                    this.search_fld.events.pipe(this.events, ["search"]);
                }
            };
            this.add_item("searcher", this.searcher);
            this.searcher.events.pipe(this.events, ["search"]);
        }

        // { Add button }
        if(this.actions.add) {
            this.add_btn = new class extends Button {

                base_bld() {
                    super.base_bld();
                    this.container.classList.add("filled", "light", "icon", "toolbar-item", "add");
                    this.inner.innerHTML = `<span class="fi fi-rr-plus"></span>`;
                }
            };
            this.add_btn.add_event_listener("click", _ev => {
                this.events.trigger("add");
            }, !1);
            this.add_item("add", this.add_btn);
        }

        // { Edition button }
        if(this.actions.edit) {
            this.edit_btn = new class extends Button {

                base_bld() {
                    super.base_bld();
                    this.container.classList.add("filled", "light", "icon", "toolbar-item", "edit");
                    this.inner.innerHTML = `<span class="fi fi-rr-pencil"></span>`;
                }
            };
            this.edit_btn.add_event_listener("click", _ev => {
                this.events.trigger("edit");
            }, !1);
            this.add_item("edit", this.edit_btn);
        }

        // { Delete button }
        if(this.actions.delete) {
            this.delete_btn = new class extends Button {

                base_bld() {
                    super.base_bld();
                    this.container.classList.add("filled", "light", "icon", "toolbar-item", "delete");
                    this.inner.innerHTML = `<span class="fi fi-rr-trash"></span>`;
                }
            };
            this.delete_btn.add_event_listener("click", _ev => {
                this.events.trigger("delete");
            }, !1);
            this.add_item("delete", this.delete_btn);
        }

        // { Refresh button }
        if(this.actions.refresh) {
            this.refresh_btn = new class extends Button {

                base_bld() {
                    super.base_bld();
                    this.container.classList.add("filled", "light", "icon", "toolbar-item", "refresh");
                    this.inner.innerHTML = `<span class="fi fi-rr-refresh"></span>`;
                }
            };
            this.refresh_btn.add_event_listener("click", _ev => {
                this.events.trigger("refresh");
            }, !1);
            this.add_item("refresh", this.refresh_btn);
        }
    }

    static get dflt_actions() {

        return {
            add: !0,
            edit: !1,
            delete: !0,
            search: !0,
            refresh: !0
        };
    }
}