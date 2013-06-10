
/**
 * Module dependencies.
 */

var express         = require('express');
var routes          = require('./routes');
var http            = require('http');
var path            = require('path');
var socketio        = require('socket.io');
var partials        = require('express-partials');
var SessionManager  = require('./models/SessionManager');
var sessionManager  = new SessionManager();

var app       = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

	app.use(partials());

  app.use(express.favicon());

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
	app.use(express.logger('dev'));
});

app.get('/', routes.mouse);
app.get('/display', routes.display);


var server = app.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});


var io = socketio.listen(server,  { log: false });

io.sockets.on('connection', function(socket){
	sessionManager.acceptConnection(socket);
});