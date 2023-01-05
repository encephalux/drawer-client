const env = require("ova_env");

env.servers = {
    dev: "http://localhost:3001",
    prod: "https://api.dpmltogo-sip.org"
};
env.app_domain_name = "dpmltogo-sip.org";
env.microservices = require("./microservices");

process.env.APP_URL_BASE = env.microservices.dashboard.url_base;
process.env.API_URL_BASE = env.microservices.api.url_base;
process.env.APP_NAME = "dpml_dashboard";
process.env.APP_PORT = (process.env.RUN_MODE === "production") ? "4000":"3000";
process.env.APP_CSS_CLASS = "dpml";
process.env.SITE_TITLE = "DPML - TOGO";
process.env.SGBD = "pg";
process.env.ADMIN_ENDPOINT_ROOT = process.env.RUN_MODE === "development" ? "admin":"dpml\\$sip_2022";

env.jwt = {
    issuer: env.app_domain_name,
    secrets: {
        administrators: {
            session: "bac51fde-f20e-46b4-aa35-6e7414a7f9ae"
        },
        users: {
            session: "71f23e29-6049-41a1-8243-2393fb7ef52f",
            email_confirmation: "a87d7126-f865-11ec-af3a-f7650e6192ab",
            reset_password: "4d845bea-f88d-11ec-8b79-d3d9e6a3c98c"
        }
    },
    life: {
        administrators: {
            session: 3600 // in seconds
        },
        users: {
            session: 3600, // in seconds
            email_verification: 300,
            reset_password: 300
        }
    }
};

env.session = {
    id_secret: {
        session: "bac51fde-f20e-46b4-aa35-6e7414a7f9ae",
        users:  "71f23e29-6049-41a1-8243-2393fb7ef52f"
    },
    life: {
        administrators: {hour: 1},
        users: {hour: 1}
    }
};

// { Ova orm config }

const orm_config = require("ova_orm_config");
orm_config.sgbd = "pg";
orm_config.db = require("./core/db");