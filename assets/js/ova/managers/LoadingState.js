/** [Ova Assistant]
 * Date: 2020-03-05 16:30:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../Events
 */

/** @libraries
 *
 */

'use strict';

class LoadingState {
    constructor() {
        //Events
        this.events = new Events();
        this.events.define(['loaded', 'unloaded']);

        this.count = 0;
    }

    get busy() {
        return this.count > 0;
    }

    load() {
        if(this.count++ === 0)
            this.events.trigger('loaded');
    }

    unload() {
        if(--this.count === 0)
            this.events.trigger('unloaded');
    }

    unloaded() {
        return this.count === 0;
    }
}