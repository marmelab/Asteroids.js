exports.mouse = function(req, res){
	var stylesheets = ['mouse.css'];
	var javascripts = [
		'/socket.io/socket.io.js',
		'/javascripts/libs/hammer.min.js',
		'/javascripts/constants.js',
		'/javascripts/models/Mouse.js',
		'/javascripts/mouse.js'
	];

  res.render('mouse', { title: 'Mouse', stylesheets: stylesheets, javascripts: javascripts });
};

exports.display = function(req, res){
	var stylesheets = ['display.css'];
	var javascripts = [
		'/socket.io/socket.io.js',
		'/javascripts/libs/raphael-min.js',
		'/javascripts/constants.js',
		'/javascripts/display.js',
		'/javascripts/models/Scene.js',
		'/javascripts/models/SceneElement.js',
		'/javascripts/models/Missile.js',
		'/javascripts/models/Ship.js',
		'/javascripts/models/Asteroid.js'
	];

	res.render('display', { title: 'Asteroids', stylesheets: stylesheets, javascripts: javascripts });
};