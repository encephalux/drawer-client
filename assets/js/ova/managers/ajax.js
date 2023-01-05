/** [Ova Assistant]
 * Date: 2022-02-27 09:45:44
 * Author: ova
 * Description: 
 */

/** @includes
 * ../core
 * ../network/Ajax
 */

/** @libraries
 * 
 */

'use strict';

window.app.managers.ajax = {
    request: (_options, _ajax_basket=undefined) => {
        let ajax =  new Ajax(_options);

        ajax.then(_response => {
            let obj = null;
            try {
                obj = JSON.parse(_response);
                if(obj.status === "OK") return obj.content;
            } catch(_err) {}

            if(typeof obj === "object") throw obj;

            throw ({code: "BAD_RESPONSE", content: {xhr: ajax.xhr}});
        });

        ajax.catch(_err => {
            if(_err.code === "ABORTED") throw _err;

            let obj = null;

            try {
                obj = JSON.parse(ajax.xhr.responseText);
            } catch(_err) {}

            if (obj && obj.status) throw {code: obj.status, content: obj};

            throw ({code: "UNKNOWN", content: {err: _err, xhr: ajax.xhr}});
        });

        if(_ajax_basket) _ajax_basket(ajax);

        return ajax.send();
    }
};