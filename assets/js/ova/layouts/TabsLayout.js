/** [Ova Assistant]
 * Date: 2019-02-03 16:55:45
 * Author: ova
 * Description:
 */

/** @includes
 * ../Layout
 * CardsLayout
 */

/** @libraries
 *
 */

"use strict";

class TabsLayout extends Layout {
    constructor(_container) {
        super();

        // { Define events }
        this.events.define(['shown', 'hidden']);

        // { Initialisations }
        this.tabs = new Map();
        this.cur_tab = null;
        this.tab_callback = _id => this.show(_id);

        // { Container set up }
        if(!(_container instanceof HTMLElement))
            throw "Bad container type given for tabs layout building";

        this.container = _container;
    }

    init() {
        this.container.classList.add("tabs-layout");

        this.tabs_container = document.createElement("div");
        this.tabs_container.className = "tabs-layout tabs";
        this.container.appendChild(this.tabs_container);

        this.cards_container = document.createElement("div");
        this.cards_container.className = "tabs-layout cards";
        this.cards = new CardsLayout(this.cards_container);
        this.container.appendChild(this.cards_container);
        this.cards.init();
    }

    get(_id) {
        return {
            tab: this.tabs.get(_id),
            card: this.cards.get(_id)
        };
    }

    add_item(_tab, _card) {
        if(this.tabs.has(_tab.id) || _tab.id !== _card.id) return;

        this.tabs.set(_tab.id, _tab);
        _tab.events.add_listener("show", this.tab_callback);
        this.tabs_container.appendChild(_tab.html());
        this.cards.add_item(_card);
    }

    remove_item(_id) {
        const tab_to_rm = this.tabs.get(_id);
        if(!tab_to_rm) return;

        tab_to_rm.remove();
        tab_to_rm.events.remove_listener(this.tab_callback);
        this.tabs.delete(_id);

        this.cards.remove_item(_id);
    }

    clear() {
        this.tabs_container.innerHTML = "";
        this.tabs.forEach((_tab) => _tab.events.remove_listener(this.tab_callback));
        this.tabs.clear();
        this.cards.clear();
    }

    show(_id) {
        if(this.cur_tab && _id === this.cur_tab.id) return;

        const tab_to_show = this.tabs.get(_id);
        if(!tab_to_show) return;

        this.cur_tab && this.cur_tab.unselect();
        tab_to_show.select();
        this.cur_tab = tab_to_show;

        this.events.trigger('shown', {card: this.cards.show(_id)});
    }
}