/** [Ova Assistant]
 * Date: 2022-07-06 23:46:30
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
    const url_base = `${env.API_URL_BASE}/api/users`;

    const register = ({_last_name, _first_name, _birthday, _email, _password}, _ajax_basket=_ajx => null) => {

        return project.managers.ajax.request({
            url: `${url_base}/register`,
            method: "POST",
            type: "application/json",
            data: {_last_name, _first_name, _email, _birthday, _password}
        });
    };

    const get = (_ajax_basket=_ajx => null) => {

        return project.managers.ajax.authenticated_request({
            url: `${url_base}/get`,
            method: "POST",
            type: "application/json",
            data: {}
        });
    };

    const update = ({_last_name, _first_name, _birthday}, _ajax_basket=_ajx => null) => {

        return project.managers.ajax.authenticated_request({
            url: `${url_base}/update`,
            method: "POST",
            type: "application/json",
            data: {_last_name, _first_name, _birthday}
        });
    };

    const update_password = ({_password}, _ajax_basket=_ajx => null) => {

        return project.managers.ajax.authenticated_request({
            url: `${url_base}/update-password`,
            method: "POST",
            type: "application/json",
            data: {_password}
        });
    };

    const rsd_email_confirmation_mail = (_identifier, _ajax_basket=_ajx => null) => {

        return project.managers.ajax.request({
            url: `${url_base}/resend-email-confirmation-mail`,
            method: "POST",
            type: "application/json",
            data: {lang: window.env.LANG, _identifier}
        });
    };

    const account_confirm = (_token, _ajax_basket=_ajx => null) => {

        return project.managers.ajax.request({
            url: `${url_base}/account/confirm`,
            method: "POST",
            type: "application/json",
            data: {token: _token}
        });
    };

    project.managers.users = {
        register,
        get,
        update,
        update_password,
        rsd_email_confirmation_mail,
        account_confirm
    };
}