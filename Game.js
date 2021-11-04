/* eslint-disable import/extensions */
/* eslint-disable no-alert */
import Bricks from './Bricks.js';
import Ball from './Ball.js';
import Sprite from './Sprite.js';
import GameLabel from './GameLabel.js';

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    // ---------------------------------------------------- //
    this.ballRadius = 10;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 9;
    this.brickColumnCount = 4;
    this.brickHeight = 20;
    this.brickWidth = 37.5;
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;
    this.PI2 = Math.PI * 2;
    this.baseColour = ('#0095DD');
    this.gameOverMessage = 'Game Over';
    // ---------------------------------------------------- //
    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: 37.5,
      height: 20,
      padding: 10,
      offSetLeft: 30,
      offSetTop: 30,
      colour: this.baseColour,
    });
    this.ball = new Ball(0, 0, 2, -2, '0095DD');
    this.paddle = new Sprite(this.paddleXStart, this.paddleYStart, this.paddleWidth,
      this.paddleHeight);

    this.scoreLabel = new GameLabel('Score: ', 8, 20);
    this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20, this.baseColour, 3);

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
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          // eslint-disable-next-line max-len
          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {
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
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionWCAP() {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;
        this.resetBAP();
      } if (this.livesLabel.value < 1) {
        alert(this.gameOverMessage);
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
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (this.relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    this.collisionDetection();
    this.collisionWCAP();
    this.ball.move();
    this.movePaddle();

    requestAnimationFrame(() => {
      this.draw(); // ****** broken
    });
  }
}
export default Game;
