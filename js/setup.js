// gamo setup
// october 2016, sam creamer

// canvas setup
var canvas 		= document.getElementById("gameCanvas");
var ctx			= canvas.getContext("2d");
canvas.height 	= window.innerHeight;
canvas.width  	= window.innerWidth;

const playerSprite = new Image();
playerSprite.src = 'assets/sprites/player.png';

const enemySprite = new Image();
enemySprite.src = 'assets/sprites/duck_yellow.png';

console.log(playerSprite);

var setup = function(mode) {
	// I guess these will be global variables. obviously this is not the best way to do this, but for such a small game I think its okay
	// misc setup
	rightPressed    = false;
	leftPressed     = false;
	upPressed       = false;
	downPressed     = false;
	lastRun			= false;
	fps 			= 0.0;
	fpsShown 		= 0.0;
	frameCounter    = 0;

	// game setup
	gameOver	= false;
	gamePaused 	= false;
	show_fps	= true;
	score   	= 0;

	// ball character vars
	ballRadius  = 10;
	ballSpeed   = 5;
	ballDx      = 0;
	ballDy      = 0;
	ballX       = canvas.width / 2;
	ballY       = canvas.height / 2;

	switch (mode) {
		case 'e':
			enemyCreateRate = 30;
			break;
		case 'm':
			enemyCreateRate = 15;
			break;
		case 'h':
			enemyCreateRate = 8;
			break;
		case 'i':
			enemyCreateRate = 1;
			break;
		default:
			enemyCreateRate = 30;
			break;
	}

	// enemy character setup and array
	enemyRadius     = 15;
	enemySpeed      = 3;
	enemyInitX      = 0;
	enemyInitY      = 0;
	enemyInitDx     = 0;
	enemyInitDy     = 0;
	// enemyCreateRate = 2; // enemy created every (this) frames on average
	enemyArray      = [];
	enemyCounter    = 0; // will be used to time the game and score the game

}

var newGame = function() {
	setup('m');
	document.getElementById('preGame').style.display = 'none';
	document.getElementById('gameCanvas').style.display = 'block';
	document.getElementById('gameOver').style.display = 'none';
}

//button listener for new game
document.getElementById('restart-game-btn').addEventListener('click', function() {
	newGame();
	gameLoop();
});

document.getElementById('playBtn').addEventListener('click', function() {
	newGame();
	gameLoop();
});
