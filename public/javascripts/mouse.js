window.onload = function(){
	var mouse = new Mouse();

	// Hide the address bar
	document.getElementsByTagName('body')[0].setAttribute('style', 'height: '+(window.innerHeight+46)+'px');
	setTimeout(function(){
		window.scrollTo(0, 1);
	}, 0);
};