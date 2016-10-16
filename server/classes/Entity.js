class Entity {
  constructor() {
    this.x = 250;
    this.y = 250;
    this.speedX = 0;
    this.speedY = 0;
    this.id = null;
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    this.updatePosition();
  }

  xWithinBounds() {
    return (this.x >= 0 && this.x <= 500);
  }

  yWithinBounds() {
    return (this.y >= 0 && this.y <= 500);
  }

  isWithinBounds() {
    return (this.xWithinBounds() && this.yWithinBounds());
  }
}

module.exports = Entity;
