const pg = require("pg");

const pool = new pg.Pool({
    ... process.env.RUN_MODE === "development" ? {
        host: "localhost",
        port: 5432,
        user: "pguser",
        password: "pg",
        database: "dpml_api"
    }:require("./db_credentials"),
    connectionLimit: 10
});
module.exports = pool;