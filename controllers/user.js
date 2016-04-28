var User = require('./../models/user');
var assert = require('assert');

exports.add = function(user) {
    user.save(function(err, result) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

    });


};
exports.edit = function(user) {
    User.update({ "username": user.username }, {
        $set: {
            "email": user.email
        }

    }).exec(function(err, users) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
};
exports.delete = function(user) {
    User.remove({ "username": user.username }, function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
}
