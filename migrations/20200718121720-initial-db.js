'use strict';
var async = require('async');
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  async.series([
    db.createTable.bind(db, 'tb_building', {
      building_id: { type: 'string', primaryKey: true },
      building_name: 'string',
      building_address: 'string',
      building_orgId: 'string'
    }),
    db.createTable.bind(db, 'tb_cookies', {
      cookie_id: { type: 'string', primaryKey: true },
      cookie_siteId: 'string',
      cookie_name: 'string',
      cookie_value: 'int',
      cookie_url: 'string',
      cookie_domain: 'string',
      cookie_path: 'string',
      cookie_expiration: 'string',
      cookie_isSecure: 'string',
      cookie_isHttpOnly: 'string'
    }),
    db.createTable.bind(db, 'tb_floor', {
      floor_id: { type: 'string', primaryKey: true },
      floor_name: 'string',
      floor_buildingId: 'string'
    }),
    db.createTable.bind(db, 'tb_js', {
      js_id: { type: 'string', primaryKey: true },
      js_siteId: 'string',
      js_command: 'string'
    }),
    db.createTable.bind(db, 'tb_new_devices', {
      new_device_id: { type: 'string', primaryKey: true },
      new_device_ip: 'string',
      new_device_model: 'string',
      new_device_serial: 'string',
      new_device_timestamp: 'string'
    }),
    db.createTable.bind(db, 'tb_org', {
      org_id: { type: 'string', primaryKey: true },
      org_name: 'string',
      org_image: 'string',
      org_address: 'string'
    }),
    db.createTable.bind(db, 'tb_players', {
      player_id: { type: 'string', primaryKey: true },
      player_name: 'string',
      player_description: 'string',
      player_lastPing: 'string',
      player_type: 'string',
      player_location: 'string',
      player_serialnumber: 'string',
      player_roomId: 'string',
      player_OS: 'string',
      player_OSVersion: 'string',
      player_freeSpace: 'string',
      player_CPU: 'string',
      player_IP: 'string',
      player_MAC: 'string'
    }),
    db.createTable.bind(db, 'tb_room', {
      room_id: { type: 'string', primaryKey: true },
      room_name: 'string',
      room_floorId: 'string'
    }),
    db.createTable.bind(db, 'tb_screens', {
      screen_id: { type: 'string', primaryKey: true },
      screen_name: 'string',
      screen_description: 'string',
      screen_lastping: 'string',
      screen_layout: 'string',
      screen_playerId: 'string',
      screen_electronScreenId: 'string'
    }),
    db.createTable.bind(db, 'tb_sites', {
      site_id: { type: 'string', primaryKey: true },
      site_url: 'string',
      site_description: 'string',
      site_position: 'string',
      site_screenId: 'string'
    }),
  ], callback);
};

exports.down = function(db,callback) {
  async.series([
    db.dropTable.bind(db, 'tb_building'),
    db.dropTable.bind(db, 'tb_cookies'),
    db.dropTable.bind(db, 'tb_floor'),
    db.dropTable.bind(db, 'tb_js'),
    db.dropTable.bind(db, 'tb_new_devices'),
    db.dropTable.bind(db, 'tb_org'),
    db.dropTable.bind(db, 'tb_players'),
    db.dropTable.bind(db, 'tb_room'),
    db.dropTable.bind(db, 'tb_screens'),
    db.dropTable.bind(db, 'tb_sites')
  ], callback);
};

exports._meta = {
  "version": 1
};
