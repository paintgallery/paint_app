var assert = require('assert');
var Picture = require('./../models/picture');
var PictureController = require('./../controllers/picture');
var categories = require('./../models/categories');

describe('database interface', function() {
    var connection;


    // Connect to database


    it('should be connect to db', function(done) {
        assert.notEqual(connection, undefined);
        done();

    });

    var picture = new Picture({
        "name": "Tree near the lake",
        "description": "It's a beatifull picture from ukrainian author",
        "size": "200 x 350",
        "materials": "oil and paper",
        "categories": categories._id,
        "price": 100
    });

    // Add new picture

    it('sould be add picture to pictures collection', function(done) {




        PictureController.add(picture, function() {
            Picture.find({ "name": "Tree near the lake" }).exec(function(err, pictures) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var name = pictures[0].name;
                assert.equal(name, "Tree near the lake");
                done();
            });
        });


    });

    // Edit pictures

    it('should edit picture from pictures colection', function(done) {
        var picture = {
            name: "Tree near the lake",
            description: "beatifull picture",
            size: "5 x 5",
            materials: "oil",
            price: 200
        }
        PictureController.update(picture, function() {
            Picture.find({ "name": "Tree near the lake" }).exec(function(err, pictures) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                var description = pictures[0].description;
                assert.equal(description, "beatifull picture");
                done();
            });
        });





    });


    // Remove from collection

    it('should remove pictures from db', function(done) {
        PictureController.remove(picture, function() {
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
