const express = require('express');
const app = express();
const server = require('http').Server(app);
const Player = require('./server/classes/Player');
const Bullet = require('./server/classes/Bullet');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/', express.static(__dirname + '/client'));

server.listen(3000);

const io = require('socket.io')(server, {});
let sockets = {};

io.on('connection', socket => {
  sockets[socket.id] = socket;
  Player.onConnect(socket);

  socket.on('disconnect', () => {
    Player.onDisconnet(socket);
    delete sockets[socket.id];
  });
});

setInterval(() => {
  var movementData = {
    player: Player.update(),
    bullet: Bullet.update()
  };

  for (var i in sockets) {
    var socket = sockets[i];
    socket.emit('newPositions', movementData);
  }
}, 1000/25);
