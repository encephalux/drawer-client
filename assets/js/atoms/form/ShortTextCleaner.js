/** [Ova Assistant]
 * Date: 2022-11-10 20:16:12
 * Author: ova
 * Description: 
 */

/** @includes
 * ../Button
 */

/** @libraries
 * 
 */

'use strict';

class ShortTextCleaner extends Button {
    constructor(_short_text) {
        super();
        this.short_text = _short_text;
        this.build();
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("icon", "short-text-cleaner");
        this.inner.innerHTML = `<span class="fi fi-rr-delete"></span>`;
    }

    build() {
        super.build();
        this.container.addEventListener("click", () => {
            this.short_text.value = "";
        }, !1);
    }
}