// Entities for gamo
// Rema Games

GameObject.list = [];

var GameObject = function(type, x, y, dx, dy, max_speed) {
	var self = {
		type : type,
		id   : Math.random(),
		x 	 : x,
		y	 : y,
		dx 	 : x,
		dy   : y,
		max_speed: max_speed
	}
	self.update = function() {
		self.updatePosition();
	}
	self.updatePosition = function() {
		self.x += dx;
		self.y += dy;
	}
}

