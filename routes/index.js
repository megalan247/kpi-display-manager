var express = require('express');
var router = express.Router();

var con = require('../db_helper');

/* GET home page. */
router.get('/', function(req, res, next) {

  con.query("SELECT player_id, player_name, player_status FROM tb_players", function (err, result) {
    res.render('index', { title: 'Test',  players: result});
  }); 

});

module.exports = router;
