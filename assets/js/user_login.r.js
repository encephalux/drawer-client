/** [Ova Assistant]
 * Date: 2022-07-01 15:05:18
 * Author: ova
 * Description: 
 */

/** @includes
 * dpml
 * molecules/Notification
 * managers/auth
 * ova/managers/form/FormManager
 * ova/managers/form/rules/EmailRule
 * ova/managers/form/rules/PasswordRule
 * atoms/form/fields/ShortText
 * atoms/PushButton
 */

/** @libraries
 *
 */

'use strict';

class UserLogin extends Dpml {

    init() {
        super.init();

        this.form_mgr = new FormManager(document.querySelector("form"));
        this.mount();

        this.submit_btn = PushButton.from_DOM(document.querySelector(".push-button.submit"));
        this.submit_btn.events.add_listener("pushed", _ev => {
            this.auth();
        });
    }

    auth() {
        if(this.form_mgr.is_valid()) {
            this.form_mgr.disable();

            project.managers.auth.login(this.form_mgr.values()).then(_response => {
                localStorage.setItem("session_token", _response.session_token);
                document.location = `/${env.LANG}/user/dashboard`;
            }).catch(_err => {
                if (_err.code === "USER_WRONG_AUTH_PARAMETERS_ERROR") {
                    (new Notification("Identifiant ou mot de passe incorrect")).notify();
                } else (new Notification("Une erreur a été rencontrée lors de la demande")).notify();
            }).finally(() => {
                this.submit_btn.release();
                this.form_mgr.enable();
            });
        } else this.submit_btn.release();
    }

    mount() {
        // { Identifier field }
        let _fld_email = ShortText.from_DOM(this.form_mgr.form.querySelector("._email"), "_email");
        _fld_email.add_rule(new EmailRule());
        this.form_mgr.add_field("_email", _fld_email);

        // { Password field }
        let _fld_password = ShortText.from_DOM(this.form_mgr.form.querySelector("._password"), "_password");
        _fld_password.add_rule(new PasswordRule());
        this.form_mgr.add_field("_password", _fld_password);
    }
}

let login = new UserLogin();
login.run();