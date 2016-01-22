'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.post('/add-device', passport.ensureAuthenticated, passport.isOwner, function(req, res) {
        db.addDeviceToGroup(req.body.deviceID, req.body.groupID, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    router.post('/remove-device', passport.ensureAuthenticated, passport.isOwner, function(req, res) {
        db.removeDeviceFromGroup(req.body.deviceID, req.body.groupID, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    router.post('/create', function(req, res) {
        if (req.isAuthenticated()) {
            db.createGroup(req.body.groupName, req.user._id, function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({msg: 'ok'});
                }
            });
        } else {
            res.send({msg: 'not connected'});
        }
    });

    router.post('/change-info', passport.ensureAuthenticated, function(req, res) {
        db.renameGroup(req.body.groupName, req.body.groupNameModify, function(err) {
            res.send({msg: err || 'ok'});
        });
    });

    router.post('/deleteGroup', passport.ensureAuthenticated, function(req, res) {
        db.deleteGroup(req.body.groupID, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    router.post('/activate', passport.ensureAuthenticated, function(req, res) {
        db.activateGroup(req.body.groupID, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    router.post('/desactivate', passport.ensureAuthenticated, function(req, res) {
        db.desactivateGroup(req.body.groupID, function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({msg: 'ok'});
            }
        });
    });

    return router;
};
