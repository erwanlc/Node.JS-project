'use strict';

var express = require('express');
var router = express.Router();

module.exports = function() {
  router.get('/', function(req, res) {
    res.render('client/home', {
      title: 'Home',
      user: (req.user) ? {email: req.user.email} : null,
      page: {
        home: true
      }
    });
  });

  router.get('/home', function(req, res) {
    res.redirect('/');
  });

  router.get('/log-in', function(req, res) {
    res.render('client/log-in', {
      title: 'Log in',
      user: (req.user) ? {email: req.user.email} : null,
      page: {
        login: true
      }
    });
  });

  router.get('/register', function(req, res) {
    res.render('client/register', {
      title: 'Register',
      user: (req.user) ? {email: req.user.email} : null,
      page: {
        signin: true
      }
    });
  });


  router.get('/401', function(req, res) {
    res.status(401);
    res.render('client/401', {
      title: '401 - Unauthorized',
      user: (req.user) ? {email: req.user.email} : null
    });
  });


  router.get('/403', function(req, res) {
    res.status(403);
    res.render('client/403', {
      title: '403 - Forbidden',
      user: (req.user) ? {email: req.user.email} : null
    });
  });

  return router;
};
