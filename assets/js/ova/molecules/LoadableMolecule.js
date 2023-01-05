/** [Ova Assistant]
 * Date: 2022-06-15 19:45:45
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Molecule
 * ../managers/LoadingState
 * LoadingFrame
 */

/** @libraries
 * 
 */

'use strict';

class LoadableMolecule extends Molecule {
    constructor() {
        super();
    }

    build() {
        super.build();
        this.container.classList.add("loadable");

        // { Loading frame }
        this.loading_frame = new LoadingFrame();
        this.container.appendChild(this.loading_frame.html());

        // { Loading state }
        this.loading_state = new LoadingState();
        this.loading_state.events.pipe(this.events, ["loaded", "unloaded"], {
            loaded: () => this.loading_frame.show(),
            unloaded: () => this.loading_frame.hide()
        });
    }

    load() {
        this.loading_state.load();
    }

    unload() {
        this.loading_state.unload();
    }
}