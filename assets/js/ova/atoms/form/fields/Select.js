/** [Ova Assistant]
 * Date: 2021-06-13 23:06:45
 * Author: ova
 * Description: 
 */

/** @includes
 * ../FormField
 */

/** @libraries
 * 
 */

'use strict';

class Select extends FormField {
    constructor(_container, _name) {
        super(_container, _name);
        this.build();
    }

    build() {
        super.build();
        this.select = this.container.querySelector("select");
        this.select.addEventListener("blur", _ev => {
            this.isValid;
        }, false);
        //TODO: Think to manage realtime validation on change
        /*this.select.addEventListener("change", _ev => {
            this.isValid;
        }, false);*/
    }

    get is_enabled() {
        return super.is_enabled;
    }

    set is_enabled(_bool) {
        this.select.disabled = !_bool;
        super.is_enabled = _bool;
    }

    get isValid() {
        if(!this.is_enabled) return true;

        this.value = this.select.selectedIndex;
        return super.isValid;
    }

    static builder(_name, _personalize=(_inner, _select, _container) => { _inner.appendChild(_select); }) {
        let container = document.createElement("div");
        container.className = `${env.APP_CSS_CLASS} field select ${_name}`;

        let inner = document.createElement("div");
        inner.className = "inner";
        container.appendChild(inner);

        let messenger = document.createElement("div");
        messenger.className = `${env.APP_CSS_CLASS} collapsible`;
        messenger.innerHTML = `<div class="inner"></div>`;
        inner.appendChild(messenger);

        let select = document.createElement("select");
        select.name = _name;

        _personalize(container, select, inner);

        return container;
    }
}