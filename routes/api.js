var express = require('express');
var router = express.Router();

var player_controller = require('../controllers/playerController.js')
var screen_controller = require('../controllers/screenController')
var site_controller = require('../controllers/siteController')
var cookie_controller = require('../controllers/cookieController')
var js_controller = require('../controllers/jsController')

router.get("/", function(req, res) {
    res.status(200).send("NOT IMPLIMENTED");
});

router.get("/listPlayers", player_controller.listPlayers);

router.get("/getPlayer/:playerId", player_controller.getPlayer);

router.get("/getScreens/:playerId", screen_controller.getScreens);

router.get("/getSites/:screenId", site_controller.getSites);

router.get("/getCookies/:urlId", cookie_controller.getCookies);

router.get("/getJavascript/:urlId", function(req, res) {
    var num = req.params.urlId;
    res.status(200).send("Listing js for URL Id " + num);
});
  
module.exports = router;