var events  = require('events');
var util    = require('util');


var SocketClient = function(socket){
	this.socket = socket;
	var self    = this;
	this.type   = null;

	if(!this.socket){
		return;
	}

	this.socket.on('deviceType', function(type){
		// Set instance to the received type
		self.__proto__ = require('./'+type+'Client').prototype;
		self.type = type;

		self.init();

		// Tell to the session manager that the client is connected
		self.emit('onConnection', self);
	});

	this.socket.on('disconnect', this.onCloseConnection.bind(this));
};

util.inherits(SocketClient, events.EventEmitter);

/**
 * Send method to the device
 * @param method String
 * @param args Object
 */
SocketClient.prototype.send = function(method, args){
	this.socket.emit(method, args);
}

/**
 * Sent when client closes the connection
 */
SocketClient.prototype.onCloseConnection = function(){
	// Tell to the session manager that the client is connected
	this.emit('onDisconnection', this);
}

module.exports = SocketClient;