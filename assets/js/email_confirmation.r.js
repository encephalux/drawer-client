/** [Ova Assistant]
 * Date: 2022-09-15 22:00:52
 * Author: ova
 * Description: 
 */

/** @includes
 * dpml
 * atoms/PushButton
 * managers/users
 * molecules/LoadingFrame
 * molecules/Notification
 */

/** @libraries
 *
 */

'use strict';

class EmailConfirmation extends Dpml {
    constructor() {
        super();
        this.token = window.env.token;
        this.payload = window.env.payload;
    }

    init() {
        super.init();
        if(this.token) {
            this.indication = document.querySelector(".indication");
            this.confirm().catch(_err => {
                if(_err.status) {
                    if(_err.status === "USER_EMAIL_ALREADY_CONFIRMED_ERROR") {
                        this.indication.innerHTML = `
                            <p>Votre email est déjà confirmé.</p>
                            <p>Veuillez cliquer sur le bouton ci-dessous pour vous connecter et bénéficier de nos services</p>
                            <div class="action">
                                <a href="/${window.env.LANG}/user/login" class="${window.env.APP_CSS_CLASS} atom button filled primary">
                                    <div class="inner">Se connecter</div>
                                </a>
                            </div>
                        `;

                        return;
                    } else if(_err.status === "USER_NOT_FOUND_ERROR") {
                        this.indication.innerHTML = `
                            <p>Désolé nous n'avons pas trouvé votre compte</p>
                            <p>Veuillez cliquer sur le bouton ci-dessous pour créer votre compte</p>
                            <div class="action">
                                <a href="/${window.env.LANG}/user/sign-up" class="${window.env.APP_CSS_CLASS} atom button filled primary">
                                    <div class="inner">Créer un compte</div>
                                </a>
                            </div>
                        `;

                        return;
                    }
                }

                this.indication.classList.add("error");
                this.indication.innerHTML = `
                    <p>Nous avons rencontré une erreur lors de la confirmation de votre adresse email</p>
                    <p>Vous pouvez relancer l'opération en cliquant sur le bouton ci-dessous</p>
                    <div class="action"></div>
                `;
                let push_button = new PushButton("Relancer");
                push_button.html().classList.add("filled", "primary");
                push_button.events.add_listener("pushed", () => {
                    this.confirm().catch(_err => {
                        (new Notification("Erreur lors de l'opération")).notify();
                    }).finally(() => push_button.release());
                });
                this.indication.querySelector(".action").appendChild(push_button.html());
            });
        } else if(payload) {
            let push_button = PushButton.from_DOM(document.querySelector(".push_button"));
            push_button.events.add_listener("pushed", () => {
                project.managers.users.rsd_email_confirmation_mail(payload.identifier).then(() => {
                    (new Notification("Email de confirmation envoyé!")).notify();
                }).catch(_err => {
                    if(_err.status) {
                        if(_err.status === "USER_NOT_FOUND_ERROR") {
                            new Notification("Utilisateur non trouvé").notify();
                        }
                    } else new Notification("Une erreur est survénue lors de l'opération").notify();
                }).finally(() => push_button.release());
            });
        }
    }

    confirm() {
        return project.managers.users.confirm_email(this.token).then(() => {
            this.indication.classList.remove("error");
            this.indication.classList.add("success");
            this.indication.innerHTML = `
                <h2>Bienvenue! à la DPML</h2>
                <p>Votre email a été confirmé avec succès!</p>
                <p>Veuillez cliquer sur le bouton ci-dessous pour vous connecter et bénéficier de nos services</p>
                <div class="action">
                    <a href="/${window.env.LANG}/user/login" class="${window.env.APP_CSS_CLASS} atom button filled primary">
                        <div class="inner">Se connecter</div>
                    </a>
                </div>
            `;
        });
    }
}

let email_confirmation = new EmailConfirmation();
email_confirmation.run();