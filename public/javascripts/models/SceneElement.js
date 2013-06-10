var SceneElement = function(paper, scene){
	this.paper = paper;
	this.scene = scene;
	this.id = null;

	this.x = 0;
	this.y = 0;
	this.angle = 10;
	this.friction = 0;

	this.velocityX = 0;
	this.velocityY = 0;
	this.angleDelta = 0;

	this.teleport = false;


	this.rect = null;
};

SceneElement.prototype.__proto__ = Element.prototype;

SceneElement.prototype.draw = function(){
	if(!this.element){
		return;
	}

	this.x += Math.cos(this.angle*Math.PI/180) * this.velocityX;
	this.y += Math.sin(this.angle*Math.PI/180) * this.velocityY;
	this.angle += this.angleDelta;


	this.element.transform(['T', this.x, this.y, 'R', this.angle, this.x + this.width / 2, this.y + this.height / 2]);

	if(this.velocityX != 0){

		var methodX = this.velocityX > 0 ? 'max' : 'min';
		var signX = this.velocityX > 0 ? -1 : 1;


		this.velocityX = Math[methodX](0, this.velocityX + (this.friction * signX));
	}

	if(this.velocityY != 0){
		var methodY = this.velocityY > 0 ? 'max' : 'min';
		var signY = this.velocityY > 0 ? -1 : 1;

		this.velocityY = Math[methodY](0, this.velocityY + (this.friction * signY));
	}


	// Check bound
	if(!this.teleport && (this.x < 0 || this.x > this.paper.with || this.y < 0 || this.y > this.paper.height)){
		this.remove();
	}else if(this.teleport){
		if(this.x < 0){
			this.x = this.paper.width;
		}

		if(this.x > this.paper.width){
			this.x = 0;
		}

		if(this.y < 0){
			this.y = this.paper.height;
		}

		if(this.y > this.paper.height){
			this.y = 0;
		}
	}

	// Detect box
	if(this.rect){
		this.rect.remove();
	}
};

SceneElement.prototype.hit = function(elt){

	var thisBox = this.getHitBox();
	var eltBox = elt.getHitBox();


	return thisBox.x <= eltBox.width + eltBox.x
		&& eltBox.x <= thisBox.width + thisBox.x
		&& thisBox.y <= eltBox.height + eltBox.y
		&& eltBox.y <= thisBox.height + thisBox.y;
}

SceneElement.prototype.getHitBox = function(){
	return {
		x: this.x - (this.width / 2),
		y: this.y - (this.width / 2),
		width: this.width * 2,
		height: this.height * 2
	}
}

SceneElement.prototype.remove = function(){
	this.element.remove();

	this.scene.removeElement(this);
}

SceneElement.prototype.rotate = function(value){
	this.angle = value;
};

SceneElement.prototype.accelerateX = function(dx){
	this.velocityX += dx;
};

SceneElement.prototype.accelerateY = function(dy){
	this.velocityY += dy;
};