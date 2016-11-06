var databaseError = require('./handlers/database-error.js');
var login = require('./handlers/login.js');
var signup = require('./handlers/sign-up.js');
var levels = require('./handlers/levels.js');




module.exports = function(app){
	app.get('/', login.loginGet);
	app.post('/', login.loginPost);
	app.get('/grid', function (req, res) {
		if (req.session.userid) {
				res.render('grid');
		} else {
			res.redirect(303, '/');
		}
	});
	app.get('/levels', levels.xhr);
	app.post('/levels', levels.postXhr);
/*	app.post('/grid', login.loginPost);*/
	app.get('/sign-up', signup.signupGet);
	app.post('/sign-up', signup.signupPost);
	app.get('/database-error', databaseError.home);
};
