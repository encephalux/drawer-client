const _mgr_admin = require("../../managers/administrators");
const _mgr_users = require("../../managers/users");
const { middleware: _mdw_session } = require("ova_session");

const admin_fallback = _src_point => (_req, _res, _next, _err) => {
    if(process.env.RUN_MODE === "development") console.log(_err);
    _res.redirect(302, `/${_req.lang}/${process.env.ADMIN_ENDPOINT_ROOT}/login`);
};

const user_fallback = _src_point => (_req, _res, _next, _err) => {
    if(process.env.RUN_MODE === "development") console.log(_err);
    _res.redirect(302, `/${_req.lang}/user/login`);
};

module.exports.admin_session = _mdw_session(
    _mgr_admin.session_tkn_prsr,
    _mgr_admin.session_expired,
    admin_fallback("_ldr_sessions, admin_session")
);

module.exports.user_session = _mdw_session(
    _mgr_users.session_tkn_prsr,
    _mgr_users.session_expired,
    user_fallback("_ldr_sessions, user_session")
);