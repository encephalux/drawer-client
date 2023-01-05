/** [Ova Assistant]
 * Date: 2019-02-03 16:30:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../Layout
 */

/** @libraries
 *
 */

"use strict";

class CardsLayout extends Layout {
    constructor(_container) {
        super();

        // { Events defining }
        this.events.define(['shown', 'hidden']);

        // { Initialisations }
        this.cards = new Map();
        this.shown = null;

        // { Container set up }
        if(!(_container instanceof HTMLElement))
            throw "Bad container type given for cards layout building";

        this.container = _container;
    }

    init() {
        this.container.classList.add("cards-layout");
    }

    add_item(_card) {
        if(this.cards.has(_card.id)) return;

        this.cards.set(_card.id, _card);
        this.container.appendChild(_card.html());
    }

    remove_item(_id) {
        const to_rm = this.cards.get(_id);
        if(!to_rm) return;

        to_rm.remove();
        this.cards.delete(_id);
    }

    get(_id) {
        return this.cards.get(_id);
    }

    clear() {
        this.cards.clear();
        this.container.innerHTML = "";
    }

    show(_id) {
        const to_show = this.cards.get(_id);
        if(!to_show) return;

        if(this.shown !== null) {
            this.shown.hide();
            this.events.trigger('hidden', this.shown);
        }

        this.shown = to_show;
        this.shown.show();
        this.events.trigger('shown', this.shown);

        return this.shown;
    }
}