const jwt = require("jsonwebtoken");
const env = require("ova_env");

module.exports = (_req, _secret, _decode=!1) => new Promise((_reso, _rej) => {
    if(!_req.params.token) return _reso({_token: null});

    jwt.verify(_req.params.token, _secret, {
        issuer: env.jwt.issuer,
        algorithms: ["HS512"]
    }, (_err, _payload) => {
        if(_err) {
            if(_err.name === "TokenExpiredError") {
                if(!_decode) return _reso({_token: null});

                const payload = jwt.decode(_req.params.token, {
                    issuer: env.jwt.issuer,
                    algorithms: ["HS512"]
                });

                return _reso({_token: null, _payload: payload});
            } else return _reso({_token: null});
        }

        _reso({_token: _req.params.token, _payload});
    });
});