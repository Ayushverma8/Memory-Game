var crypto = require('crypto');
var Passwd = require('../models/passwd.js');

exports.loginGet = function(req, res){
	res.render('login', { layout: false });
};

exports.loginPost = function(req, res){
	console.log('id: ' + req.body.id + '\npassword: ' + req.body.password);
	var password;
	var success = false;
	Passwd.findOne({'email': req.body.id})
		.exec(function(err, user){
			if (err){
				console.log("Database Error");
			} else{
				console.log(user);
				if(user){
					password = crypto.createHmac('sha256', user.salt).update(req.body.password).digest('hex');
					if (user.password === password){
						console.log("Successfully Logged In");
						success = true;
					} else{
						console.log("Email Id and Password do not match!");//Actually password is wrong!
					}
					/*
					if (user.verified === true){
						password = crypto.createHmac('sha256', user.salt).update(req.body.password).digest('hex')
						if (user.password === password){
							console.log("Successfully Logged In");
						} else{
							console.log("Email Id and Password do not match!");//Actually password is wrong!
						}
					} else{
						console.log("Verification Pending!");
					}
					*/
				} else{
					console.log("User not found");
				}
			}
			if (success === true) {
				console.log("XXtrue");
				req.session.userid = req.body.id;
				res.redirect(303, '/grid');
			} else {
				console.log("XXfalse");
				res.redirect(303, '/');
			}
		}
	);
};
