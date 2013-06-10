var Missile = function(){
	// super
	this.__proto__.__proto__.constructor.apply(this, arguments);

	this.width = 10;
	this.height = 0;

	this.velocityX = 15;
	this.velocityY = 15;
};

Missile.prototype.__proto__ = SceneElement.prototype;

Missile.prototype.init = function(){
	this.element = this.paper.path(['M',0, 0,'L', this.width, 0, 'L']);
	this.element.attr('stroke', '#fff');

	this.missile = true;
};

Missile.prototype.draw = function(){
	this.__proto__.__proto__.draw.apply(this, arguments);
};