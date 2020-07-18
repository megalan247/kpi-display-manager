var con = require('../db_helper');

exports.getCookies = function(req, res) {
    con.query("SELECT * FROM tb_cookies WHERE cookie_siteId LIKE \"" + req.params.siteId + "\"", function (err, result) {
        res.json(result);
    });    
}