const Pool = require("pg").Pool;

const pool = new Pool({
    user: "tyhow99",
    password: "Foxes2002$", //please dont steal my stuff guys
    host: "localhost",
    port: 5432,
    database: "event_management"
});

modules.export = pool;