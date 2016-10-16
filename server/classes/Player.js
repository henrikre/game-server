const Entity = require('./Entity');
const Bullet = require('./Bullet');

class Player extends Entity {
  constructor(id) {
    super();
    this.id = id;
    this.isShooting = false;
    this.pressingRight = false;
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.maxSpeed = 10;
    this.onScreen = id.substr(-1);
    Player.list[id] = this;
    console.log(this);
  }

  update() {
    this.updateSpeed();
    super.update();
  }

  updateSpeed() {
    if (this.pressingRight) {
      this.speedX = this.maxSpeed;
    } else if (this.pressingLeft) {
      this.speedX = -this.maxSpeed;
    } else {
      this.speedX = 0;
    }

    if (this.pressingUp) {
      this.speedY = -this.maxSpeed;
    } else if (this.pressingDown) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    if (this.isShooting) {
      let bullet = new Bullet(this.x, this.y, Math.floor(Math.random()*360));
    }
  }
}

Player.list = {};

Player.onConnect = socket => {
  console.log('Player connected', socket.id);
  let player = new Player(socket.id);

  socket.on('keyPress', data => {
    player.pressingUp = data.up;
    player.pressingRight = data.right;
    player.pressingDown = data.down;
    player.pressingLeft = data.left;
  });

  socket.on('shoot', isShooting => {
    player.isShooting = isShooting;
  });
}

Player.onDisconnet = socket => {
  console.log('Player disconnected', socket.id);
  delete Player.list[socket.id];
}

Player.update = () => {
  var movementData = [];

  for (var i in Player.list) {
    var player = Player.list[i];
    player.update();

    if (player.x < 0) {
        player.x = 0;
      }

    if (player.x > 500) {
      player.x = 500;
    }

    if (player.y < 0) {
        player.y = 0;
      }

    if (player.y > 500) {
      player.y = 500;
    }

    movementData.push({
      onScreen: player.id.substr(-1),
      x: player.x,
      y: player.y
    });
  }

  return movementData;
}

module.exports = Player;
