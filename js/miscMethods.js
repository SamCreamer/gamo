// misc methods
// Sam Creamer, 2017
// Rema Games

var calculateFPS = function() {
	var delta = (new Date().getTime() - lastRun) / 1000;
    lastRun = new Date().getTime();
    fps = 1 / delta;
    return fps;
}

var showFPS = function() {
	ctx.fillStyle 	= "Black";
	ctx.font		= "11px Arial";
	ctx.fillText('FPS: ' + roundNumber(fpsShown, 0), canvas.width - 60, 20);
}

var fpsHandler = function() {
	// deals with FPS
    fps = calculateFPS();
    if (frameCounter == 60 || frameCounter == 0) {
        fpsShown = fps;
        frameCounter = 1; // so it doesn't trigger 0 each time
    }

    if (show_fps)
        showFPS();
    
    frameCounter++;
    // end FPS handling
}

var roundNumber = function(n, d) {
	// n is number, d is desired decimals
	return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
}
