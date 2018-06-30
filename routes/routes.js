var express = require('express');
var router = express.Router();

var appRouter = function (app) {

    var player_controller = require('../controllers/playerController.js')
    var screen_controller = require('../controllers/screenController')
    var site_controller = require('../controllers/siteController')
    var cookie_controller = require('../controllers/cookieController')
    var js_controller = require('../controllers/jsController')

    app.get("/api/v1", function(req, res) {
      res.status(200).send("NOT IMPLIMENTED");
    });

    app.get("/api/v1/listPlayers", player_controller.listPlayers);

    app.get("/api/v1/getPlayer/:playerId", player_controller.getPlayer);

    app.get("/api/v1/getScreens/:playerId", screen_controller.getScreens);

    app.get("/api/v1/getSites/:screenId", site_controller.getSites);

    app.get("/api/v1/getCookies/:urlId", function(req, res) {
        var num = req.params.urlId;
        res.status(200).send("Listing cookies for URL Id " + num);
    });

    app.get("/api/v1/getJavascript/:urlId", function(req, res) {
        var num = req.params.urlId;
        res.status(200).send("Listing js for URL Id " + num);
    });
}
  
module.exports = appRouter;