const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.USER ||  "tyhow99" || "postgres"  ,
    password: ""  || "Foxes2002$" || "Iwekeb48",
    host: "localhost",
    port: 5432,
    database: "event_management"
});

module.exports = pool;