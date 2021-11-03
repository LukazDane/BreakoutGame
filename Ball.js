/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x, y, dx, dy, colour = '#0095DD') {
    super(x, y, 0, 0, colour);
    this.radius = 10;
    this.x = 0;
    this.y = 0;
    this.dx = 2;
    this.dy = -2;
    this.colour = colour;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.closePath();
  }
}
export default Ball;
