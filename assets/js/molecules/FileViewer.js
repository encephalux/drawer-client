/** [Ova Assistant]
 * Date: 2022-12-04 14:17:54
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 * ../ova/Events
 * ../ova/molecules/Toolbar
 * ../ova/molecules/ToolbarItem
 * LoadingFrame
 */

/** @libraries
 * 
 */

'use strict';

class FileViewer extends Molecule {
    constructor(_opts={}) {
        super();
        this.opts = Object.assign(FileViewer.dflt_opts, _opts);
        this.toolbar_width = 64;
        this.cur_state = {ctrls: {}};
        this.information = {};
        this.task_events = null;
        this.events.define(["file_loaded", "new_task"]);
        this.build();
    }

    show(_url, _information, _ctrls={}) {
        this.loading_frame.show();
        this.cur_state.ctrls = Object.assign(FileViewer.ctrls, _ctrls);
        this.task_events = new Events();
        this.information = _information;
        this.events.trigger("new_task");
        super.show();
        this.container.style.zIndex = env.page_overlay_z_index + (2 * project.page_overlay_count++) + 1;
        this.object.data = _url;

        return this.task_events;
    }

    hide() {
        super.hide();
        project.page_overlay_count--;
    }

    remove() {
        project.page_overlay_count--;
        super.remove();
    }

    show_ctrls() {}

    sizing() {
        this.object.width = `${window.innerWidth - this.toolbar_width}px`;
        this.object.height = `${window.innerHeight}px`;
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("file-viewer");
        this.object_wrapper = document.createElement("div");
        this.object_wrapper.className = "object-wrapper";
        this.inner.appendChild(this.object_wrapper);

        let toolbar_slot = document.createElement("div");
        toolbar_slot.className = "toolbar-slot";
        this.inner.appendChild(toolbar_slot);

        this.toolbar = new class extends Toolbar {
            constructor() {
                super("file-viewer-toolbar");
            }

            base_bld() {
                super.base_bld();
                const closer = new class extends ToolbarItem {
                    constructor() {
                        super("closer");
                        this.events.define("close");
                    }

                    base_bld() {
                        super.base_bld(document.createElement("a"));
                        this.container.classList.add("closer");
                        this.container.addEventListener("click", () => this.events.trigger("close"), !1);
                    }
                };
                this.add_item("closer", closer);
                closer.events.pipe(this.events, ["close"]);
            }
        };
        this.toolbar.events.add_listener("close", () => this.hide());
        toolbar_slot.appendChild(this.toolbar.html());

        this.object = document.createElement("object");
        this.object_wrapper.appendChild(this.object);

        this.loading_frame = new LoadingFrame();
        this.container.appendChild(this.loading_frame.html());
    }

    build() {
        super.build();
        this.sizing();
        this.object.addEventListener("load", () => {
            this.events.trigger("file_loaded");
            this.loading_frame.hide();
        });
        window.addEventListener("resize", _ev => this.sizing());
    }

    static get dflt_opts() { return {}; }

    static get ctrls() { return {}; }
}