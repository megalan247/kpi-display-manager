var client = module.exports = require('mysql').createConnection({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: "root",
    database: "db_displaymanager"
});
client.connect();