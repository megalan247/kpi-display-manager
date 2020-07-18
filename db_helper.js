var client = module.exports = require('mysql').createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "db_displaymanager"
});
client.connect();