var con = require('../db_helper');
var SqlString = require('sqlstring');

exports.listPlayers = function(req, res) {
    con.query("SELECT player_id, player_name FROM tb_players", function (err, result) {
        res.send(result);
    });    
}

exports.createPlayer = function(req, res) {
/*     con.query("SELECT * FROM tb_players", function (err, result) {
        res.send(result);
    });  */
    res.send("NOT IMPLIMENTED");
}

exports.editPlayer = function(req, res) {
/*     con.query("SELECT * FROM tb_players", function (err, result) {
        res.send(result);
    });    */ 
    res.send("NOT IMPLIMENTED");
}

exports.getPlayer = function(req, res) {
    con.query("SELECT * FROM tb_players WHERE player_id LIKE " + SqlString.escape(req.params.playerId), function (err, result) {
        res.send(result);
        console.log(err);
    });
}

exports.registerPlayer = function(req, res) {
    // name, playerType, playerLocation, serialNumber, OSName, OSVersion, freeSpace, CPUPercentage
    require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        //var sqlQuery = "INSERT INTO `db_displaymanager`.`tb_players` (`player_id`, `player_name`, `player_description`, `player_lastPing`, `player_type`, `player_location`, `player_serialnumber`, `player_OS`, `player_OSVersion`) VALUES ('" + token + "', " + SqlString.escape(req.body.name) + ", 'This is a placeholder description', '" + SqlString.escape(Date.now()) + "', " + SqlString.escape(req.body.playerType) + ", 'Unknown player location' " + SqlString.escape(req.body.serialNumber) + ", " + SqlString.escape(req.body.OSName) + ", " + SqlString.escape(req.body.OSVersion) + ");"
        var sql = "INSERT INTO `db_displaymanager`.`tb_players` (`player_id`, `player_name`, `player_description`, `player_lastPing`, `player_type`, `player_location`, `player_serialnumber`, `player_roomId`, `player_OS`, `player_OSVersion`, `player_freeSpace`, `player_CPU`, `player_IP`, `player_MAC`) VALUES ('" + token + "', " + SqlString.escape(req.body.name) + ", 'Desciption', '" + SqlString.escape(Date.now()) + "', " + SqlString.escape(req.body.playerType) + ", 'Location', " + SqlString.escape(req.body.serialNumber) + ", 'temprm', " + SqlString.escape(req.body.OSName) + ", " + SqlString.escape(req.body.OSVersion) + ", 'freeSpace', 'CPU', " + SqlString.escape(ip.split(':').pop()) +", " + SqlString.escape(req.body.macAddress) + ");"
        console.log(sql);
        con.query(sql, function (err, result) {
          console.log("ERROR: " + err);
          console.log("RESULT: " + result);
          res.send({
              result: "success",
              id: token});
        }); 
      });
}