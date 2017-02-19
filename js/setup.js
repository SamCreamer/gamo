// gamo setup
// october 2016, sam creamer

// canvas setup
var canvas 		= document.getElementById("gamoCanvas");
var ctx			= canvas.getContext("2d");
canvas.height 	= window.innerHeight;
canvas.width  	= window.innerWidth;

// misc setup
var rightPressed    = false;
var leftPressed     = false;
var upPressed       = false;
var downPressed     = false;
var desiredFPS      = 100;
var frameRate       = 1000 / desiredFPS; // 100 fps, not currently being used

// game setup
var gameOver	= false;
var gamePaused 	= false;
var score   	= 0;
var level   	= 1;

// ball character vars
var ballRadius  = 10;
var ballSpeed   = 5;
var ballDx      = 0;
var ballDy      = 0;
var ballX       = canvas.width / 2;
var ballY       = canvas.height / 2;

// enemy character setup and array
var enemyRadius     = 20;
var enemySpeed      = 3;
var enemyInitX      = 0;
var enemyInitY      = 0;
var enemyInitDx     = 0;
var enemyInitDy     = 0;
var enemyCreateRate = 50; // enemy created every (this) frames on average
var enemyArray      = [];
var enemyCounter    = 0; // will be used to time the game and score the game