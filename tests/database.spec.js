var assert = require('assert');
var User = require('./../models/user');
var Categories = require('./../models/categories');
var Picture = require('./../models/picture');

describe('database interface', function() {
    var connection;

    it('should be connect to db', function(done) {
        assert.notEqual(connection, undefined);
        done();

    });

    it('sould be add user to Users collection', function(done) {

        var user = new User({
            "username": "John",
            "password": "doe",
            "email": "fedyshyn.roma@gmail.com"
        });

        user.save(function(err, result) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            User.find({ "name": "John" }).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var name = users[0].name;
                assert.equal(name, "John");
                done();
            });
        });
    });


    var categories = new Categories({
        name: "Oil paints"
    });

    it('should add categories to Categories collection', function(done) {

        categories.save(function(err, result) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            Categories.find({ "name": "Oil paints" }).exec(function(err, categories) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var name = categories[0].name;
                assert.equal(name, "Oil paints");
                done();
            });
        });
    });

    it('should add picture to Pictures collection', function(done) {

        var picture = new Picture({
            "name": "Tree near the lake",
            "description": "It's a beatifull picture from ukrainian author",
            "size": "200 x 350",
            "materials": "oil and paper",
            "categories": categories._id,
            "price": 100
        });

        picture.save(function(err, result) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            Picture.find({ "categories": categories._id }).exec(function(err, pictures) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var name = pictures[0].name;
                assert.equal(name, 'Tree near the lake');
                done();
            });
        });
    });


    // Remove from collection

    it('should remove user from db', function(done) {
        User.remove({ "name": "John" }, function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            User.find({ "name": "John" }).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                assert.equal(users.length, 0);
                done();
            });
        });
    });

    it('should remove categories from db', function(done) {
        Categories.remove({ "name": "Oil paints" }, function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            Categories.find({ "name": "Oil paints" }).exec(function(err, categories) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                assert.equal(categories.length, 0);
                done();
            });
        });
    });

    it('should remove picture from db', function(done) {
        Picture.remove({ "name": "Tree near the lake" }, function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            Picture.find({ "name": "Tree near the lake" }).exec(function(err, pictures) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                assert.equal(pictures.length, 0);
                done();
            });
        });
    });

    before(function(done) {
        connection = require('./../connect');
        done();
    });

    after(function(done) {
        connection.close();
        done();
    });
});
