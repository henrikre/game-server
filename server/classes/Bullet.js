const Entity = require('./Entity');

class Bullet extends Entity {
  constructor(angle) {
    super();
    this.id = Math.random();
    this.speedX = Math.cos(angle/180*Math.PI)*10;
    this.speedY = Math.sin(angle/180*Math.PI)*10;
    this.timer = 0;
    this.toRemove = false;

    Bullet.list[this.id] = this;
  }

  update() {
    if (this.timer++ > 100) {
      this.toRemove = true;
    }
    super.update();
  }
}

Bullet.list = {};

Bullet.update = () => {
  var movementData = [];

  for (var i in Bullet.list) {
    var bullet = Bullet.list[i];
    bullet.update();

    movementData.push({
      x: bullet.x,
      y: bullet.y
    });
  }

  return movementData;
}

module.exports = Bullet;
