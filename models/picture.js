var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	size: {
		type: Number
	},
	materials: {

	},
	category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorys',
        required: true
	},
	price: {
		type: Number
	}
});
	module.exports = mongoose.model('Pictures', PictureSchema);
	
