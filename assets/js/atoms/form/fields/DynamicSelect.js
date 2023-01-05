/** [Ova Assistant]
 * Date: 2022-06-19 01:27:23
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormField
 * ../../../ova/molecules/Collapsible
 * ../../../ova/molecules/data_list/DataListNavigator
 * ../../../ova/HTML
 */

/** @libraries
 * 
 */

'use strict';

class DynamicSelect extends FormField {
    constructor(_name, _opts={}) {
        super(_name, Object.assign(DynamicSelect.dflt_opts, _opts));
        this.cur_item = null;
        this.owned_groups = new Set();
        this.build();
    }

    get placeholder() {
        return this.label_input.placeholder;
    }

    set placeholder(_str) {
        this.label_input.placeholder = _str;
    }

    get value() {
        return this.cur_item ? this.cur_item.data[this.opts.value_key]:null;
    }

    set value(_value) {
        this.cur_item && this.selector.unselect_item(this.cur_item);
        if(_value === null) return this.null();

        if(this.selector) {
            this.loading_frame.show();
            this.selector.select(_value)
                .catch(_err => this.null())
                .finally(() => this.loading_frame.hide());
        }
    }

    process_value(_item) {
        if(!this.selector) return this.null();
        const old_value = this.value;

        if(_item === null) {
            this.null();
            if(old_value !== null && this.is_enabled)
                this.events.trigger("change", null);

            return;
        }

        if(this.cur_item) {
            if (_item.data[this.opts.primary_key] === this.cur_item.data[this.opts.primary_key])
                return;
        }

        const new_value = _item.data[this.opts.value_key];
        this.last_err = this.validate(new_value);
        if(this.last_err) {
            this.null();
            this.error(this.last_err);
            this.is_enabled && this.events.trigger("change", this.value);

            return;
        }

        this.cur_item = _item;
        this.label_input.value = this.label();
        super._value = new_value;
        this.hidden.value = new_value;
        this.is_enabled && this.show_cleaner();
        if(old_value !== new_value && this.is_enabled )
            this.events.trigger("change", this.value);
    }
    
    enable() {
        if(this.is_locked) return;

        super.enable();
        this.container.classList.remove("disabled");
        this.label_input.disabled = !1;
        (this.label_input.value !== "") && this.show_cleaner();
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.container.classList.add("disabled");
        this.label_input.disabled = !0;
        this.hide_cleaner();
        this.selector_blk.collapse();
    }

    focus() {
        super.focus();
        this.label_input.focus();
        this.events.trigger("focus");
    }

    blur() {
        super.blur();
        this.label_input.blur();
        this.events.trigger("blur");
    }

    reset() {
        this.value = null;
        this.error_messenger.leave();
        this.is_enabled && this.selector && this.selector.leave_search();
        this.selector_blk.collapse();
    }

    erase() {
        if(!this.is_enabled) return;

        this.value = null;
        this.selector && this.selector.leave_search();
    }

    fill(_data) {
        if(!_data) return Promise.resolve();

        if(!this.selector || (this.selector && !_data.hasOwnProperty(this.name)))
            return Promise.resolve();

        this.loading_frame.show();
        this.selector.select(_data[this.name])
            .catch(_err => (this.value = null))
            .finally(() => this.loading_frame.hide());
    }

    show_cleaner() {
        this.cleaner.classList.add("active");
    }

    hide_cleaner() {
        this.cleaner.classList.remove("active");
    }

    type_parser(_value) {
        return _value;
    }

    label(_data=this.cur_item.data) {
        return _data[this.opts.label_key];
    }

    add_group(_group) {
        this.owned_groups.add(_group);
    }

    remove_group(_group) {
        this.owned_groups.delete(_group);
    }

    null() {
        this.cur_item = null;
        this._value = null;
        this.hidden.value = "";
        this.label_input.value = "";
        this.hide_cleaner();
    }

    attach_selector(_selector) {
        this.selector = _selector;

        // { Build data list navigator }
        this.list_nav = new DataListNavigator(this.selector);
        this.navigator_blk.appendChild(this.list_nav.html());

        this.selector_blk.inner.appendChild(this.selector.html());
        this.selector.events.add_listener("selected", () => {
            this.selector_blk.collapse();
        }).add_listener("selection_change", _selected => {
            this.process_value(_selected);
        });

        // { Update selector block at data loaded }
        this.selector.events.add_listener("loaded", _item => {
            if(this.selector_blk.collapsed) return;
            this.selector_blk.expand();
        });
        this.selector.init();
    }

    loading_frame_bld() {
        this.loading_frame = new class extends HTML {
            constructor() {
                super();
                this.build();
            }

            base_bld() {
                this.container =  document.createElement("div");
                this.container.className = "loading-frame";
                this.container.innerHTML = `
                    <div class="ball"></div>
                    <div class="ball"></div>
                    <div class="ball"></div>
                `;
            }

            html() {
                return this.container;
            }

            show() {
                this.container.classList.add("active");
            }

            hide() {
                this.container.classList.remove("active");
            }
        };
        this.container.appendChild(this.loading_frame.html());
    }

    selector_blk_bld() {
        this.selector_blk = new Collapsible((() => {
            let div = document.createElement("div");
            div.className = "selector-block";
            div.innerHTML = `<div class="inner"><div class="navigator-block"></div></div>`;

            return div;
        })());
        this.selector_blk.events.add_listener("expanded", () => this.container.classList.add("expanded"));
        this.selector_blk.events.add_listener("collapsed", () => this.container.classList.remove("expanded"));
        this.inner.appendChild(this.selector_blk.html());
        this.navigator_blk = this.selector_blk.inner.querySelector(".navigator-block");
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("field", "dynamic-select", this.name);
        this.inner.innerHTML = `
            <input type="hidden" class="hidden-input" name="${this.name}" value=""/>
            <div class="base">
                <div class="edition-block">
                    <input type="text" class="label" placeholder="${this.opts.placeholder}"/>
                    <a class="${env.APP_CSS_CLASS} button icon filled light cleaner">
                        <div class="inner">
                            <span class="fi fi-rr-delete"></span>
                        </div>
                    </a>
                </div>
                <a class="${env.APP_CSS_CLASS} button icon filled light list-rocker expand">
                    <div class="inner">
                        <div class="collapse-icon">
                            <span class="fi fi-rr-angle-up"></span>
                        </div>
                        <div class="expand-icon">
                            <span class="fi fi-rr-angle-down"></span>
                        </div>
                    </div>
                </a>
            </div>
        `;
        this.hidden = this.inner.querySelector(".hidden-input");
        this.label_input = this.inner.querySelector("input.label");
        this.cleaner = this.inner.querySelector(".cleaner");
        this.list_rocker = this.inner.querySelector(".list-rocker");

        this.loading_frame_bld();
        this.selector_blk_bld();
        this.error_messenger_bld();
    }

    build() {
        super.build();

        // { Cleaner }
        this.cleaner.addEventListener("click", _ev => this.is_enabled && (this.erase() || this.focus()), !1);

        // { Label }
        this.label_input.addEventListener("focus", _ev => {
            this._has_focus = !0;
            (this.label_input.value !== "") && this.cleaner.classList.add("active");
            this.events.trigger("focus");
        }, !1);
        this.label_input.addEventListener("blur", _ev => { // { TODO: ameliore blur managing }
            this._has_focus = !1;
            setTimeout(() => {
                if(!this.has_focus) {
                    this.events.trigger("blur");
                    this.is_valid;
                }
            }, 200);
        }, !1);
        this.label_input.addEventListener("keyup", _ev => {
            if(!this.selector) return;
            let str = this.label_input.value.trim();
            this.cur_item && this.selector.unselect_item(this.cur_item);

            if(str !== "")
                this.cleaner.classList.add("active");
            else {
                this.label_input.value = "";
                this.cleaner.classList.remove("active");
            }

            this.selector_blk.expand();
            this.selector.search(str);
        }, !1);

        // { List rocker }
        this.list_rocker.addEventListener("click", _ev => {
            if(this.is_enabled) {
                this.label_input.focus();
                if(this.list_rocker.classList.contains("expand"))
                    this.selector_blk.expand();
                else
                    this.selector_blk.collapse();
            }
        }, !1);
        this.selector_blk.events.add_listener("collapsed", () => {
            this.list_rocker.classList.add("expand");
        }).add_listener("expanded", () => {
            this.list_rocker.classList.remove("expand");
        });

        // { Events listening }
        this.events.add_listener("focus", () => {
            this.owned_groups.forEach(_group => {
                DynamicSelect.groups.focused(_group, this);
            });
        });
    }

    static get groups() {
        if(!project.dynamic_select_groups)
            project.dynamic_select_groups =  new class {
                constructor() {
                    this.groups = new Map();
                }

                register(_group, _fld) {
                    if(!this.groups.has(_group)) this.groups.set(_group, new Map());

                    _fld.add_group(_group);
                    this.groups.get(_group).set(_fld.name, _fld);
                }

                unregister(_group, _fld) {
                    if(!this.groups.has(_group)) return;

                    if(!this.groups.get(_group).has(_fld.name)) return;

                    _fld.remove_group(_group);
                    this.groups.get(_group).delete(_fld.name);
                }

                focused(_group, _fld) {
                    this.groups.get(_group).forEach((__fld) => {
                        (__fld !== _fld) && __fld.selector_blk.collapse();
                    });
                }
            };

        return project.dynamic_select_groups;
    }

    static from_DOM(_container, _name, _opts={}) {

        return new class extends DynamicSelect {
            constructor() {
                super(_name, _opts);
            }

            base_bld() {
                this.container = _container;
                this.container.classList.add(env.APP_CSS_CLASS, "atom", "field", "dynamic-select", this.name);
                this.inner = this.container.children[0];
                this.hidden = this.inner.querySelector("input.hidden-input");
                this.label_input = this.inner.querySelector("input.label");
                this.cleaner = this.inner.querySelector(".cleaner");
                this.list_rocker = this.inner.querySelector(".list-rocker");
                this.loading_frame_bld();
                this.selector_blk_bld();
                this.error_messenger_bld();
            }
        };
    }

    static get dflt_opts() {

        return {
            ...super.dflt_opts,
            primary_key: "_id",
            label_key: "_name",
            value_key: "_id",
            // { The field name is used as value_name }
            placeholder: ""
        };
    }
}