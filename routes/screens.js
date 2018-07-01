var express = require('express');
var router = express.Router();

var con = require('../db_helper');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/view/:screenID', function(req, res, next) {

    con.query("SELECT * FROM tb_sites WHERE site_ScreenId LIKE '" + req.params.screenID + "'", function (errsite, siteresult) {
        con.query("SELECT * FROM tb_screens WHERE screen_id LIKE '" + req.params.screenID + "'", function (errscreen, screenresult) {
            
            res.render('screen.pug', { screenID: req.params.screenID,  sites: siteresult, screeninfo: screenresult});
        }); 
    }); 
  
});

router.get('/create/:displayID', function(req, res, next) {

    res.render('screen-create', {displayID: req.params.displayID});
  
  });
  
  router.post('/create', function(req, res, next) {
  
      require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_screens` (`screen_id`, `screen_name`, `screen_description`, `screen_layout`, `screen_playerID`, `screen_status`) VALUES ('" + token + "', '" + req.body.name + "', '" + req.body.description + "', '" + req.body.layoutID + "', '" + req.body.id + "', 'PENDING');", function (err, result) {
            res.redirect("/screen/view/"+token);
        }); 
      });
    
  });
  
  router.post('/update', function(req, res, next) {
  
    con.query("UPDATE `db_displaymanager`.`tb_screens` SET `screen_name`='" + req.body.name + "', `screen_description`='" + req.body.description +"', `screen_layout`='" + req.body.layoutID + "' WHERE `screen_id`='" + req.body.id + "';", function (err, result) {
        
        res.redirect("/screen/view/"+req.body.id);
    }); 
  
  });

  module.exports = router;