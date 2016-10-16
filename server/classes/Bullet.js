const Entity = require('./Entity');

class Bullet extends Entity {
  constructor(x, y, angle) {
    console.log('New bullet created!');
    super();
    this.x = x;
    this.y = y;
    this.id = Math.random();
    this.speedX = Math.cos(angle/180*Math.PI)*10;
    this.speedY = Math.sin(angle/180*Math.PI)*10;
    this.timer = 0;
    this.toRemove = false;

    Bullet.list[this.id] = this;
  }

  update() {
    console.log(super.isWithinBounds());
    if (this.timer++ > 100 || !super.isWithinBounds()) {
      // this.toRemove = true;
      delete Bullet.list[this.id];
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
    console.log(bullet)
    movementData.push({
      x: bullet.x,
      y: bullet.y
    });
  }

  return movementData;
}

module.exports = Bullet;
