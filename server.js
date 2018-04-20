var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendfile('game.html');
});

var clientsCount = 0;
var players = {};
io.on('connection', function(socket){
    var id=0;
    clientsCount++;
    console.log(clientsCount + ' clients connected!');

    socket.on('player connect', function(play){
      id=play.id;
      io.emit('player connect', play);
    });

    socket.on('disconnect', function(){
        clientsCount--;
        console.log(clientsCount + ' clients connected!');
        io.emit('player disconnect', id);
    });

    socket.on('shared data', function(data){
      io.emit('shared data', data);
    });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});
