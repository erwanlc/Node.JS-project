'use strict';
/* globals describe, it */

var should = require('should');
require('should-http');
var supertest = require('supertest');
var expect = require('expect.js');

var agent = supertest.agent(require('../../server/controller/express_server.js'));

describe('Routing pages', function() {
  describe('Common', function() {
    describe('GET /', function() {
      it('get the home page', function(done) {
        agent.get('/').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.html();
          expect(res.text).to.contain('<title>Home | WebService</title>');
          done();
        });
      });

      it('GET redirect /home to /', function(done) {
        agent.get('/home').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(302);
          res.should.have.header('location', '/');
          done();
        });
      });
    });

    describe('GET /register', function() {
      it('get the register page', function(done) {
        agent.get('/register').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.html();
          expect(res.text).to.contain('<title>Register | WebService</title>');
          done();
        });
      });
    });

    describe('GET /register', function() {
      it('get the log-in page', function(done) {
        agent.get('/log-in').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.html();
          expect(res.text).to.contain('<title>Log in | WebService</title>');
          done();
        });
      });
    });
  });

  describe('Error codes', function() {
    describe('GET /404', function() {
      it('get the 404 - Not found page', function(done) {
        agent.get('/this-url-doesnt-exist').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(404);
          res.should.be.html();
          expect(res.text).to.contain('<title>404 - Not found | WebService</title>');
          done();
        });
      });
    });

    describe('GET /401', function() {
      it('get the 401 - Unauthorized page', function(done) {
        agent.get('/401').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(401);
          res.should.be.html();
          expect(res.text).to.contain('<title>401 - Unauthorized | WebService</title>');
          done();
        });
      });
    });

    describe('GET /403', function() {
      it('get the 403 - Forbidden page', function(done) {
        agent.get('/403').end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(403);
          res.should.be.html();
          expect(res.text).to.contain('<title>403 - Forbidden | WebService</title>');
          done();
        });
      });
    });
  });
});
