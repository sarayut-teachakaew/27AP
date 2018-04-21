var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var idBase = 0;
var players = [];
io.on('connection', function(socket){
    var id=0;
    idBase++;
    socket.emit('user id',idBase);

    socket.on('player connect', function(play){
      //console.log("sending");
      //console.log(players);
      socket.emit('load game',{player:players});
      id=play.id;
      players.push(play);
      io.emit('player connect', play);
      console.log("Total Player :"+players.length);
    });

    socket.on('disconnect', function(){
        console.log("Total Player :"+players.length);

        for(var i=0;i<players.length;i++)if(players[i].id==id)players.splice(i, 1);

        io.emit('player disconnect', id);
    });

    socket.on('shared data', function(data){
      io.emit('shared data', data);
    });
});

http.listen(3030, function(){
  console.log('listening on *:3030');
});
