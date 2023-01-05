/** [Ova Assistant]
 * Date: 2022-06-19 01:26:24
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/molecules/data_list/DataList
 * ../ova/layouts/DataListLayout
 */

/** @libraries
 * 
 */

'use strict';

class Selector extends DataList {
    constructor({_val_key, _manager, _factor = 15, _opts={}}) {
        super(_manager, _factor, Object.assign({
            mngmt_mode: DataList.mngmt_modes.selector,
            slct_mode: DataList.slct_modes.single
        }, _opts));
        this.val_key = _val_key;
        this.process_item_temp = null;
    }

    layout_bld() {
        this.layout = new DataListLayout(this.inner);
        this.layout.init();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("selector");
    }

    load({_page, _factor= this.factor}) {

        return super.load({_page, _factor}).catch(_err => {
            if(_err.code === "ABORTED") return;
            throw _err;
        });
    }

    process_item(_data) {
        let item = super.process_item(_data);
        if(
            this.opts.slct_mode === DataList.slct_modes.single
            && this.process_item_temp
            && this.process_item_temp[this.val_key] === _data[this.val_key]
        ) {
            this.process_item_temp = null;
            item.events.trigger("select", item);
        }

        return item;
    }

    select(_value) {

        return ((this.cur_ajax !== null) ? this.cur_ajax.abort():Promise.resolve()).then(() => {
            this.loading_state.load();

            return this.manager.get({[this.primary_key]: _value}, _ajax => (this.cur_ajax = _ajax)).then(_data => {
                this.clear();
                this.total = 1;
                this.cur_page = 1;
                const item = this.process_item(_data);
                this.items[item.oid] = item;
                this.layout.add_item(item);
                this.select_item(item);
                this.events.trigger("loaded");
            }).finally(() => {
                this.cur_ajax = null;
                this.loading_state.unload();
            });
        });
    }
}