// keyboard handler

function keyDownHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        player.pressingRight = true;
    } else if (e.keyCode == 37 || e.keyCode == 65) {
        player.pressingLeft = true;
    } else if (e.keyCode == 87 || e.keyCode == 38) {
        player.pressingUp = true;
    } else if (e.keyCode == 83 || e.keyCode == 40) {
        player.pressingDown = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        player.pressingRight = false;
    } else if (e.keyCode == 37 || e.keyCode == 65) {
        player.pressingLeft = false;
    } else if (e.keyCode == 87 || e.keyCode == 38) {
        player.pressingUp = false;
    } else if (e.keyCode == 83 || e.keyCode == 40) {
        player.pressingDown = false;
    }
}

// listener for arrows
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);