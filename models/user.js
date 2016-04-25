var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String
	}
});

module.exports = mongoose.model('Users', UserSchema);
