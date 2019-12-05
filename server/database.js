const { Client } = require('pg');

require('dotenv/config');

const client = new Client({
    user: process.env.EVENTEIROS_USER,
    password: process.env.EVENTEIROS_PASS,
    host: process.env.EVENTEIROS_HOST,
    database: process.env.EVENTEIROS_NAME,
    port: process.env.EVENTEIROS_PORT,
});

client.connect();

client.query("select * from eventeiros.item", (err, res) => {
    console.log(res.rows);
});