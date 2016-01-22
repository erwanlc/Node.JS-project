'use strict';

var db = require('./db_schemas.js');
var UserDB = db.user();

var users = {

  addUser: function(email, password, done) {
    var user = new UserDB({
      email: email,
      password: password
    });
    user.save(function(err, doc) {
      done(err, doc);
    });
  },
  getUser: function(email, done) {
    UserDB.findOne({email: email}, function(err, doc) {
      done(err, doc);
    });
  },
  getFullUserById: function(id, done) {
    UserDB.findById(id).populate('groups').exec(function(err, doc) {
        done(err, doc);
    });
  },
  deleteUser: function(id, done) {
    UserDB.findByIdAndRemove(id, 1, function(err) {
      done(err);
    });
  }
};

module.exports = users;