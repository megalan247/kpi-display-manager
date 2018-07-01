var con = require('../db_helper');

exports.getScreens = function(req, res) {
    con.query("SELECT * FROM tb_screens WHERE screen_playerId LIKE \"" + req.params.playerId + "\"", function (err, result) {
        res.send(result);
    });    
}