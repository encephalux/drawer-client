/** [Ova Assistant]
 * Date: 2022-10-30 17:52:57
 * Author: ova
 * Description: 
 */

/** @includes
 * ajax
 */

/** @libraries
 * 
 */

'use strict';

{
    project.managers.read_only = _path => {
        let url_base = `${env.API_URL_BASE}/api/${env.USER.url_node}/${_path}`;

        const get = ({_id}, _ajax_basket=() => null) => {

            return project.managers.ajax.authenticated_request({
                url: url_base+"/get",
                type: "application/json",
                data: { _id }
            }, _ajax_basket);
        };

        const range = ({
            _factor = 10,
            _page = 1,
            filter = []
        }, _ajax_basket=undefined) => {

            return project.managers.ajax.authenticated_request({
                url: url_base+"/range",
                type: "application/json",
                data: {_factor, _page, filter}
            }, _ajax_basket);
        };

        const search = ({
            _str,
            _factor = 10,
            _page = 1,
            filter = []
        }, _ajax_basket=undefined) => {

            return project.managers.ajax.authenticated_request({
                url: url_base+"/search",
                type: "application/json",
                data: {_str, _factor, _page, filter}
            }, _ajax_basket);
        };

        return { get, range, search};
    }
}