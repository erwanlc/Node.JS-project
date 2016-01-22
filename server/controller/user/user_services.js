'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {
  router.post('/delete-user', passport.ensureAuthenticated, function(req, res) {
    req.logout();
    db.deleteUser(req.body.id, function(err) {
      res.send({msg: err || 'ok'});
    });
  });
  return router;
};
