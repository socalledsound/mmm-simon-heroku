const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const {isRealString}  = require('./utils/validation');
const {Players}  = require('./utils/players');
const {Game}  = require('./game/game-class');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var players = new Players();
var numPlayers = 0;
var adminName = 'polly';
var noAdminYet = true;

var game;


app.use(express.static(publicPath));


server.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });


io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (player, callback)=> {

    if(!isRealString(player.name) ) {
      callback('name is required');
    }
    console.log(player.name);
    var playerExists = players.playerExists(player.name);
    console.log("exists:"+ playerExists);
    if(playerExists) {
      callback('that name is already taken');
    }
    else {
      socket.join();

      players.removePlayer(socket.id);


      if (player.name === adminName  && noAdminYet) {
        player.admin = true;
        socket.emit('adminSetup');
        noAdminYet = false;
      }
      else {
        player.admin = false;
      }

      console.log(player.name + " joined");
      console.log(player.admin);
      players.addPlayer(player);
      //numPlayers=numPlayers+1;


      //console.log(players.getPlayerList());
      //get user list and emit it to all clients



      // if(players.getPlayerReadyList() != null) {
      //   io.emit('updatePlayerReadyList', players.getPlayerReadyList());
      // }


      io.emit('updatePlayerList', players.getPlayerList());

        console.log(players);
      // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

      callback();
    }

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

  socket.on('playerReady',(player, callback)=> {
    var currentPlayer = players.getPlayer(player.id);
    currentPlayer.ready = true;
    io.emit('updatePlayerList', players.getPlayerList());

    callback();
  })


  socket.on('startGame', ()=>{
    game = new Game(2);
    game.init();
    io.emit('startClientGame', game);
  })


  socket.on('disconnect', () => {
    console.log(players);
    var player = players.removePlayer(socket.id);
    console.log(player);
    if(player.admin){
      noAdminYet = true;
      }
      console.log(noAdminYet);
    if(player) {
      io.emit('updatePlayerList', players.getPlayerList());
    //   io.emit('newMessage', generateMessage('admin', `${user.name} has left the room`));
    }

  });
});
