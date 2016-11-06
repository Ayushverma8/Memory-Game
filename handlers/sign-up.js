var credentials = require('../credentials.js');
var crypto = require('crypto');
var Passwd = require('../models/passwd.js');
var Userinfo = require('../models/userinfo.js');
var VerifyMail = require('../models/verifymail.js');
var nodemailer = require('nodemailer');
var uuid = require('uuid');

exports.signupGet = function(req, res){
	res.render('sign-up', { layout: false });
};

exports.signupPost = function(req, res){
	console.log('Received contact from ' + req.body.id + ' <' + req.body.password + '>');
	var uid = uuid.v4();
	var verifyid = uuid.v4();
	//needs checks for already existant ids
	Passwd.findOne({ email: req.body.id })
		.exec(function(err, user){
			if (err){
				console.log("Database error.");			
			} else{
				if (!user){
					/*new Userinfo({
						name: req.body.name,
						email: req.body.id
						}).save();*/
					new Passwd({
						email: req.body.id,
						password: crypto.createHmac('sha256', uid)
							.update(req.body.password)
							.digest('hex'),
						salt: uid,
						verified: true,
						level: 1}).save();
					/*change it to false*/
					/*new VerifyMail({
						email: req.body.id,
						verificationId: verifyid,
						timestamp: Date.now(),
					}).save();*/
				}
			}
		});
		/*console.log("UID: "+verifyid);
		sendVerificationMail(verifyid);*/
		res.redirect(303, '/');
};
//modify the next function for completeness, add UUID
sendVerificationMail = function(uid){
		var mailTransport = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: credentials.gmail.user,
				pass: credentials.gmail.password,
			}
		});
		mailTransport.sendMail({
			from: '"SRM Inside" <admin@srminside.com>',
			to: 'random@gmail.com',
			subject: 'Verification Mail',
			text: 'This is a test mail for verification.\nClick on the following link to verify email address: http://localhost:3000/verifymail/' + uid,
		}, function(err){
			if(err) console.error( 'Unable to send email: ' + err );
		});
};
