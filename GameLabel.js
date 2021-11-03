class GameLabel {
  constructor(label, x, y, colour, value = 0, font = '16px Ariel') {
    this.label = label;
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.value = value;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.colour;
    ctx.fillText(`${this.label} ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
