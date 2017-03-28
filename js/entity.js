// Entities for gamo
// Rema Games

var Entity = function(type, id, x, y, width, height, dx, dy) {
	var self = {
		type : type,
		id   : id,
		x 	 : x,
		y	 : y,
		width: width,
		height:height,
		dx 	 : x,
		dy   : y
	}
	self.update = function() {
		self.updatePosition();
		self.draw();
	}
	self.draw = function() { // default draw function. will be overwritten for every individual class most likely
		ctx.fillStyle = "#445566";
	    ctx.fillRect(self.x, self.y, self.width, self.height);	    
	}
	self.updatePosition = function() {
		self.x += dx;
		self.y += dy;
	}

}

