/** [Ova Assistant]
 * Date: 2022-11-25 12:15:09
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Atom
 */

/** @libraries
 * 
 */

'use strict';

class LongTextViewer extends Atom {
    constructor(_text, _excerpt_length=50) {
        super();
        this.text = _text;
        this.excerpt_length = _excerpt_length;
        this.build();
    }

    get excerpt() {
        return this.text.length < this.excerpt_length ? this.text:this.text.substring(0, this.excerpt_length-1) + "...";
    }

    set_text(_text) {
        this.text = _text;
    }

    expand() {
        this.inner.innerHTML = this.text;
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("long-text-viewer");
        this.inner.innerHTML = `
            <span class="excerpt">${this.excerpt}</span>
            <!--a class="rocker">Tout lire</a>
            <div class="text">
                <a class="closer"></a>
                <p>${this.text}</p>
            </div-->
        `;
        /*this.inner.querySelector(".rocker").addEventListener("click", () => {
            this.container.classList.add("expand");
        }, !1);
        this.inner.querySelector(".closer").addEventListener("click", () => {
            this.container.classList.remove("expand");
        }, !1);*/
    }
}