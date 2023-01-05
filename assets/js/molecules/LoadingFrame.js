/** [Ova Assistant]
 * Date: 2021-09-04 10:16:12
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/molecules/LoadingFrame
 */

/** @libraries
 * 
 */

'use strict';

(function() {
    let spr_base_bld = LoadingFrame.prototype.base_bld;
    LoadingFrame.prototype.base_bld = function() {
        spr_base_bld.apply(this);
        this.container.classList.add(env.APP_CSS_CLASS);
        this.container.innerHTML = `<img src="/assets/media/loading.svg" alt=""/>`;
    };
})();