/** [Ova Assistant]
 * Date: 2022-07-01 15:05:31
 * Author: ova
 * Description: 
 */

/** @includes
 * ova/molecules/Toolbar
 * ova/molecules/ToolbarItem
 * molecules/Notification
 * managers/users
 */

/** @libraries
 * 
 */

'use strict';

class Dashboard extends Dpml {
    constructor() {
        super();
        this.initialized = !1;
        project.events.define(["user_loaded"]);
    }

    init() {
        super.init();

        this.toolbar = new Toolbar("toolbar");
        document.querySelector(".toolbar-slot").appendChild(this.toolbar.html());


        // { Intercept logout event }
        project.events.add_listener("logout", () => {
            project.managers.users.logout().then(() => {
                localStorage.setItem("session_token", "");
                document.location = `/${env.LANG}/user/login`;
            }).catch(_err => {
                (new Notification("Une erreur est survénue lors de la déconnexion de votre compte")).notify();
            });
        });
    }

    load_user() {

        return project.managers.users.get().then(_user => {
            storage.user = _user;
            this.initialized = !0;
            project.events.trigger("user_loaded", env.user);
        }).finally(() => this.loading_frame.hide());
    }
}

let fo = new Dashboard();
app.instance = fo;
fo.run();