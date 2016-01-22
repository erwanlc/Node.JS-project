'use strict';

var mongoose = require('mongoose');
var validator = require('validator');
mongoose.connect(require('../config/dev').mongo);
var Schema = mongoose.Schema;

// BEGIN USERS SCHEMAS
var userSchema = Schema({
  email: {
    type: String, required: true, unique: true,
    validate: [validator.isEmail, 'invalid email']
  },
  password: {type: String, required: true},
  groups: [{type: Schema.Types.ObjectId, ref: 'Groups'}],
  active: {type: Boolean, required: true, default: true},
  emailUnverified: {type: Boolean, default: true}
});

var groupSchema = Schema({
  groupName: {type: String, required: true},
  owners: [{type: Schema.Types.ObjectId, ref: 'Users', required: true}],
  devices: [{type: Schema.Types.ObjectId, ref: 'Devices'}],
  active: {type: Boolean, required: true, default: true}
});

var deviceSchema = Schema({
  deviceUID: {type: String, required: true, unique: true},
  deviceName: {type: String, required: true},
  groups: [{type: Schema.Types.ObjectId, ref: 'Groups'}],
  active: {type: Boolean, required: true, default: true}
});

module.exports = {
  disconnect: function() {
    mongoose.disconnect();
  },
  user: function() {
    return mongoose.model('Users', userSchema);
  },
  group: function() {
    return mongoose.model('Groups', groupSchema);
  },
  device: function() {
    return mongoose.model('Devices', deviceSchema);
  },
};
