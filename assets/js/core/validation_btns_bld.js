/** [Ova Assistant]
 * Date: 2022-11-10 10:27:55
 * Author: ova
 * Description: 
 */

/** @includes
 * ../atoms/PushButton
 * ../atoms/Button
 */

/** @libraries
 * 
 */

'use strict';

function validation_btns_bld(_container, _texts) {
    const texts = Object.assign({accept_text: "Valider", cancel_text: "Annuler"}, _texts);
    const actions = document.createElement("div");
    actions.classList.add("actions");
    _container.appendChild(actions);

    let validate = new class extends PushButton {
        base_bld() {
            super.base_bld(document.createElement("a"));
            this.container.classList.add("filled", "primary", "validate");
            this.inner.innerHTML = texts.accept_text;
        }
    };
    actions.appendChild(validate.html());

    let cancel = new class extends Button {
        base_bld() {
            super.base_bld(document.createElement("a"));
            this.container.classList.add("filled", "light", "cancel");
            this.inner.innerHTML = texts.cancel_text;
        }
    };
    actions.appendChild(cancel.html());

    return {validate, cancel};
}