const Pool = require("pg").Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "mtech"
});

module.exports = pool;