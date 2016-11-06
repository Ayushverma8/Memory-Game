var mongoose = require('mongoose');

var schema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	verificationId: {
		type: String,
		required: true,
		unique: true
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true
	}
});

var VerifyMail = mongoose.model('VerifyMail', schema);
module.exports = VerifyMail;
