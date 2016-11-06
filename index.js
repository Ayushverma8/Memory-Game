var bodyParser = require('body-parser');
var credentials = require('./credentials.js');
var express = require('express');
var handlebars = require('express-handlebars').create();
var http = require('http');
var session = require('express-session');
var uuid = require('uuid');

var app = express();

// Handlebar.js templating engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// logger middleware
switch(app.get('env')){
	case 'development':
		//compactt, colorful dev logging
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		//module 'express-logger' supports daily log rotation
		app.use(require('express-logger')({
			path: __dirname + '/log/requests/log'
		}));
		break;
}

// database conenction middleware
var mongoose = require('mongoose');
var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
switch(app.get('env')){
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}

/*
// cluster testing
app.use(function(req, res, next){
	var cluster = require('cluster');
	if(cluster.isWorker) {
		console.log('Worker %d received request', cluster.worker.id);
		next();
	}
});
*/

// static resources middleware
app.use(express.static(__dirname + '/public'));

// post body parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('cookie-parser')(credentials.cookieSecret));

app.use(session({ 
	genid: uuid.v4,
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next){
	console.log(req.session.id);
	console.log(req.sessionID);
	console.log(req.session);//test code
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

require('./routes.js')(app);

//custom 404 page
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

function startServer(){
	http.createServer(app).listen(app.get('port'), function(){
		console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
	});
}

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnectd through app termination');
		process.exit(0);
	});
});

if(require.main === module){
	//application run directly; start app server
	startServer();
} else {
	// application imported as a module via "require": export function
	// to create server
	module.exports = startServer;
}
