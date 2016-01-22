'use strict';

var LocalStrategy = require('passport-local').Strategy;
var db = require('../model/db_interface.js');

module.exports = function(passport) {
  passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      }, function(username, password, done) {
        db.getUser(username, function(err, doc) {
          if (err) {
            done(null, false);
          } else {
            if (doc && doc.email === username && doc.password === password) {
              done(null, doc);
            } else {
              done(null, false);
            }
          }
        });
      }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(user, done) {
    db.getFullUserById(user, function(err, doc) {
      done(null, doc);
    });
  });

  passport.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/401');
    }
  };

  passport.isOwner = function(req, res, next) {
    var groupID = req.params.groupID || req.body.groupID;

    var isOwner_ = function() {
      db.isOwner(req.user._id, groupID, function(owner) {
        if (owner) {
          return next();
        } else {
          res.redirect('/403');
        }
      });
    };
    isOwner_();
  };
};
