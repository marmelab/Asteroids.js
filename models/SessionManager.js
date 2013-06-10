var SocketClient  = require('./SocketClient');

var SessionManager = function(){
	this.mouse    = null;
	this.display  = null;
};

SessionManager.prototype.acceptConnection = function(socket){
	var client = new SocketClient(socket);

	client.on('onConnection', this.onConnection.bind(this));
	client.on('onDisconnection', this.onDisconnection.bind(this));

	client.on('onMouseOrientation', this.onMouseOrientation.bind(this));
	client.on('onPewpew', this.onPewpew.bind(this));
};

SessionManager.prototype.onConnection = function(client){
	if(client.type == 'Display'){
		this.display  = client;
	}else{
		this.mouse    = client;
	}
};

SessionManager.prototype.onDisconnection = function(client){
	if(client.type == 'Display'){
		this.display  = null;
	}else{
		this.mouse    = null;
	}
};

SessionManager.prototype.onMouseOrientation = function(value){
	if(!this.display){
		  return;
	}

	this.display.send('onMouseOrientation', value);
};

SessionManager.prototype.onPewpew = function(value){
	if(!this.display){
		  return;
	}

	this.display.send('onPewpew', value);
};

module.exports = SessionManager;