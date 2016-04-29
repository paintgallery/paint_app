var assert = require('assert');
var User = require('./../models/user');
var Categories = require('./../models/categories');
var Picture = require('./../models/picture');
var UserController = require('./../controllers/user')

describe('database interface', function() {
    var connection;


    // Connect to database


    it('should be connect to db', function(done) {
        assert.notEqual(connection, undefined);
        done();

    });

    var user = new User({
        "username": "John",
        "password": "doe",
        "email": "fedyshyn.roma@gmail.com"

    });

    // Add new user

    it('sould be add user to Users collection', function(done) {




        UserController.add(user, function() {
            User.find({ "username": "John" }).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var username = users[0].username;
                assert.equal(username, "John");
                done();
            });
        });


    });

    // Edit user

    it('should edit user from Users collection', function(done) {
        var user = {
            username: "John",
            email: "lanzeron@gmail.com"
        }
        UserController.update(user, function() {
            User.find({ "username": "John" }).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var email = users[0].email;
                assert.equal(email, "lanzeron@gmail.com");
                done();
            });
        });





    });


    // Remove from collection

    it('should remove user from db', function(done) {
        UserController.remove(user, function() {
            User.find({ "username": "John" }).exec(function(err, users) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                assert.equal(users.length, 0);
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
