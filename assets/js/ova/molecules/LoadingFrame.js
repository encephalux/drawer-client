/** [Ova Assistant]
 * Date: 2021-06-10 16:53:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../Molecule
 */

/** @libraries
 *
 */

"use strict";

class LoadingFrame extends Molecule {
    constructor() {
        super();
        this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("loading-frame");
    }

    static from_DOM (_element) {
        let fr = new LoadingFrame();
        fr.container = HTML.parse_element(_element);
        fr.container.classList.add("ova", env.APP_CSS_CLASS, "loading-frame");
        fr.inner = fr.container.querySelector(".inner");

        return fr;
    }
}