/** [Ova Assistant]
 * Date: 2021-06-14 07:43:36
 * Author: ova
 * Description: 
 */

/** @includes
 * ../../ova/atoms/form/FormField
 * ../../ova/molecules/Collapsible
 * ../../ova/Atom
 */

/** @libraries
 * 
 */

'use strict';

(function() {
    FormField.prototype.error_messenger_bld = function(_container=null) {
        let messenger = _container ?? document.createElement("div");
        if(!_container) {
            messenger.className = `${env.APP_CSS_CLASS} error-messenger collapsed`;
            messenger.setAttribute("data-collapsed-height", "0");
            messenger.innerHTML = `<div class="inner"></div>`;
            this.inner.appendChild(messenger);
        }

        this.error_messenger = new (class extends Collapsible {
            constructor(_container) {
                super(_container);
            }

            leave() {
                this.collapse();
            }

            notify() {
                this.expand();
            }
        })(messenger);

        this.error_messenger.html().addEventListener("click", _ev => {
            this.error_messenger.leave();
        }, false);
    };

    FormField.prototype.error = function(_rule) {
        if(this.is_disabled) return;

        this.error_messenger.html().querySelector(".inner").innerHTML = _rule.message;
        this.error_messenger.notify();
    };

    FormField.prototype.messenger_on_top = function() {
        this.container.classList.add("messenger-on-top");
    };
})();
