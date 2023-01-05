/** [Ova Assistant]
 * Date: 2022-11-26 00:15:57
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Molecule
 */

/** @libraries
 * 
 */

'use strict';

class Rollable extends Molecule {
    constructor(_constraints={}) {
        super();
        this.enrolled = !1;
        this.constraints = Object.assign(Rollable.dflt_constraints, _constraints);
    }

    unroll() {
        this.container.classList.remove("rolled");
        this.container.style.height = this.constraints.unrolled_height ?? `${this.inner.offsetHeight}px`;
        this.enrolled = !0;
    }

    roll() {
        this.container.classList.add("rolled");
        this.container.style.height = this.constraints.rolled_height;
        this.enrolled = !1;
    }

    attach_rocker(_rocker) {
        _rocker.events.add_listener("roll", () => this.roll())
            .add_listener("unroll", () => this.unroll());
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("rollable");
    }

    static get dflt_constraints() {
        return {
            rolled_height: 0,
            unrolled_height: null
        };
    }
}