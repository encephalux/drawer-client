/** [Ova Assistant]
 * Date: 2022-11-24 22:34:40
 * Author: ova
 * Description: 
 */

/** @includes
 * 
 */

/** @libraries
 * 
 */

'use strict';

class State extends Atom {
    constructor(_states, _state="default", _opts={}) {
        super();
        this.opts = Object.assign(State.dflt_opts, _opts);
        this.states = _states;
        this.cur_state = null;
        this.build();
        this.set_state(_state);
    }

    set_state(_state) {
        this.container.classList.remove(this.cur_state);
        this.cur_state = _state;
        this.container.classList.add(this.cur_state);
        if(this.opts.has_label) this.label.innerHTML = this.parse_state(this.cur_state);
    }

    parse_state(_state) {
        return this.states[_state];
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("state");
        this.inner.innerHTML = `<span class="ball"></span>`;
        if(this.opts.has_label) {
            this.label = document.createElement("span");
            this.label.className = "value font-small";
            this.inner.appendChild(this.label);
        } else this.container.classList.add("no-label");
    }

    static get dflt_opts() {
        return {
            has_label: !0
        };
    }
}