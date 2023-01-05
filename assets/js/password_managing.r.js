/** [Ova Assistant]
 * Date: 2022-09-16 18:00:35
 * Author: ova
 * Description: 
 */

/** @includes
 * dpml
 * ova/managers/form/rules/PasswordRule
 * atoms/PushButton
 * atoms/form/fields/ShortText
 * molecules/Notification
 */

/** @libraries
 * 
 */

'use strict';

class PasswordManaging extends Dpml {
    constructor() {
        super();
        this.mode = window.env.has_token ? "update":"request";
        this.token = window.env.token;
    }

    init() {
        super.init();
        this.indication_layer = document.querySelector(".layer.indication");
        this.mount();
        this.submitter = PushButton.from_DOM(document.querySelector(".submitter"));
        this.submitter.events.add_listener("pushed", () => {
            this.send();
        });
    }

    mount() {
        if(this.mode === "request") {
            this.str_fld = new ShortText(document.querySelector("form .field._email_or_identifier"), "_email_or_identifier");
            this.str_fld.add_rule(new class extends FormRule {
                constructor() {
                    super();
                    this.message = "Veuillez saisir un identifiant ou email valide";
                }

                validate(_value) {
                    return RegexCollection.patterns.identifier.test(_value) || RegexCollection.patterns.email.test(_value);
                }
            });
        } else if(this.mode === "update") {
            this.password_fld = new ShortText(document.querySelector(".field._password"), "_password");
            this.password_fld.add_rule(new PasswordRule());

            this.password_repeat_fld = new ShortText(document.querySelector(".field._password_repeat"), "_password_repeat");
            this.password_repeat_fld.add_rule(new PasswordRule());
            this.password_repeat_fld.add_rule(new (class extends FormRule {
                constructor(_ref) {
                    super();
                    this.ref = _ref;
                    this.message = "Veuillez entrer le même mot de passe que dans le champ précédent";
                }

                validate(_value) {
                    return this.ref.value === _value;
                }
            })(this.password_fld));
        }
    }

    send() {
        if(this.mode === "request") {
            if(!this.str_fld.is_valid) return (async () => this.submitter.release())();
            this.str_fld.disable();
            return project.managers.password_managing.request({_email_or_identifier: this.str_fld.value}).then(() => {
                this.indication_layer.classList.add("active");

                let push = PushButton.from_DOM(this.indication_layer.querySelector(".push-button"));
                push.events.add_listener("pushed", () => {
                    project.managers.password_managing.request({_email_or_identifier: this.str_fld.value}).then(() => {
                        (new Notification("Le lien de réinitialisation a été envoyé avec succès!")).notify();
                    }).catch(_err => {
                        (new Notification("L'envoie a échoué!")).notify();
                    }).finally(() => push.release());
                });
            }).catch(_err => {
                if(_err.status) {
                    if(_err.status === "USER_NOT_FOUND_ERROR") {
                        new Notification("Utilisateur non trouvé").notify();
                    }
                } else new Notification("Une erreur est survénue lors de l'opération").notify();
            }).finally(() => {
                this.submitter.release();
                this.str_fld.enable();
            });
        } else if(this.mode === "update") {
            if(!this.password_fld.is_valid || !this.password_repeat_fld.is_valid) return (async () => this.submitter.release())();
            this.password_fld.disable();
            this.password_repeat_fld.disable();

            return project.managers.password_managing.set({_password: this.password_fld.value, _token: this.token}).then(() => {
                this.indication_layer.classList.add("active");
            }).catch(_err => {
                if(_err.status) {
                    if(_err.status === "USER_NOT_FOUND_ERROR") {
                        new Notification("Utilisateur non trouvé").notify();
                    }
                } else new Notification("Une erreur est survénue lors de l'opération").notify();
            }).finally(() => this.submitter.release());
        }
    }
}

let pass_managing = new PasswordManaging();
pass_managing.run();