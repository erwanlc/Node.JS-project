'use strict';
/* globals describe, it, before, after */

var should = require('should');
var expect = require('expect.js');
var mp = require('./model_preparers.js');
var db = require('../../server/model/db_interface.js');

describe('DB Devices', function() {
    after(function(done) {
        mp.preparers.chainPreparers([
            mp.preparers.rDeviceDB,
            function() {
                done();
            }
        ]);
    });

    describe('#addDevice()', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                function() {
                    done();
                }
            ]);
        });

        it('add a device', function(done) {
            db.addDevice(mp.device.deviceUID, mp.device.deviceName, function(e) {
                should.not.exist(e);
                db.getDevice(mp.device.deviceUID, function(err, doc) {
                    should.not.exist(err);
                    should(doc.deviceUID).be.equal(mp.device.deviceUID);
                    done();
                });
            });
        });

        it('deviceUID already exist', function(done) {
            db.addDevice(mp.device.deviceUID, mp.device.deviceName, function(err, doc) {
                should(err.code).be.equal(11000);
                expect(err.message).to.contain('dup key');
                done();
            });
        });

        it('fail no deviceUID', function(done) {
            db.addDevice(null, mp.device.deviceName, function(err, doc) {
                should(err.toString()).be.equal('ValidationError: Path `deviceUID` is required.');
                done();
            });
        });

        it('fail no deviceName', function(done) {
            db.addDevice(mp.device.deviceUID, null, function(err, doc) {
                should(err.toString()).be.equal('ValidationError: Path `deviceName` is required.');
                done();
            });
        });
    });

    describe('#getDevice()', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                mp.preparers.aDevice,
                function() {
                    done();
                }
            ]);
        });

        it('retrieve device', function(done) {
            db.getDevice(mp.device.deviceUID, function(err, doc) {
                should.not.exist(err);
                should(doc.deviceUID).be.equal(mp.device.deviceUID);
                should(doc.deviceName).be.equal(mp.device.deviceName);
                done();
            });
        });

        it('should not retrieve device', function(done) {
            db.getUser('notadevice', function(err, doc) {
                should.not.exist(err);
                should.not.exist(doc);
                done();
            });
        });
    });

    describe('#activateDevice()', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                mp.preparers.aDevice,
                function() {
                    db.desactivateDevice(mp.device._id, function() {
                        done();
                    });
                }
            ]);
        });

        it('activate a device', function(done) {
            db.activateDevice(mp.device._id, function(err1) {
                should.not.exist(err1);
                db.getDevice(mp.device.deviceUID, function(err2, doc) {
                    should.not.exist(err2);
                    should(doc.active).be.equal(true);
                    done();
                });
            });
        });
    });

    describe('#desactivateDevice()', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                mp.preparers.aDevice,
                function() {
                    db.activateDevice(mp.device._id, function() {
                        done();
                    });
                }
            ]);
        });

        it('desactivate a device', function(done) {
            db.desactivateDevice(mp.device._id, function(e) {
                should.not.exist(e);
                db.getDevice(mp.device.deviceUID, function(err, doc) {
                    should.not.exist(err);
                    should(doc.active).be.equal(true);
                    done();
                });
            });
        });
    });

    describe('#renameDevice()', function() {
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rDeviceDB,
                mp.preparers.aDevice,
                function() {
                    db.getDevice(mp.user.email, function(err, doc) {
                        done();
                    });
                }
            ]);
        });

        it('rename the device', function(done) {
            db.renameDevice(mp.device.deviceUID, {
                deviceName: mp.device.deviceName
            }, function() {
                db.getDevice(mp.device.deviceUID, function(err, doc) {
                    should.not.exist(err);
                    should(doc.deviceName).be.equal(mp.device.deviceName);
                    done();
                });
            });
        });
    });

    describe('#removeDevice()', function() {
      before(function(done) {
          mp.preparers.chainPreparers([
              mp.preparers.rDeviceDB,
              mp.preparers.aDevice,
              function() {
                  done();
              }
          ]);
      });

      it('delete device', function(done) {
          db.removeDevice(mp.device.deviceUID, function(err1) {
              should.not.exist(err1);
              db.getDevice(mp.device.deviceUID, function(err2) {
                  should(err2.code).be.equal(9);
              });
              done();
          });
      });
  });
});
