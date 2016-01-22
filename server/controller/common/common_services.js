'use strict';

var express = require('express');
var router = express.Router();
var db = require('../../model/db_interface.js');

module.exports = function(passport) {
  router.post('/log-in', passport.authenticate('local'), function(req, res) {
    res.send({msg: 'ok'});
  });

  router.post('/log-out', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/register', function(req, res) {
    db.addUser(req.body.email, req.body.password, function(err) {
      if (err) {
        if (err.code === 11000) {
          res.send({msg: 'email exist'});
        } else if (err.toString().indexOf('password') >= 0) {
          res.send({msg: 'password needed'});
        } else if (err.toString().indexOf('email') >= 0) {
          res.send({msg: 'email needed or invalid'});
        } else {
          res.send(err);
        }
      } else {
        res.send({msg: 'ok'});
      }
    });
  });

  return router;
};
