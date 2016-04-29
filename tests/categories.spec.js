var assert = require('assert');
var Categories = require('./../models/picture');
var CategoriesController = require('./../controllers/picture');

describe('database interface', function() {
    var connection;


    // Connect to database


    it('should be connect to db', function(done) {
        assert.notEqual(connection, undefined);
        done();

    });

    var categories = new Categories({
        name: "Oil paints"
       
    });

    // Add new categories

    it('sould be add categories to categories collection', function(done) {




        CategoriesController.add(categories, function() {
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

    // Edit pictures

    // it('should edit picture from pictures colection', function(done) {
    //     var picture = {
    //         name: "Tree near the lake",
    //         description: "beatifull picture",
    //         size: "5 x 5",
    //         materials: "oil",
    //         price: 200
    //     }
    //     PictureController.update(picture, function() {
    //         Picture.find({ "name": "Tree near the lake" }).exec(function(err, pictures) {
    //             if (err) {
    //                 console.log(err);
    //                 process.exit(1);
    //             }
    //             var description = pictures[0].description;
    //             assert.equal(description, "beatifull picture");
    //             done();
    //         });
    //     });





    // });


    // Remove from collection

    it('should remove categories from db', function(done) {
        CategoriesController.remove(categories, function() {
            Categories.find({ "name": "Oil lake" }).exec(function(err, categoriess) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                assert.equal(categoriess.length, 0);
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
