'use strict';

var db = require('./db_schemas.js');
var UserDB = db.user();
var GroupDB = db.group();
var DeviceDB = db.device();

var groups = {
    createGroup: function(groupName, ownerID, done) {
        if (!ownerID) {
            done('Error: `ownerID` is required.');
        } else {
            var group = new GroupDB({
                groupName: groupName,
                owners: [ownerID]
            });

            group.save(function(err, doc) {
                if (err) {
                    done(err, doc);
                } else {
                    UserDB.findByIdAndUpdate({_id: ownerID}, {$push: {groups: doc._id}}, function(e) {
                        done(e, doc);
                    });
                }
            });
        }
    },
    getGroup: function(id, done) {
        GroupDB.findById(id).populate('owners').exec(function(err, doc) {
            done(err, doc);
        });
    },
    getFullGroup: function(id, done) {
        GroupDB.findById(id).populate('owners devices').exec(function(err, doc) {
            done(err, doc);
        });
    },
    activateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {active: true}, function(err) {
            if (err) {
                done(err);
            } else {
                DeviceDB.find({group: id}, function(err, docs) {
                    docs.forEach(function(doc) {
                        doc.update({}, {active: true});
                        doc.save(function(){
                        });
                    });
                    done(err);
                });
            }
        });
    },
    desactivateGroup: function(id, done) {
        GroupDB.findByIdAndUpdate({_id: id}, {active: false}, function(err) {
            if (err) {
                done(err);
            } else {
                DeviceDB.find({group: id}, function(err, docs) {
                    docs.forEach(function(doc) {
                        doc.update({}, {active: false});
                        doc.save(function(){
                        });
                    });
                    done(err);
                });
            }
        });
    },
    deleteGroup: function(id, done) {
        GroupDB.findByIdAndRemove(id, 1, function(err) {
            done(err);
        });
    },
    renameGroup: function(groupName, infos, done) {
        GroupDB.update({groupName: groupName}, {groupName: infos}, function(err, doc) {
            done(err, doc);
        });
    },
    addDeviceToGroup: function(deviceID, groupID, done) {
        GroupDB.findByIdAndUpdate(groupID, {$addToSet: {devices: deviceID}}, function(errGroup) {
            if (errGroup) {
                done(errGroup);
            } else {
                DeviceDB.findByIdAndUpdate(deviceID, {$addToSet: {groups: groupID}}, function(errDevice) {
                    done(errDevice);
                });
            }
        });
    },
    removeDeviceFromGroup: function(deviceID, groupID, done) {
        GroupDB.findById(groupID, function(err, docG) {
            docG.devices.pull(deviceID);
            docG.save(function() {
                DeviceDB.findById(deviceID, function(errDevice, docD) {
                    if (errDevice) {
                        done(errDevice);
                    }
                    docD.groups.pull(groupID);
                    docD.save(function(err) {
                        done(err);
                    });
                });
            });
        });
    },
    isOwner: function(userID, groupID, done) {
        GroupDB.findOne({_id: groupID, owners: userID}, function(err, doc) {
            done(!!doc);
        });
    },
};

module.exports = groups;
