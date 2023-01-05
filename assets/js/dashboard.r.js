/** [Ova Assistant]
 * Date: 2022-07-01 15:05:31
 * Author: ova
 * Description: 
 */

/** @includes
 * dpml
 * ova/managers/form/FormManager
 * ova/managers/form/rules/NameRule
 * ova/managers/form/rules/LengthRule
 * ova/managers/form/rules/PasswordRule
 * ova/molecules/Toolbar
 * ova/molecules/ToolbarItem
 * atoms/Button
 * atoms/PushButton
 * atoms/form/fields/ShortText
 * atoms/form/fields/DateField
 * molecules/Notification
 * molecules/ScalableMenu
 * molecules/Popup
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

        this.menu = new ScalableMenu([
            {
                class: "share",
                label: "Partager l'image",
                event: "share"
            },
            {
                class: "images",
                label: "Mes images",
                event: "images"
            },
            {
                class: "edit-profile",
                label: "Editer le profile",
                event: "profile"
            },
            {
                class: "logout",
                label: "Déconnexion",
                event: "logout"
            }
        ]);

        this.toolbar_bld();
        this.profile_popup_bld();

        this.board = new DrawingBoard.Board('draw-zone');

        this.menu.events.add_listener("profile", () => this.profile.show());
        this.menu.events.add_listener("logout", () => this.logout());

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

    logout() {

    }

    load_user() {

        return project.managers.users.get().then(_user => {
            storage.user = _user;
            this.initialized = !0;
            project.events.trigger("user_loaded", env.user);
        }).finally(() => this.loading_frame.hide());
    }

    profile_popup_bld() {
        this.profile = new class extends Popup {
            constructor() {
                super("edit-profile");
            }

            send() {
                if(this.form_mgr.is_valid()) {
                    this.form_mgr.disable();

                    project.managers.users.update(this.form_mgr.values()).then(_data => {
                        (new Notification("Profile mis à jour")).notify();
                    }).catch(_err => {
                        (new Notification("Une erreur est survenue lors de la demande.")).notify();
                    }).finally(() => this.submitter.release());
                } else this.submitter.release();
            }

            base_bld() {
                super.base_bld();
                this.inner.innerHTML = `
                    <div class="form">
                        <form></form>
                    </div>
                `;

                // { Submitter }
                this.submitter = new PushButton("Envoyer");
                this.inner.querySelector(".form").appendChild(this.submitter.html());
            }

            build() {
                super.build();
                this.form_mgr = new FormManager(this.container.querySelector("form"));
                this.mount();

                this.submitter.add_event_listener("click", _ev => {
                    this.send();
                });
                this.submitter.events.add_listener("released", () => {
                    this.form_mgr.enable();
                });
                this.loading_state = this.submitter.loading_state;
            }

            mount() {
                // { Last name field }
                let _fld_last_name = new ShortText("_last_name");
                _fld_last_name.placeholder = "Nom";
                _fld_last_name.add_rule(new NameRule());
                _fld_last_name.add_rule(new LengthRule({min: 2, max: 160}));
                this.form_mgr.form.appendChild(_fld_last_name.html());
                this.form_mgr.add_field("_last_name", _fld_last_name);

                // { First name field }
                let _fld_first_name = new ShortText("_first_name");
                _fld_first_name.placeholder = "Prénom(s)";
                _fld_first_name.add_rule(new NameRule());
                _fld_first_name.add_rule(new LengthRule({min: 2, max: 160}));
                this.form_mgr.form.appendChild(_fld_first_name.html());
                this.form_mgr.add_field("_first_name", _fld_first_name);

                // { Date field }
                let _fld_birthday = new DateField("_birthday");
                this.form_mgr.form.appendChild(_fld_birthday.html());
                this.form_mgr.add_field("_birthday", _fld_birthday);

                // { Password field }
                let _fld_password = new ShortText("_password");
                _fld_password.placeholder = "Nouveau mot de passe";
                _fld_password.add_rule(new PasswordRule());
                this.form_mgr.form.appendChild(_fld_password.html());
                this.form_mgr.add_field("_password", _fld_password);
            }
        };
    }

    toolbar_bld() {
        this.toolbar = new Toolbar("toolbar");
        document.querySelector(".toolbar-slot").appendChild(this.toolbar.html());

        this.menu_btn = new class extends ToolbarItem {
            base_bld() {
                super.base_bld();
                this.container.classList.add("menu");
                this.inner.innerHTML = `
                    <span class="fi fi-rr-menu-dots"></span>
                `;
            }
        };
        this.menu_btn.container.appendChild(this.menu.html());
        this.toolbar.add_item("menu", this.menu_btn);
        this.menu_btn.add_event_listener("click", () => this.menu.show());
    }
}

let fo = new Dashboard();
app.instance = fo;
fo.run();