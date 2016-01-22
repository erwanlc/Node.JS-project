'use strict';
/* globals describe, it, before, after */

var should = require('should');
var mp = require('./model_preparers.js');
var db = require('../../server/model/db_interface.js');

describe('DB Groups', function() {
    after(function(done) {
        mp.preparers.chainPreparers([
            mp.preparers.rUserDB,
            mp.preparers.rGroupDB,
            function() {
                done();
            }
        ]);
    });

    describe('#createGroup()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        done();
                    });
                }
            ]);
        });

        it('add a group with username@domain.com as owner', function(done) {
            db.createGroup(mp.group1.groupName, dbUser._id, function(errT, docT) {
                should.not.exist(errT);
                db.getGroup(docT._id, function(err, doc) {
                    should.not.exist(err);
                    should(doc.groupName).be.equal(mp.group1.groupName);
                    done();
                });
            });
        });

        it('fail no group name', function(done) {
            db.createGroup(null, dbUser._id, function(err, doc) {
                should.not.exist(doc);
                should(err.toString()).be.equal('ValidationError: Path `groupName` is required.');
                done();
            });
        });

        it('fail no group owner', function(done) {
            db.createGroup(mp.group1.groupName, null, function(err, doc) {
                should.not.exist(doc);
                should(err.toString()).be.equal('Error: `ownerID` is required.');
                done();
            });
        });
    });

    describe('#change-info()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                mp.preparers.aGroup1,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        done();
                    });
                }
            ]);
        });

        it('get group from id (obtained from user)', function(done) {
            db.renameGroup(mp.group1.groupName, {
                groupName: 'olol'
            }, function() {
                db.getGroup(dbUser.groups[0], function(err, doc) {
                    should.not.exist(err);
                    should(doc.groupName).be.equal(mp.group1.groupName);
                    done();
                });
            });
        });
    });

    describe('#getGroup()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                mp.preparers.aGroup1,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        done();
                    });
                }
            ]);
        });

        it('get group from id (obtained from user)', function(done) {
            db.getGroup(dbUser.groups[0], function(err, doc) {
                should.not.exist(err);
                should(doc.groupName).be.equal(mp.group1.groupName);
                done();
            });
        });
    });

    describe('#activateGroup()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                mp.preparers.aGroup1,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        db.desactivateGroup(doc.groups[0], function() {
                            done();
                        });
                    });
                }
            ]);
        });

        it('activate a group', function(done) {
            db.activateGroup(dbUser.groups[0], function(e) {
                should.not.exist(e);
                db.getGroup(dbUser.groups[0], function(err, doc) {
                    should.not.exist(err);
                    should(doc.active).be.equal(true);
                    done();
                });
            });
        });
    });

    describe('#deactivateGroup()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                mp.preparers.aGroup1,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        db.activateGroup(doc.groups[0], function() {
                            done();
                        });
                    });
                }
            ]);
        });

        it('deactivate a group', function(done) {
            db.desactivateGroup(dbUser.groups[0], function(e) {
                should.not.exist(e);
                db.getGroup(dbUser.groups[0], function(err, doc) {
                    should.not.exist(err);
                    should(doc.active).be.equal(false);
                    done();
                });
            });
        });
    });

    describe('#deleteGroup()', function() {
        var dbUser;
        before(function(done) {
            mp.preparers.chainPreparers([
                mp.preparers.rUserDB,
                mp.preparers.rGroupDB,
                mp.preparers.aUser,
                mp.preparers.aGroup1,
                function() {
                    db.getUser(mp.user.email, function(err, doc) {
                        dbUser = doc;
                        done();
                    });
                }
            ]);
        });

        it('remove a group', function(done) {
            db.deleteGroup(mp.group1._id, function(e) {
                should.not.exist(e);
                done();
            });
        });
    });
});
