/** [Ova Assistant]
 * Date: 2022-11-04 18:13:54
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../ova/Atom
 * ../../../ova/atoms/form/FormField
 * ../../../molecules/Notification
 */

/** @libraries
 * 
 */

'use strict';

class Options extends FormField {
    constructor(_name, _label, _options, _opts) {
        super(_name, Object.assign(Options.dflt_opts, _opts));
        this.label_str = _label;
        this.selected = (this.opts.slct_mode === Options.slct_modes.single) ? null:[];
        this.options = [];
        this.options_list = _options;
        this.events.define(["change"]);
        this.build();
    }

    get value() {
        if(this.opts.slct_mode === Options.slct_modes.single) return this.selected ? this.selected.value:null;

        return this.selected.length === 0 ? null:this.selected.reduce((_str, _option, _index) => _str += ((_index > 0 ? this.opts.separator:"") + _option.value), "");
    }

    set value(_value) {
        if(!((typeof _value === "string" || _value instanceof String) && _value !== ""))
            return this.clear();

        if(this.opts.slct_mode === Options.slct_modes.single) {
            const found = this.options.find(_option => _option.value === _value);
            if(found) {
                found.select();
                this.selected = found;
            } else {
                this.clear();
                this.selected = null;
            }

            return;
        }

        let ar = _value.split(this.opts.separator);
        if(ar.length > this.options.length) return this.clear();

        let found = [];
        ar.forEach(_val => {
            const option = this.options.find(_option => _option.value === _val);
            if(option) found.push(option);
        });
        if(ar.length !== found.length) return this.clear();

        this.selected = [];
        this.options.forEach(_option => found.find(_fd => _fd === _option) ? _option.select():_option.unselect());
    }

    enable() {
        if(this.is_locked) return;

        super.enable();
        this.container.classList.remove("disabled");
    }

    disable() {
        if(this.is_locked) return;

        super.disable();
        this.container.classList.add("disabled");
    }

    fill(_data) {
        if(_data.hasOwnProperty(this.name)) {
            this.value = _data[this.name];
        }
    }

    reset() {
        this.clear();
    }

    clear() {
        if(this.opts.slct_mode === Options.slct_modes.single)
            return (this.selected && this.selected.unselect()) || (this.selected = null);

        const tmp = this.selected;
        this.selected = [];
        tmp.forEach(_option => _option.unselect());
    }

    get is_valid() {
        const error = this.validate(this.value);

        if(error !== null) this.error(error);

        return !error;
    }

    add_option({_id="", _value, _label}) {
        const option = this.option_bld({_id, _value, _label});
        this.options_blk.appendChild(option.html());
        this.options.push(option);
        option.events.add_listener("select", () => {
            option.select();
            this.option_slctd(option);
        }).add_listener("unselect", () => {
            if(this.opts.slct_mode === Options.slct_modes.single) return;

            option.unselect();
            this.option_unslctd(option);
        });
    }

    remove_option({_id="", _value}) {
        const index = this.options.findIndex(_option => _option.value = _value);
        if(index === -1) return;

        const to_remove = this.options.splice(index, 1);
        to_remove.remove();
        if(to_remove.is_selected) this.option_unslctd(to_remove);
    }

    option_slctd(_option) {
        if(this.opts.slct_mode === Options.slct_modes.single) {
            if(this.selected) this.selected.unselect();
            this.selected = _option;
        } else this.selected.push(_option);

        this.input.value = this.value;
    }

    option_unslctd(_option) {
        if(this.opts.slct_mode === Options.slct_modes.single) {
            this.selected = null;
            this.input.value = "";
        } else {
            const index = this.selected.findIndex(_opt => _opt.value === _option.value);
            (index >= 0) && this.selected.splice(index, 1);
            this.input.value = this.value;
        }
    }

    error(_rule) {
        (new Notification(_rule.message)).notify();
    }

    error_messenger_bld() {}

    option_bld({_id="", _label, _value}) {

        return new class extends Atom {
            constructor() {
                super();
                this.id = _id;
                this.value = _value;
                this.label = _label;
                this.selected = !1;
                this.events.define(["select", "unselect"]);
                this.build();
            }

            get is_selected() {
                return this.selected;
            }

            select() {
                this.selected = !0;
                this.container.classList.add("selected");
            }

            unselect() {
                this.selected = !1;
                this.container.classList.remove("selected");
            }

            base_bld() {
                this.container = document.createElement("div");
                this.container.className = `option ${_id}`;
                this.container.innerHTML = this.label;
                this.container.dataset.value = _value;
                this.container.setAttribute("tabindex", 0);
            }

            build() {
                super.build();
                this.container.addEventListener("click", () => {
                    this.events.trigger(this.selected ? "unselect":"select");
                });
                this.container.addEventListener("keyup", _ev => {
                    if(_ev.key === " " || _ev.key === "Spacebar")
                        this.events.trigger(this.selected ? "unselect" : "select");
                });
            }
        };
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("options");
        this.inner.innerHTML = `<div class="label">${this.label_str}</div>`;
        this.options_blk = document.createElement("div");
        this.options_blk.className = "options-list";
        this.inner.appendChild(this.options_blk);
        this.input = document.createElement("input");
        this.input.type = "hidden";
        this.inner.appendChild(this.input);
    }

    build() {
        super.build();
        this.options_list.forEach(_option => this.add_option(_option));
    }

    static get slct_modes() {
        return {
            single: "single",
            multiple: "multiple"
        };
    }

    static get dflt_opts() {
        return {
            slct_mode: Options.slct_modes.single,
            separator: ",",
            message: "Veuillez choisir une option"
        };
    }
}