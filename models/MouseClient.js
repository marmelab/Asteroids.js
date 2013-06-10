var SocketClient  = require('./SocketClient');
var util          = require('util');

var MouseClient = function(){

};

util.inherits(MouseClient, SocketClient);

MouseClient.prototype.init = function(){
	this.socket.on('mouseOrientation', this.onMouseOrientation.bind(this));
	this.socket.on('pewpew', this.onPewpew.bind(this));
};

MouseClient.prototype.onMouseOrientation = function(value){
	this.emit('onMouseOrientation', value);
};

MouseClient.prototype.onPewpew = function(value){
	this.emit('onPewpew', value);
};

module.exports = MouseClient;