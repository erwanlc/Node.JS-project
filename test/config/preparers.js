'use strict';

var config = {
  user: {
    email: 'username@domain.com',
    password: 'password'
  },
  group1: {
    groupName: 'testGroup1'
  },
  group2: {
    groupName: 'testGroup2'
  },
  device:{
    deviceUID: '4fd5',
    deviceName: 'fenetre'
  },
  device1:{
    deviceUID: '27.0.0.1',
    deviceName: 'lumiere'
  },
  device2:{
    deviceUID: '10a3',
    deviceName: 'porte'
  }
};

module.exports = function(obj) {
  for (var a in config) {
    if (config.hasOwnProperty(a)) {
      obj[a] = config[a];
    }
  }
};
