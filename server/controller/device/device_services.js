'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

  router.post('/remove', passport.ensureAuthenticated, function(req, res) {
    db.removeDevice(req.body.deviceUID, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  router.post('/create', passport.ensureAuthenticated, function(req, res) {
    db.addDevice(req.body.deviceUID, req.body.deviceName, function(err) {
      if (err) {
        if (err.code === 11000) {
          res.send({msg: 'deviceUID exist'});
        } else if (err.toString().indexOf('deviceUID') >= 0) {
          res.send({msg: 'deviceUID needed'});
        } else if (err.toString().indexOf('deviceName') >= 0) {
          res.send({msg: 'deviceName needed'});
        } else{
          res.send(err);
        }
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  router.post('/activate', passport.ensureAuthenticated, function(req, res) {
    db.activateDevice(req.body.deviceID, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  router.post('/desactivate', passport.ensureAuthenticated, function(req, res) {
    db.desactivateDevice(req.body.deviceID, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  router.post('/rename', passport.ensureAuthenticated, function(req, res) {
    db.renameDevice(req.body.deviceUID,req.body.newDeviceName, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  return router;
};