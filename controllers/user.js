var User = require('./../models/user');
var assert = require('assert');

exports.add = function(user, cb) {
    user.save(function(err, result) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();

    });


};
exports.update = function(user, cb) {
    User.update({ "username": user.username }, {
        $set: {
            "email": user.email
        }

    }).exec(function(err, users) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();

    });
};
exports.remove = function(user, cb) {
    User.remove({ "username": user.username }, function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};
