'use strict';

var should = require('should');
var expect = require('expect.js');
var mp = require('./model_preparers.js');
var db = require('../../server/model/db_interface.js');

describe('DB Users', function() {
  after(function(done) {
    mp.preparers.chainPreparers([
      mp.preparers.rUserDB,
      function() {
        done();
      }
    ]);
  });

  describe('#addUser()', function() {
    before(function(done) {
      mp.preparers.chainPreparers([
        mp.preparers.rUserDB,
        function() {
          done();
        }
      ]);
    });

    it('Add a user', function(done) {
      db.addUser(mp.user.email, mp.user.password, function(e) {
        should.not.exist(e);
        db.getUser(mp.user.email, function(err, doc) {
          should.not.exist(err);
          should(doc.email).be.equal(mp.user.email);
          done();
        });
      });
    });

    it('can\'t add user : same user', function(done) {
      db.addUser(mp.user.email, mp.user.password, function(err) {
        should(err.code).be.equal(11000);
        expect(err.message).to.contain('dup key:');
        done();
      });
    });

    it('can\'t add user : email is empty', function(done) {
      db.addUser(null, mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: Path `email` is required.');
        done();
      });
    });

    it('can\'t add user : password is empty', function(done) {
      db.addUser(mp.user.email, null, function(err) {
        should(err.toString()).be.equal('ValidationError: Path `password` is required.');
        done();
      });
    });

    it('can\'t add user : email is username@.com', function(done) {
      db.addUser('username@.com', mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: invalid email');
        done();
      });
    });

    it('can\'t add user : email is @.', function(done) {
      db.addUser('@.', mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: invalid email');
        done();
      });
    });

    it('can\'t add user : email is @domain.com', function(done) {
      db.addUser('@domain.com', mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: invalid email');
        done();
      });
    });

    it('can\'t add user : email is username@domain.', function(done) {
      db.addUser('username@domain.c', mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: invalid email');
        done();
      });
    });

    it('can\'t add user : email is username@domain.c', function(done) {
      db.addUser('username@domain.c', mp.user.password, function(err) {
        should(err.toString()).be.equal('ValidationError: invalid email');
        done();
      });
    });
  });

  describe('#getUser()', function() {
    before(function(done) {
      mp.preparers.chainPreparers([
        mp.preparers.rUserDB,
        mp.preparers.aUser,
        function() {
          done();
        }
      ]);
    });

    it('retrieve user : username@domain.com', function(done) {
      db.getUser(mp.user.email, function(err, doc) {
        should.not.exist(err);
        should(doc.email).be.equal(mp.user.email);
        should(doc.password).be.equal(mp.user.password);
        done();
      });
    });

    it('should not retrieve user', function(done) {
      db.getUser('notauser@domain.com', function(err, doc) {
        should.not.exist(err);
        should.not.exist(doc);
        done();
      });
    });
  });

  describe('#deleteUser()', function() {
    before(function(done) {
      mp.preparers.chainPreparers([
        mp.preparers.rUserDB,
        mp.preparers.aUser,
        function() {
          done();
        }
      ]);
    });

    it('delete user', function(done) {
      db.deleteUser(mp.user._id, function(err1) {
        should.not.exist(err1);
        done();
      });
    });
  });
});
