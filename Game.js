/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import Bricks from './Bricks.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import GameLabel from './GameLabel.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 9;
const brickColumnCount = 4;
const brickWidth = 75 / 2;
const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;
// const PI2 = Math.PI * 2;
const baseColour = '#0095DD';
const gameOverMessage = 'Game Over';

class Game {
  constructor() {
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.ball = new Ball(0, 0, 2, -2, 'red');
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight);

    this.scoreLabel = new GameLabel('Score: ', 8, 20);
    this.livesLabel = new GameLabel('Lives: ', canvas.width - 65, 20, baseColour, 3);

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();
    this.draw();
  }

  setup() {
    this.resetBAP();
    // additional broken stuff
    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);
    document.addEventListener('keyup', (e) => {
      this.keyUpHandler(e);
    }, false);
    document.addEventListener('mousemove', (e) => {
      this.mouseMoveHandler(e);
    }, false);
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

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWCAP() {
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;
        this.resetBAP();
      } if (this.livesLabel.value < 1) {
        alert(gameOverMessage);
        this.ball.x = 200;
        this.ball.y = 200;
        document.location.reload();
      } else {
        // this.resetBAP();
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (this.relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, paddleYStart);
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
    this.collisionDetection();
    this.ball.move();
    this.collisionWCAP();
    this.movePaddle();

    requestAnimationFrame(() => {
      this.draw(); // ****** broken
    });
  }
}
export default Game;
