'use strict';

var dbGroup = require('./groups.js');
var dbUsers = require('./users.js');
var dbDevice = require('./devices.js');

var db = {
    addUser: dbUsers.addUser,
    getUser: dbUsers.getUser,
    getFullUserById: dbUsers.getFullUserById,
    deleteUser: dbUsers.deleteUser,

    createGroup: dbGroup.createGroup,
    renameGroup: dbGroup.renameGroup,
    getGroup: dbGroup.getGroup,
    getFullGroup: dbGroup.getFullGroup,
    activateGroup: dbGroup.activateGroup,
    desactivateGroup: dbGroup.desactivateGroup,
    deleteGroup: dbGroup.deleteGroup,
    addDeviceToGroup: dbGroup.addDeviceToGroup,
    removeDeviceFromGroup: dbGroup.removeDeviceFromGroup,
    isOwner: dbGroup.isOwner,

    addDevice: dbDevice.addDevice,
    removeDevice: dbDevice.removeDevice,
    getDevice: dbDevice.getDevice,
    getAllDevices: dbDevice.getAllDevices,
    renameDevice: dbDevice.renameDevice,
    activateDevice: dbDevice.activateDevice,
    desactivateDevice: dbDevice.desactivateDevice

};

module.exports = db;
