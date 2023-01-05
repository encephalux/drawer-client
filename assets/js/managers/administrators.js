/** [Ova Assistant]
 * Date: 2022-02-06 12:45:35
 * Author: ova
 * Description: 
 */

/** @includes
 * ../core
 * ajax
 */

/** @libraries
 * 
 */

'use strict';

{
    const url_base = `${env.USER.api_url_base}/administrators`;

    const range = ({_factor, _page, filter = []}, _ajax_basket=undefined) => {

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

    const get = ({_id}, _ajax_basket = _ajax => null) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/get",
            type: "application/json",
            data: { _id },
            ajax_basket: _ajax_basket
        }, _ajax_basket);
    };

    const register = ({
                          _last_name,
                          _first_name,
                          _identifier,
                          _password,
                          _dial_code,
                          _telephone,
                          _email
                      }, _ajax_basket=undefined) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/register",
            type: "application/json",
            data: {
                _last_name,
                _first_name,
                _identifier,
                _password,
                _dial_code,
                _telephone,
                _email
            }
        }, _ajax_basket);
    };

    const update = ({
                        _id,
                        _last_name,
                        _first_name,
                        _identifier,
                        _dial_code,
                        _telephone,
                        _email
                    }, _ajax_basket = _ajax => null) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/update",
            type: "application/json",
            data: {
                _id,
                _last_name,
                _first_name,
                _identifier,
                _dial_code,
                _telephone,
                _email
            }
        }, _ajax_basket);
    };

    const remove = ({_id}, _ajax_basket = _ajax => null) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/remove",
            type: "application/json",
            data: { _id }
        }, _ajax_basket);
    };

    project.managers.administrators = {
        get,
        range,
        search,
        register,
        update,
        remove
    };
}