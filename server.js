var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

var idBase = 0;
var seedBase = Math.random();
var seed = seedBase;
var players = [];
var coins = [];
var sid = 0;

//simu map
var spawnP = [];
var numberPolyY = 40;
var numberPolyX = 40;
var polyPosX = 0;
var polyPosY = 100;
var polySize = 70;
for (var i = 0; i < numberPolyY; i++) {
  for (var j = 0; j < numberPolyX; j++) {
    var filled;
    if (i == 0 || j == 0 || i == numberPolyY - 1 || j == numberPolyX - 1) filled = true;
    else filled = Math.floor(random() * 6) == 0;

    if (!filled) {
      sid++;
      if (j % 2 == 0) spawnP.push({ id: sid, x: polyPosX, y: polyPosY - 60 });
      else spawnP.push({ id: sid, x: polyPosX, y: polyPosY });
    }
    polyPosX += 105;
  }
  polyPosX = 0;
  polyPosY += 120;
}
setInterval(update, 1000);
function update() {
  if (spawnP.length > 0 && coins.length < Math.sqrt(players.length) * 25) {
    for (var i = 0; i < players.length; i++)if (Math.random() <= 0.24) {
      var sp = Math.floor((spawnP.length * Math.random()) % spawnP.length);
      coins.push({ id: spawnP[sp].id, x: spawnP[sp].x, y: spawnP[sp].y, value: 10 });
      io.emit('spawn coin', { id: spawnP[sp].id, x: spawnP[sp].x, y: spawnP[sp].y, value: 10 });
      spawnP.splice(sp, 1);
    }
  }
}
setInterval(update2, 17);
function update2() {
  if (players.length == 0) return;
  for (var i = 0; i < coins.length; i++) {
    if (coins[i].value < 150)
      coins[i].value += (150 - coins[i].value) / 10000;
  }
}
var Sid={};
io.on('connection', function (socket) {
  var id = 0, name = '';
  idBase++;
  Sid[idBase]=socket;
  socket.emit('user id', { id: idBase, seed: seedBase });
  socket.on('player connect', function (play) {
    socket.emit('load game', { player: players });
    socket.emit('load coin', coins);

    if (players.length > 0)io.emit('request bullet', idBase);

    id = play.id;
    name = play.name;
    players.push(play);
    io.emit('player connect', play);
    console.log(name + " has Connected(total:" + players.length + ")");
  });

  socket.on('disconnect', function () {
    for (var i = 0; i < players.length; i++)if (players[i].id == id) players.splice(i, 1);
    console.log(name + " has Disconnected(total:" + players.length + ")");

    io.emit('player disconnect', id);
  });

  socket.on('player data', function (player) {
    io.emit('player data', player);
  });
  socket.on('load bullet', function (bulls) {
    Sid[bulls.rid].emit('-load bullet', bulls);
  });
  socket.on('spawn bullet', function (bull) {
    io.emit('spawn bullet', bull);
  });

  socket.on('hit bullet', function (bull) {
    io.emit('hit bullet', bull);
  });
  socket.on('pass score', function (data) {
    io.emit('pass score', data);
  });
  socket.on('get coin', function (con) {
    for (var i = 0; i < coins.length; i++)if (coins[i].id == con.cId) {
      io.emit('get coin', { pId: con.pId, cId: con.cId, exp: Math.floor(coins[i].value) });
      sid++;
      spawnP.push({ id: sid, x: coins[i].x, y: coins[i].y });
      coins.splice(i, 1);
      break;
    }
  });
});

http.listen(3030, function () {
  console.log('listening on *:3030');
});


function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
