var con = require('../db_helper');

exports.getSites = function(req, res) {
    con.query("SELECT * FROM tb_sites WHERE site_ScreenId LIKE \"" + req.params.screenId + "\"", function (err, result) {
        res.send(result);
    });   
}