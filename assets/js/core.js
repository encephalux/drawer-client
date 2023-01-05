/** [Ova Assistant]
 * Date: 2021-09-17 00:09:33
 * Author: ova
 * Description: 
 */

/** @includes
 * env
 * ova/core
 * ova/Events
 */

/** @libraries
 * 
 */

'use strict';

moment.locale(env.LANG);

window[window.env.APP_CSS_CLASS] = {
    page_overlay_count: 0,
    managers: {},
    events: new Events(),
    errors: {}
};

let project = window[window.env.APP_CSS_CLASS] ;

window.storage = {};

// { Project level events }

project.events.define(["logout"]);

function parse_exploitation(_data) {
    if(!_data._exploitation_licence) return {
        str: "Sans licence d'exploitation",
        state: "null"
    };

    const date = moment(_data._exploitation_expiration);
    const diff = Math.ceil(moment().diff(date, "days", !0));

    let str = "Licence d'exploitation ", state;

    if(diff < 0) {
        str += "expirée";
        state = "expired";
    } else if(diff === 0) {
        str += "expire aujourd'hui";
        state = "warning";
    } else if(diff < 30) {
        str += `expire dans ${diff} jour(s)`;
        state = "warning";
    } else {
        str += `valide jusqu'à ${date.format(env.H_DATE_FORMAT)}`;
        state = "valide";
    }

    return {str, state};
}

// { Common manager for entity that just have code and name fields }

function common_mgr (_name) {
    const url_base = `${window.env.API_URL_BASE}/api/${env.USER.url_node}/${_name.replace("_", "-")}`;

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

    const register = ({_code, _name}, _ajax_basket=undefined) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/register",
            type: "application/json",
            data: {_code, _name}
        }, _ajax_basket);
    };

    const update = ({_id, _code, _name}, _ajax_basket=undefined) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/update",
            type: "application/json",
            data: {_id, _code, _name}
        }, _ajax_basket);
    };

    const remove = ({_id}, _ajax_basket=() => null) => {

        return project.managers.ajax.authenticated_request({
            url: url_base+"/remove",
            type: "application/json",
            data: { _id }
        }, _ajax_basket);
    };

    return {
        get,
        range,
        search,
        register,
        update,
        remove
    };
}