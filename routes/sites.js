var express = require('express');
var router = express.Router();

var con = require('../db_helper');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/view/:siteId', function(req, res, next) {
    con.query("SELECT * FROM tb_cookies WHERE cookie_siteId LIKE '" + req.params.siteId + "'", function (err, cookie_result) {
        con.query("SELECT * FROM tb_js WHERE js_siteId LIKE '" + req.params.siteId + "'", function (err, js_result) {
            con.query("SELECT * FROM tb_sites WHERE site_id LIKE '" + req.params.siteId + "'", function (err, site_result) {
                res.render('site', { siteId: req.params.siteId,  js: js_result, cookies: cookie_result, siteinfo: site_result});
            });
        });
    });


});

router.get('/create/:screenID', function(req, res, next) {

    res.render('site-create', {screenID: req.params.screenID});
  
});
  
  router.post('/create', function(req, res, next) {
  
      require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_sites` (`site_id`, `site_url`, `site_description`, `site_position`, `site_screenId`) VALUES ('" + token + "', '" + req.body.url + "', '" + req.body.description + "', '" + req.body.position + "', '" + req.body.id + "');", function (err, result) {
            res.redirect("/site/view/"+token);
        }); 
      });
    
  });
  
  router.post('/update', function(req, res, next) {
  
    con.query("UPDATE `db_displaymanager`.`tb_sites` SET `site_url`='" + req.body.url + "', `site_description`='" + req.body.description +"', `site_position`='" + req.body.position + "' WHERE `site_id`='" + req.body.id + "';", function (err, result) {
        
        res.redirect("/site/view/"+req.body.id);
    }); 
  
  });

  module.exports = router;