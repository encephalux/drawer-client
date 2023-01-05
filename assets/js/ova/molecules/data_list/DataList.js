/** [Ova Assistant]
 * Date: 2022-02-04 21:31:44
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../../molecules/LoadingFrame
 * ../../Molecule
 * ../../managers/LoadingState
 */

/** @libraries
 * 
 */

'use strict';

class DataList extends Molecule {
    constructor(_manager, _factor, _opts={}, _auto_bld=!0) {
        super(Object.assign(DataList.dflt_opts, _opts));
        this.manager = _manager;
        this.factor = _factor;
        this.initialized = !1;
        this.items = {};
        this.selected = (this.opts.slct_mode === DataList.slct_modes.single) ? null:[];
        this.total = 0;
        this.oid = 0;
        this.cur_page = 1;
        this.cur_ajax = null;
        this.filter = new Map();
        this.busy = !1;
        this.force_unlock = !1;
        this.searching = !1;
        this.cur_search_str = "";
        this.locks = {
            all: !1,
            adding: !1,
            updating: !1,
            removing: !1
        };
        this.events.define([
            "initialized",
            "loading",
            "loaded",
            "edit",
            "@search",
            "selected",
            "unselected",
            "selection_change"
        ]);
        this.loading_state = new LoadingState();
        this.loading_state.events
            .add_listener("loaded", () => (this.busy = !0))
            .add_listener("unloaded", () => (this.busy = !1));
        if(_auto_bld) this.build();
    }

    get primary_key() {
        return "_id";
    }

    get item_class() {}

    get is_first_page() {
        return (this.cur_page === 1);
    }

    get is_last_page() {
        return (this.cur_page >= Math.ceil(this.total / this.factor));
    }

    get can_lock() {

        return new Promise((_reso, _rej) => {
            if(this.busy) return _rej({code: "BUSY_ERROR"});
            _reso();
        });
    }

    get can_next() {

        return this.can_lock.then(() => {
            if(this.is_last_page) throw ({code: "OUT_OF_BOUND_ERROR"});
        });
    }

    get can_previous() {

        return this.can_lock.then(() => {
            if(this.is_first_page) throw ({code: "OUT_OF_BOUND_ERROR"});
        });
    }

    layout_bld() {
        this.layout = null;
    }

    base_bld(_container=null, _inner=null) {
        super.base_bld(_container, _inner);
        this.container.classList.add(`ova`, `data-list`);

        this.loading_frame = new LoadingFrame();
        this.container.appendChild(this.loading_frame.html());

        this.layout_bld();
    }

    build(_container=null, _inner=null) {
        super.build(_container, _inner);
        this.events.add_listener("@search", _str => this.search(_str));

        this.loading_state.events.add_listener("loaded", () => {
            this.loading_frame.show();
            this.events.trigger("loading");
        }).add_listener("unloaded", () => {
            this.loading_frame.hide();
        });
    }

    load({_factor=this.factor, _page}) {

        return this.can_lock.then(() => {
            this.loading_state.load();

            let data = {
                _factor: _factor,
                _page: _page,
                filter: this.process_filters()
            };
            let loader;
            if(this.searching) {
                data._str = this.cur_search_str;
                loader = this.manager.search;
            } else loader = this.manager.range;

            return new Promise((_reso, _rej) => {
                if(this.force_unlock) {
                    this.loading_state.unload();
                    return _rej({code: "ABORTED", content: {xhr: null}});
                }

                loader(data, _ajax => (this.cur_ajax = _ajax)).then(_data => {
                    this.cur_page = _page;
                    this.parse_result(_data);
                    this.events.trigger("loaded");
                    _reso(_data);
                }).catch(_err => _rej(_err)).finally(() => {
                    this.cur_ajax = null;
                    this.loading_state.unload();
                });
            });
        });
    }

    force_load({_factor=this.factor, _page}) {
        this.force_unlock = !0;
        return ((this.cur_ajax !== null) ? this.cur_ajax.abort():Promise.resolve()).then(() => {
            this.force_unlock = !1;
            return this.load({_page, _factor});
        });
    }

    leave_search() {
        if(!this.opts.searchable) return;
        this.searching = !1;
        this.cur_search_str = "";

        return this.force_load({_page: 1});
    }

    search(_str) {
        if(!this.opts.searchable) return;

        if(_str === "") return this.leave_search();

        this.searching = !0;
        this.cur_search_str = _str;

        return this.force_load({_page: 1});
    }

    init() {

        return this.load({_page: 1}).then(() => {
            this.initialized = !0;
            this.events.trigger("initialized");
        });
    }

    reset() {
        if(this.opts.slct_mode === DataList.slct_modes.single) {
            if(this.selected === null) return;

            this.selected.unselect();
            this.selected = null;

            return;
        }

        this.selected.forEach(_selected => _selected.unselect());

        return this.leave_search();
    }

    refresh() {
        return this.load({_page: this.cur_page});
    }

    process_item(_data) {
        const oid = `oid_${++this.oid}`;

        if(this.opts.mngmt_mode === DataList.mngmt_modes.view)
            return new (this.item_class)(oid, _data, this.opts.mngmt_mode);

        if(this.opts.slct_mode === DataList.slct_modes.single && this.selected) {
            if(this.selected.data[this.primary_key] === _data[this.primary_key]) {
                this.selected.oid = oid;
                return this.selected;
            }
        } else if(this.opts.slct_mode === DataList.slct_modes.multiple) {
            const found = this.selected.find(_item => (_item.data[this.primary_key] === _data[this.primary_key]));
            if(found) {
                found.oid = oid;
                found.update(_data);
                return found;
            }
        }

        const item = new (this.item_class)(oid, _data, this.opts.mngmt_mode);

        item.events
            .add_listener("select", _item => this.select_item(_item))
            .add_listener("unselect", _item => this.unselect_item(_item));

        if(this.opts.mngmt_mode === DataList.slct_modes.selector) return item;

        item.events
            .pipe(this.events, ["edit"])
            .add_listener("remove", _item => this.remove_item(_item));

        return item;
    }

    select_item(_item) {
        if(this.opts.slct_mode === DataList.slct_modes.single) {
            if(this.selected) {
                this.selected.unselect();
                this.events.trigger("unselected", this.selected);
            }
            this.selected = _item;
        } else if(this.opts.slct_mode === DataList.slct_modes.multiple) {
            this.selected.push(_item);
        }
        _item.select();

        this.events
            .trigger("selected", _item)
            .trigger("selection_change", this.selected);
    }

    unselect_item(_item) {
        if(this.opts.slct_mode === DataList.slct_modes.single) {
            _item.unselect();
            this.selected = null;
        } else {
            const index = this.selected.indexOf(_item);
            if (index > -1)
                this.selected.splice(index, 1);
            _item.unselect();
        }

        this.events.trigger("unselected", _item);
        this.events.trigger("selection_change", this.selected);
    }

    add_item(_data) {
        this.busy = !0;

        return this.manager.register(_data).then(__data=> {
            const item = this.process_item({
                ..._data,
                ...__data
            });
            this.items[item.oid] = item;

            return item;
        }).finally(() => this.busy = !1);
    }

    update_item(_item, _data) {
        this.busy = !0;

        return this.manager.update({[this.primary_key]: _item.data[this.primary_key], ..._data}).finally(() => this.busy = !1);
    }

    remove_item(_item) {
        this.busy = !0;

        return this.manager.remove({[this.primary_key]: _item.data[this.primary_key]}).then(() => {
            _item.release();
            this.busy = !1;
            this.refresh();
        }).catch(_err => {
            this.busy = !1;
            throw _err;
        });
    }

    remove_selected() {
        this.loading_state.load();

        return this.manager.remove({
            [this.primary_key]: (this.opts.slct_mode === DataList.slct_modes.single) ? this.selected.data._id:this.selected.map(_item => _item.data._id)
        }).finally(() => this.loading_state.unload());
    }

    clear() {
        this.total = 0;
        this.items = {};
        this.layout.clear();
    }

    next() {

        return this.can_next.then(() => this.load({
            _page: this.cur_page+1
        }));
    }

    previous() {

        return this.can_previous.then(() => this.load({
            _page: this.cur_page-1
        }));
    }

    add_filter(_key, _value) {
        this.filter.set(_key, _value);
    }

    update_filter(_key, _value) {
        this.filter.set(_key, _value);
    }

    remove_filter(_key, _value=null) {
        this.filter.delete(_key);
    }

    process_filters() {
        let filter = [];

        this.filter.forEach((_value, _key) => {
            filter.push({
                column: _key,
                value: _value
            });
        });

        return filter;
    }

    serialize_filters() {
        let str = "[";
        let first = !0;
        this.filter.forEach((_key, _value) => {
            str += `${!first ? ",":""}{"column":"${_key}", "value":"${_value[0]}"`;
        });

        return str+"]";
    }

    parse_result(_data) {
        if(_data.total === 0) {
            if(this.total === 0) return;
            this.clear();
            this.container.classList.add("empty");

            return this.layout.empty();
        } else if(this.total === 0)
            this.container.classList.remove("empty");
        else this.clear();

        this.total = _data.total;
        for(let item_data of _data.list) {
            const item = this.process_item(item_data);
            this.items[item.oid] = item;
            this.layout.add_item(item);
        }
    }

    notify_busy() {
        (new Notification("Veuillez patienter la fin de l'opération en cours puis réessayez.")).notify();
    }

    static get mngmt_modes() {

        return {
            view: "view",
            selector: "selector",
            full: "full"
        };
    }

    static get slct_modes() {

        return {
            single: "single",
            multiple: "multiple"
        };
    }

    static get dflt_opts() {

        return {
            slct_mode: DataList.slct_modes.multiple,
            mngmt_mode: DataList.mngmt_modes.full,
            searchable: !0
        };
    }
}