var express = require('express');
var router = express.Router();

var con = require('../db_helper');


router.get('/', function(req, res, next) {
  res.redirect("/players");
});

router.get('/players', function(req, res, next) {

  con.query("SELECT * FROM tb_players", function (err, result) {
    res.render('players', { title: 'Test',  players: result});
  }); 

});

module.exports = router;
