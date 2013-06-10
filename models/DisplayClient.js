var SocketClient  = require('./SocketClient');
var util          = require('util');

var DisplayClient = function(){

};

util.inherits(DisplayClient, SocketClient);

DisplayClient.prototype.init = function(){

};

module.exports = DisplayClient;