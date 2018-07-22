var express = require('express');
var router = express.Router();

var con = require('../db_helper');


router.get('/', function(req, res, next) {
  res.redirect("/players");
});

router.get("/players", function(req, res, next) {
  con.query("SELECT * FROM tb_org", function (err, orgresult) {
    con.query("SELECT * FROM tb_building", function (err, buildingresult) {
      con.query("SELECT * FROM tb_floor", function (err, floorresult) {
        con.query("SELECT * FROM tb_room", function (err, roomresult) {
          con.query("SELECT * FROM tb_players", function (err, playerresult) {
            con.query("SELECT * FROM tb_screens", function (err, screenresult) {
              res.render('players', {
                orgs: orgresult,
                buildings: buildingresult, 
                floors: floorresult,
                rooms: roomresult, 
                players: playerresult,
                screens: screenresult
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;
