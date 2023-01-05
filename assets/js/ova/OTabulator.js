/** [Ova Assistant]
 * Date: 2020-03-04 13:40:45
 * Author: ova
 * Description:
 */

/** @includes
 * Events
 * layouts/TabsLayout
 * LoadingState
 */

/** @libraries
 *
 */

"use strict";

class OTabulatorEnv {
    constructor() {
        this.cache = null;
        this.columns = [];
        this.sortColumns = [];
    }

    data() {
        return new Promise((_resolve, _reject) => {
            _resolve();
        });
    }

    controller(_controller){
        return new Promise((_resolve, _reject) => {
            _resolve();
        });
    }

    addRow() {
        return new Promise((_resolve, _reject) => {
            _resolve();
        });
    }

    editRow(_row) {
        return new Promise((_resolve, _reject) => {
            _resolve();
        });
    }

    delRows(_rows) {
        return new Promise((_resolve, _reject) => {
            _resolve();
        });
    }

    filter(_str) { return []; }
}

class ControlPane extends TabsLayout {
    constructor() {
        super();

        //Additional events defining
        this.events.define(['addrow', 'editrow', 'delrow', 'filtering']);

        this.container.classList.add('table-controls');

        //Tableau item
        let tableau = document.createElement('div');

        let addBtn = document.createElement('a');
        addBtn.className = 'add-row-btn';
        addBtn.innerHTML = '<span class="icofont-plus"></span>Nouveau';
        addBtn.addEventListener('click', () => {
            this.events.trigger('addrow');
        }, false);
        tableau.appendChild(addBtn);

        let editBtn = document.createElement('a');
        editBtn.className = 'edit-row-btn';
        editBtn.innerHTML = '<span class="fa fa-edit"></span>Modifier';
        editBtn.addEventListener('click', () => {
            this.events.trigger('editrow');
        }, false);
        tableau.appendChild(editBtn);

        let delBtn = document.createElement('a');
        delBtn.className = 'del-row-btn';
        delBtn.innerHTML = '<span class="fa fa-trash"></span>Supprimer';
        delBtn.addEventListener('click', () => {
            this.events.trigger('delrow');
        }, false);
        tableau.appendChild(delBtn);

        let searcher = document.createElement('input');
        searcher.className = 'row-searcher';
        searcher.type = 'text';
        searcher.placeholder = 'Rechercher';
        searcher.addEventListener('keyup', _ev => {
            this.events.trigger('filtering', _ev.target.value);
        }, false);
        tableau.appendChild(searcher);

        this.addItems({
            tableau: {
                label: 'Tableau',
                card: tableau
            }
        });
    }

    reset() {
        if(this.activated !== null) this.tabsContainer.querySelector('.active').classList.remove('active');
        for(let key in this.items)
            if(this.items.hasOwnProperty(key))
                if(key !== 'tableau')
                    this.remove(key);
        this.get('tableau').card.card.classList.remove('active');
        this.activated = null;
    }
}

class OTabulator extends HTML{
    constructor(_options=OTabulator.defaultOptions()) {
        super();

        this.events.define(['loading']);
        this.options = _options;

        //Components
        this.table = document.createElement('div');
        this.table.className = 'table';
        this.table.innerHTML = 'Aucune données';

        this.container = document.createElement('div');
        this.container.className = 'ova tabulator';

        if(this.options.controller) {
            this.controller = new ControlPane();
            this.container.appendChild(this.controller.html());
        }
        this.container.appendChild(this.table);

        this.tabulator = null;

        this.loadingFrame = document.createElement('div');
        this.loadingFrame.innerHTML = '\n' +
            '                    <div class="ball"></div>\n' +
            '                    <div class="ball"></div>\n' +
            '                    <div class="ball"></div>\n';
        this.loadingFrame.className = 'loading-frame';
        this.container.appendChild(this.loadingFrame);

        //Multi data manage utilities
        this.active = null;
        this.envs = {};

        //Events land

        //Loading state managing
        this.loading_state = new LoadingState();
        this.loading_state.events.addListener('loaded', () => {
            this.loadingFrame.classList.add('active');
            this.events.trigger('loading', this.loadingFrame);
        }).addListener('unloaded', () => {
            this.loadingFrame.classList.remove('active');
        });

        //Controller events listening
        if(this.options.controller)
            this.controller.events.addListener('addrow', () => {
                this.envs[this.active].addRow().then(_data => {
                    this.loading_state.load();
                    this.tabulator.addData([_data]);
                    this.loading_state.unload();
                });
            }).addListener('editrow', () => {
                let rows = this.tabulator.getSelectedRows();
                if(rows.length === 1)
                    this.envs[this.active].editRow(rows[0]).then(_value => {
                        this.loading_state.load();
                        rows[0].update(_value);
                        this.loading_state.unload();
                    });
            }).addListener('delrow', () => {
                let rows = this.tabulator.getSelectedRows();
                this.envs[this.active].delRows(rows).then(() => {
                    this.loading_state.load();
                    for(let i=0; i < rows.length; i++){
                        rows[i].delete();
                    }
                    this.loading_state.unload();
                });
            }).add_listener('filtering', _str => {
                this.tabulator.setFilter(this.envs[this.active].filter(_str));
            });
    }

    html() {
        return this.container;
    }

    load(_columns, _data) {
        this.loading_state.load();

        _data.then(_value => {
            //Clean an old instance
            if(this.tabulator !== null) this.tabulator.destroy();

            //New instance
            this.options.tabulatorOptions.columns = _columns;
            this.options.tabulatorOptions.data = _value;
            this.tabulator = new Tabulator(this.table, this.options.tabulatorOptions);

            this.tabulator.setSort(this.envs[this.active].sortColumns);

            this.loading_state.unload();
        }).catch(_reason => {
            this.loading_state.unload();
        });
    }

    reloadData() {
        this.loading_state.load();
        this.tabulator.clearData();
        this.envs[this.active].data().then(_value => {
            this.tabulator.setData(_value).finally(() => {
                this.loading_state.unload();
            });
        }).catch(() => {
            this.loading_state.unload();
        });
    }

    addEnv(_key, _env) {
        this.envs[_key] = _env;
    }

    removeEnv(_key) {
        delete this.envs[_key];
    }

    setActive(_key) {
        if(this.active !== _key) {
            this.loading_state.load();
            this.active = _key;

            //Controller loading
            if(this.options.controller) {
                this.controller.reset();
                this.loading_state.load();
                this.envs[this.active].controller(this.controller).then(() => {
                    this.loading_state.unload();
                });
            }

            //Data loading
            this.load(this.envs[this.active].columns, this.envs[this.active].data());

            this.loading_state.unload();
        }
    }

    setControlPane(_controlPane) {
        if(_controlPane instanceof ControlPane)
            this.controller = _controlPane;
    }

    static defaultOptions() {
        return {
            controller: true,
            tabulatorOptions: {
                layout:"fitDataFill",      //fit columns to width of table
                layoutColumnsOnNewData: true,
                height: '100%',
                locale: 'fr',
                //responsiveLayout:"collapse",  //hide columns that dont fit on the table
                tooltips:true,            //show tool tips on cells
                addRowPos:"top",          //when adding a new row, add it to the top of the table
                history:true,             //allow undo and redo actions on the table
                pagination:"local",       //paginate the data
                paginationSize:20,         //allow 7 rows per page of data
                movableColumns:true,      //allow column order to be changed
                resizableRows:false,       //allow row order to be changed
                columns: [],
                data: [],
                selectable: true,
                langs: {
                    fr: {
                        pagination: {
                            first: '<<',
                            first_title: 'Première page',
                            last: '>>',
                            last_title: 'Dèrnière page',
                            prev: '<',
                            prev_title: 'Précédent',
                            next: '>',
                            next_title: 'Suivant'

                        }
                    }
                }
            }
        };
    }
}