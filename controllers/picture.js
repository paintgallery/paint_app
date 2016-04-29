var Picture = require('./../models/picture.js');
var assert = require('assert');


exports.add = function(picture, cb) {
    picture.save(function(err, result) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};


exports.update = function(picture, cb) {
    Picture.update({ "name": picture.name }, {
        $set: {
            "description": picture.description,
            "size": picture.size,
            "materials": picture.materials,
            "price": picture.price

        }
    }).exec(function(err, pictures) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        cb();
    });
};

exports.remove = function(picture, cb) {
	Picture.remove({"name": picture.name}, function(err) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		cb();
	});
};
