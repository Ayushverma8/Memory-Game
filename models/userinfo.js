var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	staffid: String,
	designation: String,
	contact_no: Number
});

var Userinfo = mongoose.model('Userinfo', schema);
module.exports = Userinfo;
