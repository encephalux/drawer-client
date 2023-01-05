const express = require("express");
const path = require("path");
const env = require("ova_env");
require("./errors");

const app = express();

// { Cookie parser }
app.use(require("cookie-parser")());

// { Favicon }
app.use("/favicon.ico", express.static(path.join(".", "assets", "media", "favicon.ico")));

// { Assets }
app.use("/assets", express.static("."+path.sep+"assets"));

// { Translatable endpoints }
for(let lang of ["", ... env.supported_languages]) {
    let lang_path = (lang ? "/":"")+lang;

    // { Language middleware }
    app.use(lang_path, (_req, _res, _next) => {
        _req.lang = lang ? lang:process.env.DEFAULT_LANGUAGE;

        let url = new URL(_req.originalUrl, "http://"+_req.headers.host);
        _req.realOriginalUrl = lang ? url.pathname.substr(3):url.pathname;
        _next();
    });

    app.use(lang_path+"/email-confirmation/:token", require("./controllers/email_confirmation"));

    app.use(lang_path+"/register", require("./controllers/sign_up"));

    app.use(lang_path+"/login", require("./controllers/login"));

    // { User dashboard  }
    app.use(lang_path+"/dashboard", require("./controllers/dashboard"));
}

app.use("/", (_req, _res) => _res.redirect(302, "/fr/login"));

module.exports = app;