const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const {isRealString}  = require('./utils/validation');
const {Players}  = require('./utils/players');
const {Game}  = require('./game');


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

  socket.on('createMessage', (message, callback) => {
    console.log("message received at sderver")
    var player = players.getPlayer(socket.id);
    if(player && isRealString(message.text)) {
      io.emit('newMessage', generateMessage(player.name, player.playerColor, message.text));
    }

    callback();
  });

//   socket.on('createLocationMessage', (coords) => {
//     var user = users.getUser(socket.id);
//     if(user) {
//       io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name} is at `, coords.latitude, coords.longitude));
//     }

//   });

  socket.on('playerReady',(player, callback)=> {
    var currentPlayer = players.getPlayer(player.id);
    var readyPlayers = players.players.filter((player)=> player.ready === true);
    console.log(readyPlayers);
    currentPlayer.ready = true;
    console.log()
    io.emit('updatePlayerList', players.getPlayerList());

    callback();
  })


  socket.on('startGame', (numPlayers)=>{
    game = new Game(numPlayers);
    game.init();
    io.emit('startClientGame', game);
    setTimeout(nextRound,500);
  })

  socket.on("checkMouseClick", (playerNumber)=>{

    if(typeof game != 'undefined') {
      if(playerNumber === game.sequence[game.checkAnswerCounter]) {
        game.checkAnswerCounter  = game.checkAnswerCounter + 1;
        game.rightAnswers  = game.rightAnswers +1;
        if (game.rightAnswers === game.sequence.length) {
            io.emit("wonRound");
        }

      }
      else {
        io.emit("wrongAnswer");
      }

    }





  })


   socket.on('playPattern', (numPlayers)=>{
    game.numPlayers = numPlayers
    setTimeout(nextPattern,500);
  }) 

  // socket.on('updateGame')

  function nextPattern(){

    console.log(game.sequence);
    game.nextPattern(8);
    // game.sequence = [0,1,1,0,1,1,1,0,0];
    console.log(game.sequence);
    io.emit('trigClientRound', game);

  }


  function nextRound(){
    console.log(game.sequence);
    game.nextRound();
    game.sequence = [0,1,1,0,1,1,1,0,0];
    console.log(game.sequence);
    io.emit('trigClientRound', game);
  }


  socket.on('disconnect', () => {
    var player = players.removePlayer(socket.id);

    console.log(player.name+" left the game");

    if(player.admin){
      noAdminYet = true; 
      }

    if(player) {
      io.emit('updatePlayerList', players.getPlayerList());
    //   io.emit('newMessage', generateMessage('admin', `${user.name} has left the room`));
    }

  });
});
