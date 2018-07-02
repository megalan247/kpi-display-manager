var con = require('../db_helper');
var SqlString = require('sqlstring');

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
    con.query("SELECT * FROM tb_players WHERE player_id LIKE '" + SqlString.escape(req.params.playerId) + "'", function (err, result) {
        res.send(result);
    });
}

exports.registerPlayer = function(req, res) {
    require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_players` (`player_id`, `player_name`, `player_description`, `player_location`, `player_status`) VALUES ('" + token + "', " + SqlString.escape(req.body.name) + ", 'This is a placeholder description, edit your description in settings!', " + SqlString.escape(req.ip) + ", 'PENDING');", function (err, result) {
          res.send({
              result: "success",
              id: token});
        }); 
      });
}