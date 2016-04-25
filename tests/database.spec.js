var assert = require('assert');
var User = require('./../models/user');
var Category = require('./../models/category');
var Picture = require('./../models/picture');

describe('database interface', function() {
    var connection;

    it('should be connect to db', function(done) {
        assert.notEqual(connection, undefined);
        done();

    });

    it('sould be add user to Users collection', function(done) {

        var user = new User({
            "name": "John",
            "password": "doe"
        });

        user.save(function(err, result) {
            if (err) {
                console.log(err);
            }
            User.find({ "name": "John" }).exec(function(err, users) {
                var name = users[0].name;
                assert.equal(name, "John");
                done();
            });
        });
    });


    var category = new Category({
        name: "Oil paints"
    });

    it('should add category to Categorys collection', function(done) {

        category.save(function(err, result) {
            if (err) {
                console.log(err);
            }

            Category.find({ "name": "Oil paints" }).exec(function(err, categorys) {
                var name = categorys[0].name;
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
            "category": category._id,
            "price": 100
        });

        picture.save(function(err, result) {
            if (err) {
                console.log(err);
            }
            Picture.find({ "category": category._id }).exec(function(err, pictures) {
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
                assert.equal(users.length, 0);
                done();
            });
        });
    });

    it('should remove category from db', function(done) {
        Category.remove({ "name": "Oil paints" }, function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            Category.find({ "name": "Oil paints" }).exec(function(err, categorys) {
                assert.equal(categorys.length, 0);
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
