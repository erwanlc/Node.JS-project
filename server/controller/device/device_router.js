'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.get('/create', passport.ensureAuthenticated, function(req, res) {
        res.render('client/device/create', {
            title: 'Add Device',
            user: (req.user) ? {email: req.user.email} : null,
            page: {
                addDevice: true
            }
        });
    });

    router.get('/all', function(req, res) {
        db.getAllDevices(function(err, devices) {
            res.render('client/device/devices', {
                title: 'Devices',
                devices: devices,
                user: (req.user) ? {email: req.user.email} : null
            });
        });
    });

    router.get('/view/:id', passport.ensureAuthenticated, function(req, res) {
        db.getDevice(req.params.id, function(err, device) {
            res.render('client/device/device', {
                title: device.deviceName,
                device: device,
                user: (req.user) ? {email: req.user.email} : null,
                page: {
                    devicePage: true
                }
            });
        });
    });

    router.get('/:deviceUID/remove', passport.ensureAuthenticated, function(req, res) {
        db.getDevice(req.params.deviceUID, function(err, device) {
            res.render('client/device/removeDevice', {
                title: 'Remove Device',
                device: device,
                user: (req.user) ? {email: req.user.email} : null,
                page: {
                    removeDevice: true
                }
            });
        });
    });

    return router;
};
