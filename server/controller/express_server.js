'use strict';

var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var exphbs = require('express-handlebars');
var MongoStore = require('connect-mongo')(session);

require('./passport_config.js')(passport);
var client = require('./common/common_router')(passport);
var clientServices = require('./common/common_services')(passport);
var group = require('./group/group_router')(passport);
var groupServices = require('./group/group_services')(passport);
var user = require('./user/user_router')(passport);
var userServices = require('./user/user_services')(passport);
var device = require('./device/device_router')(passport);
var deviceServices = require('./device/device_services')(passport);

var hbs = exphbs.create({
  defaultLayout: 'client',
  partialsDir: [
    'views/client/partials/'
  ]
});

var app = express();

// BEGIN passport config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: require('../config/dev.js').secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({url: require('../config/dev.js').mongo})
}));
app.use(passport.initialize());
app.use(passport.session());
// END passport config

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('resources'));

app.use('/', client);
app.use('/', clientServices);
app.use('/group', group);
app.use('/group', groupServices);
app.use('/user', user);
app.use('/user', userServices);
app.use('/device', device);
app.use('/device', deviceServices);

app.use(function(req, res) {
  res.status(404);
  res.render('client/404', {
    title: '404 - Not found',
    user: (req.user) ? {email: req.user.email} : null
  });
});

module.exports = app;
