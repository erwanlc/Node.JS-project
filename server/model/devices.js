'use strict';

var db = require('./db_schemas.js');
var DeviceDB = db.device();

var devices = {
  addDevice: function(deviceUID, deviceName, done) {
    var device = new DeviceDB({
      deviceUID: deviceUID,
      deviceName: deviceName
    });

    device.save(function(err, doc) {
        done(err, doc);
    });
  },
  removeDevice: function(deviceUID, done) {
    DeviceDB.findOneAndRemove(deviceUID, function(errR) {
        done(errR);
      });
  },
  getDevice: function(deviceUID, done) {
    DeviceDB.findOne({deviceUID: deviceUID}, function(err, doc){
        done(err, doc);
    });
  },
  getAllDevices: function(done) {
      DeviceDB.find({}).populate('devices').exec(function(err, docs){
          done(err, docs);
      });
  },
  activateDevice: function(deviceID, done) {
    DeviceDB.findOneAndUpdate({_id: deviceID}, {active: true}, function(err) {
      done(err);
    });
  },
  desactivateDevice: function(deviceID, done) {
    DeviceDB.findOneAndUpdate({_id: deviceID}, {active: false}, function (err) {
      done(err);
    });
  },
  renameDevice: function(deviceUID, newDeviceName, done) {
    DeviceDB.findOneAndUpdate({deviceUID: deviceUID}, {deviceName: newDeviceName}, function (err) {
      done(err);
    });
  }
};

module.exports = devices;
