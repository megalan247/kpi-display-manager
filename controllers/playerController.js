var con = require('../db_helper');

exports.listPlayers = function(req, res) {
    con.query("SELECT player_id, player_name FROM tb_players", function (err, result) {
        res.send(result);
    });    
}

exports.createPlayer = function(req, res) {
    con.query("SELECT * FROM tb_players", function (err, result) {
        res.send(result);
    });    
}

exports.editPlayer = function(req, res) {
    con.query("SELECT * FROM tb_players", function (err, result) {
        res.send(result);
    });    
}

exports.getPlayer = function(req, res) {
    con.query("SELECT * FROM tb_players WHERE player_id LIKE \"" + req.params.playerId + "\"", function (err, result) {
        res.send(result);
    });    
}