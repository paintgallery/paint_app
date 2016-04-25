var assert = require('assert');
var User = require('./../models/user');
var Category = require('./../models/category');
var Picture = require('./../models/picture');

describe('database interface', function() {
	var connection;

	it ('should be connect to db', function(done) {
		assert.notEqual(connection, undefined);
		done();

	});

	it ('sould be add user to Users collection', function(done) {

	var user = new User({
		"name": "John",
		"password": "doe"
	});

	user.save(function(err, result) {
		if (err) {
			console.log(err);
		}
		User.find({"name": "John"}).exec(function(err, users) {
			var name = users[0].name;
			assert.equal(name, "John");
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