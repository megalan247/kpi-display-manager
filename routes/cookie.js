var express = require('express');
var router = express.Router();
var SqlString = require('sqlstring');
var con = require('../db_helper');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/view/:cookieID', function(req, res, next) {

    con.query("SELECT * FROM tb_cookies WHERE cookie_id LIKE " + SqlString.escape(req.params.cookieID), function (errsite, cookieresult) {
        res.render('cookie', { cookieID: req.params.cookieID,  cookie: cookieresult});
    }); 
  
});

router.get('/create/:siteID', function(req, res, next) {

    res.render('cookie-create', {siteID: req.params.siteID});
  
  });
  
  router.post('/create', function(req, res, next) {
  
      require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_cookies` (`cookie_id`, `cookie_siteId`, `cookie_name`, `cookie_value`, `cookie_url`, `cookie_domain`, `cookie_path`, `cookie_expiration`) VALUES ('" + token + "', " + SqlString.escape(req.body.id) + ", " + SqlString.escape(req.body.name) + ", " + SqlString.escape(req.body.value) + ", " + SqlString.escape(req.body.url) + ", " + SqlString.escape(req.body.domain) + ", " + SqlString.escape(req.body.path) + ", " + SqlString.escape(req.body.expiration) + ");", function (err, result) {
            res.redirect("/site/view/" + req.body.id);
        }); 
      });
    
  });
  
  router.post('/update', function(req, res, next) {
  
    con.query("UPDATE `db_displaymanager`.`tb_cookies` SET `cookie_name`=" + SqlString.escape(req.body.name) + ", `cookie_value`=" + SqlString.escape(req.body.value) +", `cookie_url`=" + SqlString.escape(req.body.url) + ", `cookie_domain`=" + SqlString.escape(req.body.domain) + " WHERE `cookie_id`=" + SqlString.escape(req.body.id) + ";", function (err, result) {
        
        res.redirect("/cookie/view/"+req.body.id);
    }); 
  
  });

  module.exports = router;