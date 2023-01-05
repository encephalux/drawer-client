const pug = require("ova_pugstack");

module.exports = (_req, _res) => {
    _res.status(404);
    _res.end(pug("pug/404.pug", {
        lang: _req.lang,
        title: "Page non trouvée",
        description: "",
        contacts: {}
    }));
};