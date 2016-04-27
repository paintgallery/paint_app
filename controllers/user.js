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