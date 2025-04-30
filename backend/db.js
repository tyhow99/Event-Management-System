const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres"  ,
    password: "Iwekeb48",
    host: "localhost",
    port: 5432,
    database: "event_management"
});

module.exports = pool;