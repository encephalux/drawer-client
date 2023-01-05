const pug = require("ova_pugstack");

module.exports = (_req, _res) => {
    _res.status(200);
    _res.end(pug("pug/login.pug", {
        lang: _req.lang,
        title: "Connexion"
    }));
};