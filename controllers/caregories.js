var Categories = require('./../models/categories');
var assert = require('assert');


exports.add = function(categories, cb) {
    categories.save(function(err, result) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};


exports.update = function(categories, cb) {
    Categories.update({ "_id": categories.id }, {
        $set: {
            "name": categories.name

        }
    }).exec(function(err, categories) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};

exports.remove = function(categories, cb) {
    Categories.remove({ "name": categories.name }, function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};
