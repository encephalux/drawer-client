/** [Ova Assistant]
 * Date: 2022-11-28 19:51:33
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

class ProgressBar extends Atom {
    constructor(_target=null) {
        super();
        this.target = _target;
        this.level = 0;
        this.factor = 0;
        this.computable = !0;
        this.build();
    }

    set_not_computable() {
        this.computable = !1;
        this.container.classList.add("not-computable");
    }

    set_computable() {
        this.computable = !0;
        this.container.classList.remove("not-computable");
    }

    set_target(_value) {
        this.target = _value;
        this.set_computable();
        this.set_level(this.level);
    }

    set_level(_value) {
        if(!this.computable) return;

        this.level = _value;
        this.factor = this.level / this.target;
        this.inner.style.width = `${this.factor * 100}%`;
    }

    set_completed() {
        this.container.classList.remove("not-computable");
        this.container.classList.add("completed");
    }

    set_success() {
        this.container.classList.add("success");
    }

    set_error() {
        this.container.classList.add("error");
    }

    reset() {
        this.container.classList.remove("completed", "success", "error");
        this.set_level(0);
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("progress-bar");
    }
}