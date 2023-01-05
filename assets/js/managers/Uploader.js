/** [Ova Assistant]
 * Date: 2022-11-29 07:17:20
 * Author: ova
 * Description: 
 */

/** @includes
 * ../ova/network/Ajax
 */

/** @libraries
 * 
 */

'use strict';

class Uploader {
    constructor({_url, _files, _text_flds}) {
        this.url = _url;
        this.files = _files;
        this.text_flds = _text_flds ?? {};
        this.ajax = null;
        this.computable = null;
        this.events = new Events();
        this.events.define(["start", "progress", "cancelled", "uploaded", "success", "error", "aborted"]);
    }

    init() {
        this.form_data = FormData.from_object(this.text_flds);
        for(let file of this.files)
            this.form_data.append("f_file", file);
        this.initialized = !0;
    }

    upload() {
        if(!this.initialized) this.init();

        this.ajax = new Ajax({
            url: this.url,
            method: "POST",
            type: "form-data",
            data: this.form_data,
            with_credentials: !0
        });
        this.ajax.xhr.upload.addEventListener("loadstart", _ev => {
            this.computable = _ev.lengthComputable;
            let params = {_computable: _ev.lengthComputable};
            if(_ev.lengthComputable)  {
                params._loaded = _ev.loaded;
                params._total = _ev.total;
            }
            this.events.trigger("start", params);
        });
        this.ajax.xhr.upload.addEventListener("progress", _ev => {
            if(this.computable)
                this.events.trigger("progress", {
                    _loaded: _ev.loaded,
                    _total: _ev.total
                });
        });
        this.ajax.xhr.upload.addEventListener("load", _ev => {
            this.events.trigger("uploaded", {
                _loaded: _ev.loaded,
                _total: _ev.total
            });
        });
        this.ajax.xhr.addEventListener("error", _ev => {
            console.log("eerooor");
        });
        this.ajax.then(_response => {
            this.events.trigger("success", _response);
        }).catch(_err => {
            this.events.trigger("error", _err);
        });

        this.ajax.send();
    }

    cancel() {
        this.ajax.abort();
    }
}