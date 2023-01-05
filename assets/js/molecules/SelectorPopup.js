/** [Ova Assistant]
 * Date: 2022-11-10 10:04:39
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/molecules/ToolbarItem
 * ../ova/molecules/data_list/DataListNavigator
 * ../ova/molecules/data_list/DataListToolbar
 * ../core/validation_btns_bld
 * Popup
 * Notification
 * LoadingFrame
 */

/** @libraries
 * 
 */

'use strict';

class SelectorPopup extends Popup {
    constructor(_opts={}) {
        super("selector-popup", Object.assign(SelectorPopup.dflt_opts, _opts), !1);
        this.cur_reso = null;
        this.cur_rej = null;
        this.build();
    }

    selector_bld() {}

    base_bld() {
        super.base_bld();

        this.loading_frame = new LoadingFrame();
        this.wrapper.appendChild(this.loading_frame.html());

        this.toolbar = new DataListToolbar("selector-popup", {
            add: !1,
            delete: !1
        });
        this.inner.appendChild(this.toolbar.html());

        this.selector_bld();

        this.navigator = new DataListNavigator(this.selector);
        ToolbarItem.likefy(this.navigator.container);
        this.toolbar.add_item("navigator", this.navigator);

        let btns = validation_btns_bld(this.inner);
        this.validate_btn = btns.validate;
        this.cancel_btn = btns.cancel;
    }

    build() {
        super.build();
        this.toolbar.events
            .add_listener("search", _str => this.selector.search(_str))
            .add_listener("refresh", _str => this.selector.refresh());

        this.validate_btn.add_event_listener("click", () => this.validate());
        this.cancel_btn.add_event_listener("click", () => this.cancel());

        this.loading_state = this.validate_btn.loading_state;
        this.loading_state.events
            .add_listener("loaded", () => this.loading_frame.show())
            .add_listener("unloaded", () => this.loading_frame.hide());
    }

    validate() {
        this.done();
    }

    reset() {
        this.selector.reset();
    }

    release() {
        this.validate_btn.release();
    }

    cancel() {
        this.cur_rej({code: "SELECTOR_REJECTED"});
        this.hide();
    }

    done() {
        this.release();
        this.hide();
    }

    error(_msg="Une erreur lors de la validation") {
        (new Notification(_msg)).notify();
        this.release();
    }

    /**
     * @param _selected
     * @returns {Promise<{SelectorPopup, any}>}
     */
    show(_selected) {

        return new Promise((_reso, _rej) => {
            this.cur_reso = _reso;
            this.cur_rej = _rej;
            this.reset();
            super.show();
        });
    }

    promise() {

        return new Promise((_reso, _rej) => {
            this.cur_reso = _reso;
            this.cur_rej = _rej;
        });
    }

    static get slct_modes() {
        return {
            single: "single",
            multiple: "multiple"
        };
    }

    static get dflt_opts() {

        return {
            slct_mode: SelectorPopup.slct_modes.multiple,
            closer: !1
        };
    }
}