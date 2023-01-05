/** [Ova Assistant]
 * Date: 2022-02-08 21:05:55
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Layout
 */

/** @libraries
 * 
 */

'use strict';

class TableLayout extends Layout {
    constructor(_container, _columns=[], _constraints={}) {
        super(_container);
        this.id = "table-"+TableLayout.count++;
        this.constraints = _constraints;
        this.columns = _columns;
        this.build();
    }

    init() {
        super.init();
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.thead.innerHTML = `
            <tr>
                <th class="checkbox-cell"></th>
                ${this.columns.reduce((_str, _value) => `${_str}<th class="cell">${_value}</th>`, "")}
                <th class="row-dock-cell"></th>
            </tr>
        `;
        this.table.appendChild(this.thead);
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.tbody);

        this.container.appendChild(this.table);
        this.css();
    }

    build() {
        this.container.classList.add("table-layout", this.id);

        this.style = document.createElement("style");
        this.style.id = this.id;
        document.head.appendChild(this.style);
    }

    add_item(_item) {
        this.tbody.appendChild(_item.html());
    }

    update() {
        this.css();
    }

    css() {
        /*this.style.innerHTML = `
            .layout.${this.id} th:not(.checkbox-cell):not(.row-dock-cell) { 
                min-width: calc((100% - (var(--row-dock-cell-width) + var(--checkbox-cell-width))) / ${this.columns.length});
            }
        `;
        this.style.innerHTML = `
            .layout.${this.id} tr {
                display: grid;
                grid-template-columns: 42px auto auto 64px;
                grid-template-rows: 1fr;
            }
            .layout.${this.id} th:not(.checkbox-cell):not(.row-dock-cell) { 
                min-width: calc(${100 / this.columns.length}% - ${108/this.columns.length}px);
            }
        `;*/
    }

    clear() {
        this.tbody.innerHTML = "";
        this.items = {};
    }
}

TableLayout.count = 0;