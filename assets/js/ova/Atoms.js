/** [Ova Assistant]
 * Date: 2021-06-10 16:25:08
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

class Atoms {
    constructor() {
        this.stack = {};
    }

    register(_name, _class) {
        if(this.stack.hasOwnProperty(_name)) throw "A atom with name '"+_name+"' was registered";
        this.stack[_name] = _class;
    }

    unregister(_name) {
        if(this.stack.hasOwnProperty(_name)) delete this.stack[_name];
    }

    replace(_name, _class) {
        this.stack[_name] = _class;
    }

    class(_name) {
        if(this.stack.hasOwnProperty(_name)) return this.stack[_name];
        else throw "Unregistered molecule at '"+_name+"'";
    }
}

window.atoms = new Atoms();