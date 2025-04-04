const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER || process.env.USERNAME,
    password: "", 
    host: "localhost",
    port: 5432,
    database: "event_management"
});

module.exports = pool;