var con = require('../db_helper');

exports.getScreens = function(req, res) {
    con.query("SELECT S.screen_id, S.screen_name, S.screen_layout, S.screen_status FROM tb_players P INNER JOIN tb_screens S ON P.player_id = S.screen_playerId WHERE player_id LIKE \"" + req.params.playerId + "\"", function (err, result) {
        res.send(result);
    });    
}