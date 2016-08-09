const Entity = require('./Entity');

class Player extends Entity {
  constructor(id) {
    super();
    this.id = id;
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

    movementData.push({
      onScreen: player.id.substr(-1),
      x: player.x,
      y: player.y
    });
  }

  return movementData;
}

module.exports = Player;
