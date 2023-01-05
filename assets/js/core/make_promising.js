/** [Ova Assistant]
 * Date: 2022-12-16 00:53:40
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

function make_promising(_class) {
    Object.defineProperty(_class.prototype, "cur_reso", {
        value: null,
        writable: !0,
        configurable: !0,
        enumerable: !0
    });

    Object.defineProperty(_class.prototype, "cur_rej", {
        value: null,
        writable: !0,
        configurable: !0,
        enumerable: !0
    });

    Object.defineProperty(_class.prototype, "promise", {
        value: function promise() {
            return new Promise((_reso, _rej) => {
                this.cur_reso = _reso;
                this.cur_rej = _rej;
            });
        }
    });
}