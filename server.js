var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

var idBase = 0;
var players = [];
io.on('connection', function (socket) {
  var id = 0;
  idBase++;
  socket.emit('user id', idBase);

  socket.on('player connect', function (play) {
    //console.log("sending");
    //console.log(players);
    socket.emit('load game', { player: players });
    id = play.id;
    players.push(play);
    io.emit('player connect', play);
    console.log("Total Player :" + players.length);
  });

  socket.on('disconnect', function () {
    for (var i = 0; i < players.length; i++)if (players[i].id == id) players.splice(i, 1);
    console.log("Total Player :" + players.length);

    io.emit('player disconnect', id);
  });

  socket.on('player data', function (player) {
    io.emit('player data', player);
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
});

http.listen(3030, function () {
  console.log('listening on *:3030');
});
