// gamo
// rema, 2016

// main game methods
function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
    drawAndUpdateEnemies();
    // todo: drawUI();
    // todo: detectCollision();

    createEnemy(); // decides whether to create an enemy or not
    updateBall();

    // game loop test
    if (!gamePaused && !gameOver) {
        window.requestAnimationFrame(gameLoop);
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
}

function createEnemy() {
    var randomRoll = getRandomInt(0, enemyCreateRate + 1); // random number between 0 (inclusive) and enemyCreateRate + 1 (exclusive)
    if (randomRoll == enemyCreateRate) // once in every enemycreateRate frames
    {
        // we have to select where the enemy spawns. it has to spawn just outside the playing area. it will either spawn next to the top (0), right (1), bottom (2), or left (3) walls
        var spawnRoll = getRandomInt(0, 4);
        switch (spawnRoll) {
            case 0: // spawn on the top wall
                enemyInitX   = getRandomInt(0, canvas.width);
                enemyInitY   = -40;
                enemyInitDx  = getRandomInt(0, 11) - 5;
                enemyInitDy  = enemySpeed; // get random int between -5 and 5
                break;
            case 1: // right
                enemyInitX   = canvas.width + 40;
                enemyInitY   = getRandomInt(0, canvas.height);
                enemyInitDx  = enemySpeed;
                enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
                break;
            case 2: // bottom
                enemyInitX   = getRandomInt(0, canvas.width);
                enemyInitY   = canvas.height + 40;
                enemyInitDx  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed;
                enemyInitDy  = -enemySpeed; // get random int between -5 and 5
                break;
            case 3: // left
                enemyInitX   = -40;
                enemyInitY   = getRandomInt(0, canvas.height);
                enemyInitDx  = enemySpeed;
                enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
                break;
            default: // default will spawn on left wall
                console.log("something went wrong with createEnemies()");
                enemyInitX   = -40;
                enemyInitY   = getRandomInt(0, canvas.height);
                enemyInitDx  = enemySpeed;
                enemyInitDy  = getRandomInt(0, (enemySpeed * 2) + 1) - enemySpeed; // get random int between -5 and 5
                break;
        }
        var e = new Enemy(enemyInitX, enemyInitY, enemyInitDx, enemyInitDy);
        enemyArray.push(e);
        enemyCounter++;
        if (enemyCounter % 20 == 0 && enemyCounter > 0) {
            console.log("level up");
            level       += 1;
            enemyRadius += 5;
            enemySpeed  += 2;
        }
    }
}

function drawAndUpdateEnemies() { // we do the enemies in one function so we only loop once
    var e = null;
    for (i = 0; i < enemyArray.length; i++) {
        e = enemyArray[i];
        // draw
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI*2);
        ctx.fillStyle = "#f00";
        ctx.fill();
        ctx.closePath();
        //detech collision
        if (detectCircleCollision(e.x, e.y, e.radius, ballX, ballY, ballRadius)) {
            console.log("HIT");
        }
        // update
        e.x += e.dx;
        e.y += e.dy;
        if (e.x < -enemyRadius * 2 || e.x > canvas.width + (enemyRadius * 2) || e.y < -enemyRadius * 2 || e.y > canvas.height + (enemyRadius * 2)) { // enemy is done
            enemyArray.splice(i, 1);
        }
    }
}

// player methods
function drawBall() {
	ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#445566";
    ctx.fill();
    ctx.closePath();
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
    // TODO lol
    return;
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

//setInterval(gameLoop, frameRate);
gameLoop();
