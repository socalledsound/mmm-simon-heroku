const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const {isRealString}  = require('./utils/validation');
const {Players}  = require('./utils/players');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

 var players = new Players();
var adminName = 'polly';
app.use(express.static(publicPath));


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });
  

io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (params, callback)=> {
    
    if(!isRealString(params.name) ) {
      callback('name is required');
    }
    
    var playerExists = players.playerExists(params.name);
    console.log("exists:"+ playerExists);
    if(playerExists) {
      callback('that name is already taken');
    }

    socket.join();

    players.removePlayer(socket.id);

    
    if (params.name === adminName) {
      params['admin'] = true;
      socket.emit('adminSetup');
    }
    else {
      params['admin'] = false;
    }


    players.addPlayer(socket.id, params.name, params.color, params.admin);



    //get user list and emit it to all clients
    io.emit('updatePlayerList', players.getPlayerList());


    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

    callback();
  })

//   socket.on('createMessage', (message, callback) => {
//     var user = users.getUser(socket.id);
//     if(user && isRealString(message.text)) {
//       io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
//     }
    
//     callback();
//   });

//   socket.on('createLocationMessage', (coords) => {
//     var user = users.getUser(socket.id);
//     if(user) {
//       io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name} is at `, coords.latitude, coords.longitude));
//     }
    
//   });

  socket.on('disconnect', () => {
    var player = players.removePlayer(socket.id);
    if(player) {
      io.emit('updatePlayerList', players.getPlayerList());
    //   io.emit('newMessage', generateMessage('admin', `${user.name} has left the room`));
    }
  });
});
