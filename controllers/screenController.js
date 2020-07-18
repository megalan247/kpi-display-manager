var con = require('../db_helper');
var SqlString = require('sqlstring');

exports.getScreens = function(req, res) {
    con.query("SELECT * FROM tb_screens WHERE screen_playerId LIKE \"" + req.params.playerId + "\"", function (err, result) {
        res.json(result);
    });    
}

exports.getElectronScreens = function(req, res) {
    con.query("SELECT * FROM tb_screens WHERE screen_electronScreenId LIKE \"" + req.params.electronId + "\"", function (err, result) {
        res.json(result);
    });    
}

exports.registerScreen = function(req, res) {
    require('crypto').randomBytes(3, function(err, buffer) {
        var token = buffer.toString('hex');
        con.query("INSERT INTO `db_displaymanager`.`tb_screens` (`screen_id`, `screen_name`, `screen_description`, `screen_lastping`, `screen_layout`, `screen_playerId`, `screen_electronScreenId`) VALUES (" + SqlString.escape(token) + ", " + SqlString.escape(req.body.electronId) + ", 'This is the default description for this screen!', '123456789', '1', " + SqlString.escape(req.body.playerID) + ", " + SqlString.escape(req.body.electronId) + ");", function (err, result) {
            console.log(result);
            console.log(err);
            require('crypto').randomBytes(3, function(err, buffer) {
                var token2 = buffer.toString('hex');
                con.query("INSERT INTO `db_displaymanager`.`tb_sites` (`site_id`, `site_url`, `site_description`, `site_position`, `site_screenId`) VALUES (" + SqlString.escape(token2) + ", 'http://clock.srly.io', 'This is a default description for your site!', '1', '" + token + "');", function (err2, result2) {
                    console.log(result2);
                    console.log(err2);
                    res.json({
                        result: "success",
                        screen_id: token,
                        screen_layout: 1
                    });
                }); 
              });
            
            
            
        }); 
      });
}