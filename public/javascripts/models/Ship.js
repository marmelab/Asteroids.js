var Ship = function(){
	// super
	this.__proto__.__proto__.constructor.apply(this, arguments);

	this.height = 20;
	this.width  = 50;
	this.friction = 0.4;
	this.teleport = true;

	this.isAlive = true;

	this.explosionSound = new Audio("/sounds/ship-explosion.mp3");
};

Ship.prototype.__proto__ = SceneElement.prototype;

Ship.prototype.init = function(){
	this.x = this.paper.width / 2;
	this.y = this.paper.height / 2;

	this.element = this.paper.path(['M',0, 0,'L', this.width, this.height / 2, 'L', 0, this.height, 'L', this.width / 5, this.height / 2, 'Z']);
	this.element.attr('stroke', '#fff');
};

Ship.prototype.explode = function(){
	this.isAlive = false;
	this.element.animate({opacity: 0}, 1000, 'easeIn');

	this.explosionSound.play();

	this.remove();
}

Ship.prototype.draw = function(){
	this.__proto__.__proto__.draw.apply(this, arguments);
};

Ship.prototype.getHitBox = function(){
	return this.element.getBBox();
};

Ship.prototype.pewpew = function(){
	if(!this.isAlive){
		return;
	}
	var missile = new Missile(this.paper, this.scene);
	missile.angle = this.angle;
	missile.x = this.x + this.width / 2 /*Math.cos(this.angle*Math.PI/180)*(this.width)*/;
	missile.y = this.y + this.height / 2/*Math.sin(this.angle*Math.PI/180)*(this.width)*/;
	missile.init();

	this.scene.addElement(missile);
}