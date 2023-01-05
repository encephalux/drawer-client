/** [Ova Assistant]
 * Date: 2022-11-28 18:38:50
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/Molecule
 * ../atoms/ProgressBar
 * ../atoms/Button
 */

/** @libraries
 * 
 */

'use strict';

class UploadMonitor extends Molecule {
    constructor() {
        super();
        this.events.define(["close", "cancel"]);
        this.uploader = null;
        this.completed = !1;
        this.success = null;
        this.build();
    }

    set_label(_str) {
        this.label.innerHTML = _str;
    }

    attach_uploader(_uploader) {
        this.uploader = _uploader;
        this.uploader.events.add_listener("start", ({_computable, _total}) => {
            this.set_label("Envoi en cours...");
            if(_computable) {
                this.progress_bar.set_target(_total);
            } else this.progress_bar.set_not_computable();
        }).add_listener("progress", ({_loaded}) => {
            this.progress_bar.set_level(_loaded);
        }).add_listener("uploaded", () => {
            this.set_label("Finalisation...");
        }).add_listener("success", () => {
            this.set_success();
        }).add_listener("error", () => {
            this.set_error();
        });
    }

    set_success() {
        this.success = !0;
        this.container.classList.add("success");
        this.progress_bar.set_success();
        this.set_label("Terminé");
        this.cancel_btn.inner.innerHTML = "Fermé";
    }

    set_error() {
        this.success = !1;
        this.container.classList.add("error");
        this.set_label("Echec");
        this.progress_bar.set_error();
        this.cancel_btn.inner.innerHTML = "Fermé";
    }

    base_bld() {
        super.base_bld();
        this.container.classList.add("upload-monitor");
        this.inner.innerHTML = `
            <div class="field label">Préparation</div>
            <div class="progress-bar-slot"></div>
            <div class="bottom">
                <div class="state"></div>
                <div class="cancel-btn-slot"></div>
            </div>
        `;
        this.label = this.inner.querySelector(".field.label");
        this.progress_bar = new ProgressBar();
        this.inner
            .querySelector(".progress-bar-slot")
            .appendChild(this.progress_bar.html());
        this.progress_bar.set_not_computable();
        this.cancel_btn = new class extends Button {
            base_bld() {
                super.base_bld();
                this.container.classList.add("canceller", "inline");
                this.inner.innerHTML = "Annuler";
            }
        };
        this.inner
            .querySelector(".cancel-btn-slot")
            .appendChild(this.cancel_btn.html());
    }

    build() {
        super.build();
        this.cancel_btn.add_event_listener("click", () => {
            if(!this.completed) this.events.trigger("cancel");
            this.events.trigger("close");
        });
    }
}