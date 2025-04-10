const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER ||  "tyhow99"  ,
    password: ""  || "Foxes2002$",
    host: "localhost",
    port: 5432,
    database: "event_management"
});

module.exports = pool;