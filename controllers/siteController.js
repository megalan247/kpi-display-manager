var con = require('../db_helper');
var SqlString = require('sqlstring');

exports.getSites = function(req, res) {
    con.query("SELECT * FROM tb_sites WHERE site_screenId LIKE " + SqlString.escape(req.params.screenId) + " ORDER BY site_position ASC", function (err, result) {
        res.json(result);
    });   
}