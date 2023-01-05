/** [Ova Assistant]
 * Date: 2022-02-01 17:49:04
 * Author: ova
 * Description: 
 */

/** @includes
 * ../core
 * ../ova/managers/ajax
 */

/** @libraries
 * 
 */

'use strict';
(function() {

    function request(_options, _ajax_basket=undefined) {
        if(!_options.hasOwnProperty("method")) _options.method = "POST";
        if(!_options.hasOwnProperty("type")) _options.type = "application/json";

        return window.app.managers.ajax.request(_options, _ajax_basket);
    }

    function authenticated_request(_options, _ajax_basket=undefined) {
        _options.with_credentials = !0;
        const session_token = localStorage.getItem("session_token");
        // { Add session_token }
        if(_options.type === "application/json" || !_options.type) {
            if (!_options.hasOwnProperty("data")) _options.data = {};
            _options.data.session_token = session_token;
        } else if(_options.type === "form-data") {
            if (!_options.hasOwnProperty("data")) _options.data = new FormData();
            _options.data.append("session_token", session_token);
        }

        return request(_options, _ajax_basket);
    }

    project.managers.ajax = {
        request,
        authenticated_request
    };
})();