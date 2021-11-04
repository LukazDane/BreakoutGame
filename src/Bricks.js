/* eslint-disable import/extensions */
import Brick from './Brick.js';

class Bricks {
  constructor(options) {
    const {
      cols, rows, width, height, padding, offSetLeft, offSetTop, colour,
    } = options;
    this.cols = cols;
    this.rows = rows;
    this.bricks = [];
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offSetLeft = offSetLeft;
    this.offSetTop = offSetTop;
    this.colour = colour;

    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = (r * (this.width + this.padding)) + this.offSetLeft;
        const brickY = (c * (this.height + this.padding)) + this.offSetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.colour);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}
export default Bricks;
