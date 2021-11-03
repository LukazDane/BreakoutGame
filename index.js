/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import Ball from './Ball.js';
import Brick from './Brick.js';
import Bricks from './Bricks.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';
import Game from './Game.js';
// import Lives from './Lives.js';
// import Paddle from './Paddle.js';
// import Score from './Score.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// const ballRadius = 10;
// const paddleHeight = 10;
// const paddleWidth = 75;
// const brickRowCount = 9;
// const brickColumnCount = 4;
// const brickWidth = 75 / 2;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// const paddleXStart = (canvas.width - paddleWidth) / 2;
// const paddleYStart = canvas.height - paddleHeight;
// const PI2 = Math.PI * 2;
// const baseColour = '#0095DD';
// const gameOverMessage = 'Game Over';
const game = new Game();

game.draw();
