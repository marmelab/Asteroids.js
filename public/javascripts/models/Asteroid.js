var Asteroid = function(){
	// super
	this.__proto__.__proto__.constructor.apply(this, arguments);

	this.level = 3;
	this.teleport = true;
	this.boomSound = new Audio("/sounds/explosion.mp3");
	this.lastHitElements = {};

	var self = this;
	setTimeout(function(){
		self.isTouchable = true;
	}, 500);
};

Asteroid.prototype.__proto__ = SceneElement.prototype;

Asteroid.prototype.init = function(){
	this.isTouchable = false;
	this.height = this.width  = this.level * 10;

	if(this.x == 0){
		do {
			this.x = Math.random() * this.paper.width - this.width;
			this.y = Math.random() * this.paper.width - this.width;
		}while(this.hittingElements().length);
	}

	this.velocityX = (Math.random() * 3 + 1) * Math.random() > 0.5 ? 1 : -1;
	this.velocityY = (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1);

	var path = [];
	for(var i = 0; i <= Math.PI * 2; i += 0.2){
		var posX = Math.cos(i) * this.width + (Math.random() *  (Math.random() > 0.5 ? 5 : -5));
		var posY = Math.sin(i) * this.width + (Math.random() *  (Math.random() > 0.5 ? 5 : -5));

		if(path.length == 0){
			path.push('M', posX, posY);
		}else{
			path.push('L', posX, posY);
		}
	}
	path.push('Z');

	this.element = this.paper.path(path);
	this.element.attr('stroke', '#fff');


};

Asteroid.prototype.draw = function(){
	this.__proto__.__proto__.draw.apply(this, arguments);

	var hittingElts = this.hittingElements();
	if(!hittingElts.length){
		return;
	}

	for(var i = 0, length = hittingElts.length; i < length; i++){
		var elt = hittingElts[i];

		if(elt instanceof Asteroid){
			elt.velocityX *= -1
			elt.velocityY *= -1

			this.velocityX *= -1
			this.velocityY *= -1
		}else if(elt instanceof Ship){
			elt.explode();
		}else {
			elt.remove();
			this.explode();
		}
	}
};

Asteroid.prototype.hittingElements = function(){
	var aResult = [];
	// Detect collision
	var elements = this.scene.getElements();
	for(var i = 0, length = elements.length; i < length; i++){
		var element = elements[i];
		if(!element){
			continue;
		}

		if(element.id == this.id){
			continue;
		}

		if(this.hit(element)){
			if(this.lastHitElements[element.id] == undefined){
				this.lastHitElements[element.id] = element.id;

				aResult.push(element);
			}
		}else{
			delete this.lastHitElements[element.id];
		}
	}

	return aResult;
};

Asteroid.prototype.getHitBox = function(){
	return {
		x: this.x - (this.width / 2) - 10,
		y: this.y - (this.width / 2) - 10,
		width: this.width * 2,
		height: this.height * 2
	}
}

Asteroid.prototype.explode = function(){
	if(!this.isTouchable){
		return;
	}

	this.boomSound.play();

	this.remove();

	if(this.level == 1){
		return;
	}

	var child;

	for(var i = 0; i < this.level; i++){
		child = new Asteroid(this.paper, this.scene);
		child.level = this.level - 1;
		child.x = this.x;
		child.y = this.y;
		child.init();
		this.scene.addElement(child);
	}
};