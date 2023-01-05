/** [Ova Assistant]
 * Date: 2020-05-05 23:23:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../HTML
 */

/** @libraries
 *
 */

"use strict";

class Popup extends HTML {
    constructor(_el, _options=Popup.defaultOptions()) {
        super();
        this.options = _options;
        this.container = _el ? HTML.parse_element(_el):document.createElement('div');
    }

    build() {
        //Making of container
        this.container.classList.add("ova", "popup");
        this.container.style.height = window.innerHeight+"px";

        //Container resizing for adaptation
        window.addEventListener("resize", _ev => {
            this.container.style.height = window.innerHeight+"px";
        }, false);

        //Making of overlay
        this.overlay = document.createElement("div");
        this.overlay.classList.add("overlay");
        this.container.appendChild(this.overlay);

        //Making of inner
        this.inner = document.createElement("div");
        this.inner.className = "inner";
        this.container.appendChild(this.inner);

        //Events setting
        this.events.define(['showing', 'shown', 'closing', 'closed']);

        //Active close on overlay clicking
        if(this.options.closeOnOverlayClick) this.closeOnOverlayClick();
    }

    html() {
        return this.container;
    }

    attach() {
        document.body.appendChild(this.container);
    }

    detach() {
        document.body.removeChild(this.container);
    }

    open() {
        this.events.trigger('showing');
        this.container.classList.add('active');
    }

    close() {
        this.events.trigger('closing');
        this.container.classList.remove('active');
    }

    static scan() {
        let list = document.querySelectorAll('.ova.popup');
        let popups = [];

        for (let i=0; i < list.length; i++) {
            popups.push(new Popup(list[i]));
        }

        return popups;
    }

    makeCloser() {
        if(this.inner.querySelector('.closer'))
            this.inner.querySelector('.closer').addEventListener('click', _ev => {
                this.close();
            }, false);
    }

    closeOnOverlayClick() {
        this.inner.addEventListener("click", _ev => {
            _ev.stopPropagation();
        }, false);

        this.overlay.addEventListener("click", _ev => {
            this.close();
        }, false);
    }

    static defaultOptions() {
        return {
            closeOnOverlayClick: true
        };
    }
}