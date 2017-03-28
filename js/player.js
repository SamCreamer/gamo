// player js
// sam creamer 2017
// gamo

var Player = function() {
	var self = GameObject('player', canvas.height / 2, canvas.width / 2, 0, 0, 5);
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;

	var superUpdate = self.update();
	self.update = function() {
		
		superUpdate(); // just updates position for now

	};
}