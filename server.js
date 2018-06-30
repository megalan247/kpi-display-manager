const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const mysql = require("mysql");
const routes = require("./routes/routes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//add routes to express app
routes(app);

//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Kushy API server started on: ' + port);

