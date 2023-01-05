const http = require("http");
require("./env");
require("./errors");
const { ErrorLine } = require("ova_errors");
const app = require("./app");
const { log } = require("ova_core");

// { Error logger }
const errorHandler = _error => {
    if(_error.syscall === "listen") throw _error;

    if(_error.code === "EACCESS") console.log("Requires high privileges");
    else if(_error.code === "EADDRINUSE") console.log("Address already in use ("+(typeof ADDRESS === "string" ? ADDRESS:"any")+")");

    log(new ErrorLine({
        _code: "Unknown error",
        _src_point: "Unprocessed error",
        _additional: _error
    }));

    if(process.env.RUN_MODE === "development") throw _error;
};

// { Port normalizer }
const normalizePort = (_port) => {
    let parsed = parseInt(_port);

    if(isNaN(parsed)) return _port;
    else if(parsed >= 0) return parsed;

    return false;
};

// { Normalise port }
let ADDRESS = "";
const PORT = normalizePort(process.env.PORT ?? process.env.APP_PORT );

// { Set express port }
app.set("port", PORT);

// { HTTP server }
const server = http.createServer(app);
server.on("listening", () => {
    ADDRESS = server.address();
    console.log(process.env.APP_NAME+" started at ADDRESS="+ADDRESS.address+" PORT= "+PORT);
});

server.on("error", errorHandler);
server.listen(PORT);