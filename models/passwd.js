var mongoose = require('mongoose');

var schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	salt: {
		type: String,
		required: true
	},
	verified: {
		type: Boolean,
		required: true
	},
	level: {
		type: Number,
		required: true
	}
});

var passwd = mongoose.model('passwd', schema);
module.exports = passwd;
