var con = require('../db_helper');

exports.getJS = function(req, res) {
    con.query("SELECT * FROM tb_js WHERE js_siteId LIKE \"" + req.params.siteId + "\"", function (err, result) {
        res.json(result);
    });    
}