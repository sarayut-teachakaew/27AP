var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendfile('game.html');
});

var clientsCount = 0;
io.on('connection', function(socket){
    clientsCount++;
    console.log(clientsCount + ' clients connected!');

    socket.on('disconnect', function(){
        clientsCount--;
        console.log(clientsCount + ' clients connected!');
    });

    socket.on('shared data', function(data){
      io.emit('shared data', data);
    });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});
