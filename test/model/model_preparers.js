'use strict';

var db = require('../../server/model/db_interface.js');
var dbSchema = require('../../server/model/db_schemas.js');

var mp = {
  preparers: {
    chainPreparers: function(nextArray) {
      var next = nextArray.splice(0, 1)[0];
      next(nextArray);
    },
    rUserDB: function(nextArray) {
      var userDB = dbSchema.user();
      userDB.remove({}, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    rGroupDB: function(nextArray) {
      var groupDB = dbSchema.group();
      groupDB.remove({}, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    rDeviceDB: function(nextArray) {
      var deviceDB = dbSchema.device();
      deviceDB.remove({}, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    aUser: function(nextArray) {
      db.addUser(mp.user.email, mp.user.password, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    aDevice: function(nextArray) {
      db.addDevice(mp.device.deviceUID, mp.device.deviceName, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    aDevice1: function(nextArray) {
      db.addDevice(mp.device1.deviceUID, mp.device1.deviceName, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    aDevice2: function(nextArray) {
      db.addDevice(mp.device2.deviceUID, mp.device2.deviceName, function() {
        var next = nextArray.splice(0, 1)[0];
        next(nextArray);
      });
    },
    aGroup1: function(nextArray) {
      db.getUser(mp.user.email, function(err, doc) {
        db.createGroup(mp.group1.groupName, doc._id, function() {
          var next = nextArray.splice(0, 1)[0];
          next(nextArray);
        });
      });
    },
    aGroup2: function(nextArray) {
      db.getUser(mp.user.email, function(err, doc) {
        db.createGroup(mp.group2.groupName, doc._id, function() {
          var next = nextArray.splice(0, 1)[0];
          next(nextArray);
        });
      });
    },
  }
};

require('../config/preparers')(mp);

module.exports = mp;
