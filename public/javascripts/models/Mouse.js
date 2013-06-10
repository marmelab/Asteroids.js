var Mouse = function(){
	this.socket = io.connect('http://'+HOST);
	this.connected = false;

	this.socket.on('connect', this.onConnect.bind(this));

	window.ondeviceorientation = this.handleDeviceOrientation.bind(this);

	Hammer(window).on("tap", this.handleTap.bind(this));

	this.positiveXAcc = null;
	this.positiveYAcc = null;
};

Mouse.prototype.onConnect = function(){
	this.connected = true;

	this.socket.emit('deviceType', 'Mouse');
};


Mouse.prototype.handleDeviceOrientation = function(e){
	if(!this.connected ){
		return;
	}

	var x = e.gamma;
	var y = e.beta;
	var z = e.alpha;

	this.socket.emit('mouseOrientation', {x: x, y:y, z:z});
};

Mouse.prototype.handleTap = function(e){
	this.socket.emit('pewpew');
};