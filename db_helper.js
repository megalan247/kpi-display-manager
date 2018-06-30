var client = module.exports = require('mysql').createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_displaymanager"
});
client.connect();