// main javascript for gamo
// written by Sam Creamer, March 2017
// Rema Games

var last_run; // for calculating fps
var delta;
var fps;
var fps_shown; // to make it look smoother, we only update this every 100 frames, even though fps gets updated every frame
var frameCount = 0; // used to slow things down, mostly fps reporting

// game loop
var gameLoop = function() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// first run
	if (!last_run) {
		last_run = new Date().getTime();
		requestAnimationFrame(gameLoop);
		return;
	}

	for (var i in Entity.list)
		GameObject.list[i].update();

	// calculate fps
	fps = calculateFPS();
	if (show_fps) {
		showFPS();		
	} 
		
    // request new frame
    if (!game_paused && !game_over) {
        window.requestAnimationFrame(gameLoop);
        frameCount++;
    } 
}

var calculateFPS = function() {
	delta = (new Date().getTime() - last_run) / 1000.0;
	last_run = new Date().getTime();
	fps = 1 / delta;
	if (frameCount == 50 || frameCount == 0) {
		fps_shown = fps;	
		frameCount = 1;
	}
	return fps;
}

gameLoop();