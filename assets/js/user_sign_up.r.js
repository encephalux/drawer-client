/** [Ova Assistant]
 * Date: 2022-07-02 19:20:44
 * Author: ova
 * Description: 
 */

/** @includes
 * dpml
 * ova/managers/LoadingState
 * ova/managers/form/FormManager
 * ova/managers/form/rules/NameRule
 * ova/managers/form/rules/LengthRule
 * ova/managers/form/rules/EmailRule
 * ova/managers/form/rules/PasswordRule
 * atoms/PushButton
 * atoms/form/fields/ShortText
 * atoms/form/fields/DateField
 * managers/users
 */

/** @libraries
 * 
 */

'use strict';

class UserSignUp extends Dpml {

    init() {
        super.init();

        this.form = document.querySelector("form");
        this.form_mgr = new FormManager(this.form);
        this.mount();

        // { Submitter }
        this.submitter = PushButton.from_DOM(document.querySelector(".button.submitter"));
        this.submitter.add_event_listener("click", _ev => {
            this.sign_up();
        });
        this.submitter.events.add_listener("released", () => {
            this.form_mgr.enable();
        });
        this.loading_state = this.submitter.loading_state;
    }

    mount() {
        // { Last name field }
        let _fld_last_name = ShortText.from_DOM(this.form.querySelector("._last_name"), "_last_name");
        _fld_last_name.add_rule(new NameRule());
        _fld_last_name.add_rule(new LengthRule({min: 2, max: 160}));
        this.form_mgr.add_field("_last_name", _fld_last_name);

        // { First name field }
        let _fld_first_name = ShortText.from_DOM(this.form.querySelector("._first_name"), "_first_name");
        _fld_first_name.add_rule(new NameRule());
        _fld_first_name.add_rule(new LengthRule({min: 2, max: 160}));
        this.form_mgr.add_field("_first_name", _fld_first_name);

        // { Date field }
        let _fld_birthday = DateField.from_DOM(this.form.querySelector("._birthday"), "_birthday");
        this.form_mgr.add_field("_birthday", _fld_birthday);

        // { Email field }
        let _fld_email = ShortText.from_DOM(this.form.querySelector("._email"), "_email");
        _fld_email.add_rule(new EmailRule());
        this.form_mgr.add_field("_email", _fld_email);

        // { Password field }
        let _fld_password = ShortText.from_DOM(this.form.querySelector("._password"), "_password");
        _fld_password.add_rule(new PasswordRule());
        this.form_mgr.add_field("_password", _fld_password);
    }

    sign_up() {
        if(this.form_mgr.is_valid()) {
            this.form_mgr.disable();

            project.managers.users.register(this.form_mgr.values()).then(_data => {
                this.cur_user = {
                    _id: _data._id,
                    ...data
                };
                this.cur_user = data;
                this.succeeded();
            }).catch(_err => {
                if(_err.code === "USER_EMAIL_ALREADY_REGISTERED_ERROR") {
                    (new Notification("Désolé, cet email est déjà utilisé.")).notify();
                } else {
                    (new Notification("Une erreur est survenue lors de la demande.")).notify();
                }
            }).finally(() => this.submitter.release());
        } else this.submitter.release();
    }

    succeeded() {
        let sign_up_form = document.querySelector(".sign-up-form");
        this.succeeded_layer = sign_up_form.querySelector(".layer.succeeded");
        this.succeeded_layer.classList.add("active");

        /*let push = PushButton.from_DOM(this.succeeded_layer.querySelector(".push-button"));
        push.events.add_listener("pushed", _btn => {
            project.managers.users.rsd_email_confirmation_mail(this.cur_user._identifier).then(() => {
                (new Notification("L'email de confirmation a été envoyé avec succès!")).notify();
            }).catch(_err => {
                (new Notification("L'envoie a échoué!")).notify();
            }).finally(() => push.release());
        });*/
    }
}

let user_sign_up = new UserSignUp();
user_sign_up.run();