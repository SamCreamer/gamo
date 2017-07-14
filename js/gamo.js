// gamo
// rema, 2016

// main game methods
function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    // first frame. needed for calculating fps

    if (!lastRun) {
        lastRun = new Date().getTime();
        requestAnimationFrame(gameLoop);
        return;
    }

	drawBall();
    drawAndUpdateEnemies();
    drawUI();
    // todo: detectCollision();

    fpsHandler();

    var randomRoll = getRandomInt(0, enemyCreateRate + 1);
    if (randomRoll == enemyCreateRate)
        createEnemy(); // decides whether to create an enemy or not

    updateBall();

    // game loop test
    if (!gameOver) {
        window.requestAnimationFrame(gameLoop);
    } else {
        // game over
        document.addEventListener("keydown", newGameKeyDownHandler, false);
        document.getElementById('finalScore').innerHTML = score;
        document.getElementById('gameCanvas').style.display = "none";
        document.getElementById('gameOver').style.display = "block";
    }
}

// enemy methods
function Enemy(initX, initY, initDx, initDy) {
    // attributes
    this.radius = enemyRadius;
    this.speed  = enemySpeed;
    this.x      = initX;
    this.y      = initY;
    this.dx     = initDx;
    this.dy     = initDy;
    this.frames = 0; // number of frames that this enemy has been alive
}

function createEnemy() {

    // we have to select where the enemy spawns. it has to spawn just outside the playing area. it will either spawn next to the top (0), right (1), bottom (2), or left (3) walls
    var spawnRoll = getRandomInt(0, 4);
    switch (spawnRoll) {
        case 0: // spawn on the top wall
            enemyInitX   = getRandomInt(0, canvas.width);
            enemyInitY   = -100;
            enemyInitDx  = getRandomInt(0, 11) - 5;
            enemyInitDy  = enemySpeed; // get random int between -5 and 5
            break;
        case 1: // right
            enemyInitX   = canvas.width + 100;
            enemyInitY   = getRandomInt(0, canvas.height);
            enemyInitDx  = enemySpeed;
            enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
            break;
        case 2: // bottom
            enemyInitX   = getRandomInt(0, canvas.width);
            enemyInitY   = canvas.height + 100;
            enemyInitDx  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed;
            enemyInitDy  = -enemySpeed; // get random int between -5 and 5
            break;
        case 3: // left
            enemyInitX   = -100;
            enemyInitY   = getRandomInt(0, canvas.height);
            enemyInitDx  = enemySpeed;
            enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
            break;
        default: // default will spawn on left wall
            console.log("something went wrong with createEnemies()");
            enemyInitX   = -100;
            enemyInitY   = getRandomInt(0, canvas.height);
            enemyInitDx  = enemySpeed;
            enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
            break;
        }

        var e = new Enemy(enemyInitX, enemyInitY, enemyInitDx, enemyInitDy);
        enemyArray.push(e);
        enemyCounter++;
        // eventually make enemies harder
        if (enemyCounter % 35 == 0 && enemyCounter > 0) {
            enemyRadius = enemyRadius < 40 ? enemyRadius + 5 : enemyRadius;
            enemySpeed  = enemySpeed < 15 ? enemySpeed + 2 : enemySpeed;
        }
}


function drawAndUpdateEnemies() { // we do the enemies in one function so we only loop once
    var e = null;
    for (i = 0; i < enemyArray.length; i++) {
        e = enemyArray[i];
        // draw
				ctx.drawImage(enemySprite, e.x, e.y);
        //detech collision
        if (detectCircleCollision(e.x, e.y, e.radius, ballX, ballY, ballRadius)) {
            gameOver = true;
        }
        // update
        e.x += e.dx;
        e.y += e.dy;
        e.frames++;
        // check if its been alive for 100 frames. this just makes sure that it has been shown on the screen
        if (e.frames > 100 && (e.x < -enemyRadius * 2 || e.x > canvas.width + (enemyRadius * 2) || e.y < -enemyRadius * 2 || e.y > canvas.height + (enemyRadius * 2))) { // enemy is done
            enemyArray.splice(i, 1);
            score += enemyRadius * enemySpeed;
        }
    }
}

// player methods
function drawBall() {
		ctx.drawImage(playerSprite, ballX, ballY);
}

function updateBall() {
    // ball movement right & left
    if (rightPressed && (ballX + ballRadius < canvas.width)) {
        ballDx = ballSpeed;
    } else if (leftPressed && (ballX - ballRadius > 0)) {
        ballDx = -ballSpeed;
    } else {
        ballDx = 0;
    }

    // ball movement up and down
    if (upPressed && (ballY - ballRadius > 0)) {
        ballDy = -ballSpeed;
    } else if (downPressed && (ballY + ballRadius < canvas.height)) {
        ballDy = ballSpeed;
    } else {
        ballDy = 0;
    }

    ballX += ballDx;
    ballY += ballDy;
}

function drawScore() {
    ctx.font        = '24px PressStart2P';
    ctx.fillStyle   = '#000000';
    ctx.fillText('Score: ' + score, 20, 40);
}

function drawUI() {
    drawScore();
}

// input methods
function keyDownHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    } else if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    } else if (e.keyCode == 87 || e.keyCode == 38) {
        upPressed = true;
    } else if (e.keyCode == 83 || e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    } else if (e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    } else if (e.keyCode == 87 || e.keyCode == 38) {
        upPressed = false;
    } else if (e.keyCode == 83 || e.keyCode == 40) {
        downPressed = false;
    }
}

function newGameKeyDownHandler(e) {
    document.removeEventListener('keydown', newGameKeyDownHandler, false);
    if (e.keyCode == 13 || e.keyCode == 32) {
        newGame();
        gameLoop();
    }

}

// misc methods
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function detectCircleCollision (x1, y1, r1, x2, y2, r2) { // takes centers and radius x1, y1, r1, and x2, y2, r2, and returns if they are colliding
    return (Math.pow(x2 - x1, 2) + Math.pow(y1 - y2, 2) <= Math.pow(r1 + r2, 2));
}

// listener for arrows
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
