var express = require('express');
var router = express.Router();
const request = require('request');
var SqlString = require('sqlstring');
var con = require('../db_helper');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/view/:did', function(req, res, next) {

    con.query("SELECT * FROM tb_screens  WHERE screen_playerId LIKE " + SqlString.escape(req.params.did), function (err, screenresult) {
      con.query("SELECT * FROM tb_players  WHERE player_id LIKE " + SqlString.escape(req.params.did), function (err, playerresult) {
        res.render('player.pug', { did: req.params.did,  screens: screenresult, playerinfo: playerresult});
      }); 
    }); 
  
});


router.get("/", function(req, res, next) {
/*   con.query("SELECT * FROM tb_org", function (err, orgresult) {
    con.query("SELECT * FROM tb_building", function (err, buildingresult) {
      con.query("SELECT * FROM tb_floor", function (err, floorresult) {
        con.query("SELECT * FROM tb_room", function (err, roomresult) { */
          con.query("SELECT * FROM tb_players", function (err, playerresult) {
            /* con.query("SELECT * FROM tb_screens", function (err, screenresult) { */
              res.render('index.pug', {
                players: playerresult
              });
             });
/*          });
        });
      });
    });
  }); */
});

/* router.get('/create', function(req, res, next) {

  res.render('player-create');

});

router.post('/create', function(req, res, next) {

    require('crypto').randomBytes(3, function(err, buffer) {
      var token = buffer.toString('hex');
      con.query("INSERT INTO `db_displaymanager`.`tb_players` (`player_id`, `player_name`, `player_description`, `player_location`, `player_status`) VALUES (\"" + token + "\", \"" + req.body.name + "\", \"" + req.body.description + "\", \"" + req.body.location + "\", \"PENDING\");", function (err, result) {
        res.redirect("/player/view/"+token);
      }); 
    });
  
}); */

router.post('/update', function(req, res, next) {

  con.query("UPDATE `db_displaymanager`.`tb_players` SET `player_name`=" + SqlString.escape(req.body.name) + ", `player_description`=" + SqlString.escape(req.body.description) +", `player_location`=" + SqlString.escape(req.body.location) + " WHERE `player_id`=" + SqlString.escape(req.body.id) + ";", function (err, result) {
    if (err) {res.render('error', {error: err})} else {
      res.redirect("/player/view/"+req.body.id);
    }
    
  }); 

});

module.exports = router;