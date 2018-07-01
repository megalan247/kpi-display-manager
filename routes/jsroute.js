var express = require('express');
var router = express.Router();

var con = require('../db_helper');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.get('/view/:jsID', function(req, res, next) {

    con.query("SELECT * FROM tb_js WHERE js_id LIKE '" + req.params.jsID + "'", function (errsite, jsresult) {
        res.render('js', { jsID: req.params.jsID,  jsresult: jsresult});
    }); 
  
});

router.get('/create/:siteID', function(req, res, next) {

    res.render('js-create', {siteID: req.params.siteID});
  
  });
  
router.post('/create', function(req, res, next) {
  
      require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_js` (`js_id`, `js_siteId`, `js_command`) VALUES ('" + token + "', '" + req.body.id + "', '" + req.body.command + "');", function (err, result) {
            res.redirect("/js/view/"+token);
        }); 
      });
    
});
  
router.post('/update', function(req, res, next) {
    con.query("UPDATE `db_displaymanager`.`tb_js` SET `js_command`='" + req.body.command + "' WHERE `js_id`='" + req.body.id + "';", function (err, result) {
        res.redirect("/site/view/"+req.body.siteId);
    }); 
  
});

  module.exports = router;