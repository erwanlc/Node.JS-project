'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {

    router.get('/view/:id', passport.ensureAuthenticated, function(req, res) {
        db.isOwner(req.user._id, req.params.id, function(isOwner) {
            db.getFullGroup(req.params.id, function(err, group) {
                res.render('client/group/group', {
                    title: group.groupName,
                    group: group,
                    isOwner: isOwner,
                    user: (req.user) ? {email: req.user.email} : null,
                    page: {
                        groupPage: true
                    }
                });
            });
        });
    });

    router.get('/create', passport.ensureAuthenticated, function(req, res) {
        res.render('client/group/create', {
            title: 'Add Group',
            user: (req.user) ? {email: req.user.email} : null,
            page: {
                addGroup: true
            }
        });
    });

    router.get('/:groupID/remove', passport.ensureAuthenticated, passport.isOwner, function(req, res) {
        db.getGroup(req.params.groupID, function(err, group) {
            res.render('client/group/removeGroup', {
                title: 'Remove Group',
                group: group,
                user: (req.user) ? {email: req.user.email} : null,
                page: {
                    removeGroup: true
                }
            });
        });
    });

    router.get('/:groupID/add-device', passport.ensureAuthenticated, passport.isOwner, function(req, res) {
        db.getAllDevices(function(err, devices) {
            db.getGroup(req.params.groupID, function(err, group) {
                res.render('client/group/addDevice', {
                    title: 'Add Device',
                    group: group,
                    devices: devices,
                    user: (req.user) ? {email: req.user.email} : null,
                    page: {
                        addOwner: true
                    }
                });
            });
        });
    });

    return router;
};
