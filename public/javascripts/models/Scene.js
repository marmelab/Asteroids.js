var Scene = function(){
	this.FPS = 60;
	this.connected = false;
	this.elements = [];
	this.increment = 0;
	this.laserSound = new Audio("/sounds/laser.mp3");

	// Display
	this.paper = new Raphael('container', window.innerWidth, window.innerHeight);

	// Add ship
	this.ship = new Ship(this.paper, this);
	this.ship.init();
	this.addElement(this.ship);

	// Add asteroids
	var nbAsteroids = Math.random() * 1 + 5;
	var asteroid;

	for(var i = 0; i < nbAsteroids; i++){
		asteroid = new Asteroid(this.paper, this);
		asteroid.init();
		this.addElement(asteroid);
	}

	// Socket
	this.socket = io.connect('http://'+HOST);
	this.socket.on('connect', this.onConnect.bind(this));
	this.socket.on('error', this.onError.bind(this));
	this.socket.on('onMouseOrientation', this.onMouseOrientation.bind(this));
	this.socket.on('onPewpew', this.onPewpew.bind(this));

	console.log('OK');
};

Scene.prototype.startRenderLoop = function(){
	this.drawInterval = setInterval(this.draw.bind(this), 1000 / this.FPS);
};

Scene.prototype.draw = function(){
	for(var i = 0, length = this.elements.length; i < length; i++){
		if(!this.elements[i]){
			continue;
		}

		this.elements[i].draw();
	}
};

Scene.prototype.addElement = function(sceneElement){
	sceneElement.id = this.increment++;

	this.elements.push(sceneElement);
};

Scene.prototype.removeElement = function(element){
	for(var i = 0, length = this.elements.length; i < length; i++){
		if(this.elements[i].id == element.id){

			this.elements.splice(i, 1);
			break;
		}
	}
};

Scene.prototype.getElements = function(){
	return this.elements;
};

// Events
Scene.prototype.onConnect = function(){
	console.log('connected');

	this.connected = true;

	this.socket.emit('deviceType', 'Display');
};

Scene.prototype.onError = function(){
	console.log('error');
};

Scene.prototype.onMouseOrientation = function(orientation){
	this.ship.rotate( (90 - orientation.z) + 180);

	this.ship.accelerateX(orientation.x / -20);
	this.ship.accelerateY(orientation.y / -20);
};

Scene.prototype.onPewpew = function(value){
	this.laserSound.play();

	this.ship.pewpew();
};
