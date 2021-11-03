/* eslint-disable no-alert */
import Bricks from './Bricks';
import Ball from './Ball';
import Paddle from './Paddle';
import GameLabel from './GameLabel';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 9;
const brickColumnCount = 4;
const brickWidth = 75 / 2;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;
const PI2 = Math.PI * 2;
const baseColour = '#0095DD';
const gameOverMessage = 'Game Over';

class Game {
  constructor() {
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.ball = new Ball(0, 0, 2, -2, 'red');
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight);

    this.scoreLabel = new GameLabel('Score: ', 8, 20);
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20, 'blue', 3);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
  }

  setup() {
    this.resetBAP();
  }

  resetBAP() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          // eslint-disable-next-line max-len
          if (this.ball.x > brick.x && this.ball.x < brick.x + brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;

            this.scoreLabel.value += 1;

            if (this.scoreLabel.value === this.bricks.cols * this.bricks.rows
            ) {
              alert('YOU WIN, CONGRATS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }
}

export default Game;
