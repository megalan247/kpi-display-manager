var express = require('express');
var router = express.Router();

var con = require('../db_helper');

router.get('/:siteId', function(req, res, next) {

    con.query("SELECT * FROM tb_sites WHERE site_ScreenId LIKE \"" + req.params.siteId + "\"", function (err, result) {
        res.render('screen', { siteId: req.params.siteId,  sites: result});
    }); 
  
});

  module.exports = router;