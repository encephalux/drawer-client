const pug = require("ova_pugstack");

module.exports = (_req, _res) => {
    _res.status(200);
    _res.end(pug("pug/email_confirmation.pug", {
        lang: _req.lang,
        title: "Confirmation d'email"
    }));
};