'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(passport) {
  router.get('/account', passport.ensureAuthenticated, function(req, res) {
    res.render('client/user/account', {
      title: req.user.email,
      groups: req.user.groups,
      user: (req.user) ? {
        email: req.user.email
      } : null,
      page: {
        account: true
      }
    });
  });

  return router;
};
