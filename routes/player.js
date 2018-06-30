var express = require('express');
var router = express.Router();

var con = require('../db_helper');

router.get('/:did', function(req, res, next) {

    con.query("SELECT S.screen_id, S.screen_name, S.screen_layout, S.screen_status FROM tb_players P INNER JOIN tb_screens S ON P.player_id = S.screen_playerId WHERE player_id LIKE \"" + req.params.did + "\"", function (err, result) {
      res.render('player', { did: req.params.did,  screens: result});
    }); 
  
});

router.post('/:did/create', function(req, res, next) {

    con.query("SELECT * FROM tb_sites WHERE site_ScreenId LIKE \"" + req.body.siteId + "\"", function (err, result) {
        res.render('screen', { siteId: req.params.siteId,  sites: result});
    }); 
  
});

router.post('/:did/update', function(req, res, next) {

  con.query("SELECT * FROM tb_sites WHERE site_ScreenId LIKE \"" + req.params.siteId + "\"", function (err, result) {
      res.render('screen', { siteId: req.params.siteId,  sites: result});
  }); 

});

module.exports = router;