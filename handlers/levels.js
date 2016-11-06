var Passwd = require('../models/passwd.js');

exports.xhr = function (req, res) {
	console.log("SSSSS"+req.session.userid);
	if (req.xhr) {
		Passwd.findOne({'email': req.session.userid})
			.exec(function(err, user){
				var level = 1;
				if (err){
					console.log("Database Error");
				} else{
					console.log(user);
					if(user){
						level = user.level;
					}
				}
				console.log("AJAX Call"+level);
				res.json({"level": level});
			}
		);
	} else {
		res.status(404);
		res.render('404');
	}
}

exports.postXhr = function (req, res) {
	if (req.xhr) {
		console.log('XXX'+req.body.level);
		res.json({"success": true});
	} else {
		console.log('YYY'+req.body.level);
		
	}
	console.log("YYY"+req.session.userid);
	Passwd.findOneAndUpdate({email: req.session.userid}, {level: req.body.level }, function (err, user) {
		if(err) {
			console.log("founderror");
		}
	});
	res.json({"success": true});
}
