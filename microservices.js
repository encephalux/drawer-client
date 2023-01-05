module.exports = {
    dashboard: {
        url_base: process.env.RUN_MODE === "development" ? "http://localhost:3000":"https://dpmltogo-sip.org"
    },
    api: {
        url_base: process.env.RUN_MODE === "development" ? "http://localhost:3001":"https://api.dpmltogo-sip.org"
    }
};