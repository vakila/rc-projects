var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('CONNECT', socket.id);
  socket.on('log on', function(name){
    console.log('LOG ON', name);
    io.emit('log on', name);
  })
  socket.on('log off', function(name) {
    console.log('LOG OFF', name);
    socket.broadcast.emit('log off', name);
  })
  socket.on('disconnect', function(){
    console.log('DISCONNECT', socket.id);
  });
  socket.on('chat message', function(msg){
    console.log('MESSAGE', msg.username, msg.message);
    socket.broadcast.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
