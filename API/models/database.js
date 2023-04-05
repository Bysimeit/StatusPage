require('dotenv').config()
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
});

module.exports = pool;