const pug = require("ova_pugstack");

module.exports = (_req, _res) => {
    _res.status(200);
    _res.end(pug("pug/dashboard.pug", {
        lang: _req.lang,
        title: "Tableau de dessin"
    }));
};