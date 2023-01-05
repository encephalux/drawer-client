/** [Ova Assistant]
 * Date: 2022-02-01 17:47:50
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
    const url_base = `${env.API_URL_BASE}/api/user`;

    project.managers.auth = {};

    const mgr = project.managers.auth;

    mgr.login = ({_identifier: _email, _password}) => {

        return project.managers.ajax.request({
            method: "POST",
            url: `${url_base}/auth/login`,
            data: {_email, _password},
            type: "application/json",
            with_credentials: !0
        });
    };

    mgr.logout = () => {

        return project.managers.ajax.authenticated_request({
            method: "POST",
            url: `${url_base}/auth/logout`
        });
    };
}