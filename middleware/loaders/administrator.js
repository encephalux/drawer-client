module.exports = (_req, _res, _next) => {
    _req.admin = _req.session._data;
    _next();
};