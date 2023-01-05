const env = require("ova_env");

module.exports = _app => {
    // { Requests sniffer }
    _app.use(require("./sniffer"));

    // { Cors managing }
    /*_app.use((_req, _res, _next) => {
        const allowed_methods = ["POST", "GET", "OPTIONS"];
        const allowed_origins = Object.values(env.microservices).map(_element => _element.url_base);

        let origin = _req.header("origin");
        if(process.env.RUN_MODE === "production")
            if(!allowed_origins.includes(origin))
                origin = process.env.APP_URL_BASE;

        _res.header("Access-Control-Allow-Origin", origin);
        _res.header("Access-Control-Allow-Headers", "Content-Type, Referer");
        _res.header("Access-Control-Allow-Methods", allowed_methods.join(", "));
        _res.header("Access-Control-Allow-Credentials", "true");
        _res.header("Access-Control-Expose-Headers", "X-SESSION-TOKEN, X-APP-AUTH");
        //_res.header("Access-Control-Max-Age", "3600");

        if(_req.method.toUpperCase() === "OPTIONS") _res.end();
        else if(!allowed_methods.includes(_req.method.toUpperCase())) _res.status(403).end();
        else _next();
    });*/
};