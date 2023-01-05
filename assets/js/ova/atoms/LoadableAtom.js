/** [Ova Assistant]
 * Date: 2022-07-07 00:27:21
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Atom
 * ../managers/LoadingState
 */

/** @libraries
 * 
 */

'use strict';

class LoadableAtom extends Atom {
    constructor() {
        super();
    }

    build() {
        super.build();
        this.loading_state = new LoadingState();
        this.loading_state.events.pipe(this.events, ["loaded", "unloaded"], {
            loaded: () => {
                this.container.classList.add("loaded");
            },
            unloaded: () => {
                this.container.classList.remove("loaded");
            }
        });
    }
}