/** [Ova Assistant]
 * Date: 2021-09-04 10:17:16
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 */

/** @libraries
 * 
 */

'use strict';

class Notification extends Molecule {
    constructor(_message, _options={}) {
        super();
        this.message = _message;
        this.options = Object.assign(Notification.dflt_opts, _options);
        this.timeout_id = null;
        this.build();
    }

    build() {
        super.build();
        this.container.classList.add(`notification`);
        this.inner.innerHTML = `<div class="header"><a class="closer"><!--span class="icofont-close"></span--></a></div>`;
        this.inner.innerHTML += `<div class="body"><div class="inner">${this.message}</div></div>`;

        this.container.querySelector(".closer").addEventListener("click", _ev => {
            this.destruct();
        }, !1);

        this.container.querySelector(".closer").addEventListener("transitionend", _ev => {
            _ev.stopPropagation();
        }, !1);

        this.container.addEventListener("transitionend", _ev => {
            if(this.container.classList.contains("destruct")) this.container.remove();
        }, !1);

        document.body.appendChild(this.container);

        this.styling();
    }

    html() {
        return this.container;
    }

    notify(_delay=this.options.delay) {
        this.container.classList.add("active");
        if(this.options.auto_destruct) this.timeout_id = setTimeout(() => {
            this.destruct();
        }, _delay);
    }

    destruct() {
        this.container.classList.add("destruct");
        if(this.timeout_id) clearTimeout(this.timeout_id);
    }

    styling() {
        let width = this.container.offsetWidth;
        this.container.style.left = ((window.innerWidth/2) - (width/2))+"px";
    }

    static get dflt_opts() {

        return {
            auto_destruct: !0,
            delay: 5000
        };
    }
}