
var numPlayers = 0;
var thisPlayer;
var localPlayers = [];
var messages = [];
var arcs = [];
var colors = [];
var localGame;
var gameView;
var adminButtonsShown = false;

var osc, env;

// var scoreboard = document.getElementById('scoreboard');
var scoreboard;
var currentScore = 0;
var startButton, jamButton, adminButtons;
var readyButton;
var cnv;
var canvasBGcolor = 0;


var timerColor = [0,0,0];
var gamePaused = true;

var readyPlayers=0;


var socket = io();
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');


var startGameSound = new Howl({src: '/sounds/interfaceSounds/start-game.mp3'});
var wrongAnswerSound = new Howl({src: '/sounds/interfaceSounds/wrong-answer.mp3'});
var loseGameSound = new Howl({src: '/sounds/interfaceSounds/lose-game.mp3'});


console.log("numPlauers init: : "+numPlayers);


function setup() {

    cnv = createCanvas(300,300);
    cnv.parent('game');
 	background(canvasBGcolor);
	noStroke();
	initReadyButton();
	//initOscillator();
	welcomeMessage();

  colors.map((color,i) => {
  	colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
  	});


	initOscillator();


  // for(var i=0; i<numPlayers; i++) {
  //   // console.log("begin arcLegnth:"+arcLength);
  //   arcs[i] = new ArcButton(i,width/2,height/2, options.arcDiameter, radians(i*options.arcLength), radians(options.arcLength+(i*options.arcLength)), colors[i%4]);
  //    arcs[i].turnOff();
  // };

	//maybe start button does go back here actually, and then it triggers a 'loading' visual

}


function draw() {

	background(canvasBGcolor);

	if(typeof gameView != 'undefined') {
		gameView.show();
	}
	
	if(messages.length>0) {
		
		for(var i=0;i<messages.length;i++) {
			messages[i].update();
			messages[i].show();
			if(messages[i].isDead) {
				messages.splice(i,1);
			}
			
		}

		
		
	}


}





function welcomeMessage() {
	textSize(22);
	fill(200,0,0);
	// text("MY NAME IS SIMON.",350,100);
	text("PRESS THE BUTTON",20,120);
	text("TO JOIN THE GAME",20,220);
}



function mousePressed() {
	if(!gamePaused) {
		var clicked = inRect();
		if(clicked) {
			// var pos = getRad();
			// //var clickedArc = 10;
			// var clickedArc = gameView.arcs.filter((arc,i) => (pos > arc.start_arc && pos < arc.end_arc),this);
   //    console.log(clickedArc);
//			var player = clickedArc[0].id;
			trigPlayer(thisPlayer.playerNumber);
			socket.emit("checkMouseClick", thisPlayer.playerNumber);
		}
	}

}

function initReadyButton() {
	readyButton = $('<button>join</button>');
	readyButton.addClass('ready-button');
	$('#game').append(readyButton);	 
   $(readyButton).click(readyPlayer);

}





function readyPlayer() {
	background(canvasBGcolor);
	hideReadyButton();
    thisPlayer.ready = true;
  	gamePaused = false;
    
    if(thisPlayer.playerNumber === -1){
   	thisPlayer.playerNumber = readyPlayers;
   }


	gameView = new GameView(numPlayers, thisPlayer.playerNumber, thisPlayer.playerColor, currentScore); 
	gameView.init();
	// scoreboard = new Scoreboard(currentScore);
	// scoreboard.show();
    // localGame.memoryCounter = 0;

  console.log(thisPlayer);
  
  socket.emit("playerReady", thisPlayer, function() {
    console.log("player emit");
  })
	// player.init();

}


function showReadyButton () {
	readyButton.css({"display" : "inline-block"});
}

function hideReadyButton () {
	readyButton.css({"display" : "none"});
}




function initOscillator() {

	  	//env = new p5.Env(t1, l1, t2, l2, t3, l3);
	  	env = new p5.Env();
			env.setADSR(0.01,0.1,0.5,0.01)
			env.setRange(1.0,0);
	   	osc = new p5.Oscillator();
	  	osc.setType('sine');
	  	osc.freq(240);
	  	osc.amp(env);
	  	osc.start();
}





// function trigArc(player) {
// 	var currentArc = typeof player != 'undefined'? player : localGame.sequence[localGame.memoryCounter];
// 	// var currentArc = sequence[memoryCounter];
// 	// console.log(this);
// 	// console.log(player);
// 	// console.log(localGame.sequence[localGame.memoryCounter])
// 	// console.log(currentArc);
// 	// console.log(gameView.arcs[currentArc]);
// 	gameView.arcs[currentArc].turnOn();
// 	playSound(currentArc);
// 	localGame.memoryCounter++;
// 	if(localGame.memoryCounter == localGame.sequence.length) {

// 		clearInterval(thisRound);
// 		localGame.sequencePlaying = false;
// 		// setTimeout(nextRound, tempo);

// 		//setTimeout(awaitResponse, tempo);
// 	}
// }



function trigPlayer(playerNum) {
	var currentNum = typeof playerNum != 'undefined' ? playerNum : localGame.sequence[localGame.memoryCounter];
	// var currentArc = sequence[memoryCounter];
	// console.log(this);
	// console.log(player);
	// console.log(localGame.sequence[localGame.memoryCounter])
	// console.log(currentArc);
	// console.log(gameView.arcs[currentArc]);

	

	console.log("currentNum : "+ currentNum);
	console.log("playerNum : "+ thisPlayer.playerNumber);

	if (typeof gameView != 'undefined') {

		if(currentNum === thisPlayer.playerNumber) {
			gameView.playerButton.turnOn();
			playSound(currentNum);

		}

		

		localGame.memoryCounter++;
		if(localGame.memoryCounter == localGame.sequence.length) {

			clearInterval(thisRound);
			localGame.sequencePlaying = false;
			gamePaused = false;
			localGame.memoryCounter=0;
			// setTimeout(nextRound, tempo);

			//setTimeout(awaitResponse, tempo);
		}


	}
	else {
		playSound(currentNum);
	}



}


// trigArc = trigArc.bind(this);
 trigPlayer = trigPlayer.bind(this);



function playSound(index) {
	osc.freq(gameView.freqs[index]
		);
	env.play(osc);
}


function adminPageSetup() {
	console.log("adminpage setup numplayers: "+ numPlayers);
  startButton = $('<button>start game</button>');
  repeat = $('<button>repeat pattern</button>');
  adminButtons = [startButton, repeat];
  adminButtons.forEach((button)=> {
    button.css({ "background" : "#fff00"});
    button.css({ "margin-left" : "10px"});
    button.css({ "margin-top" : "10px"});
  });
  $('#admin').append(startButton);
  $('#admin').append(repeat);

  $(startButton).click(startGame);
  $(repeat).click(repeatPattern);

}


function startGame() {
  socket.emit('startGame');
}

function repeatPattern(){
	console.log('repeat pattern sketch');
	socket.emit('repeatPattern');
}

function playPattern(){
	socket.emit('playPattern',numPlayers);
}

function updateScoreboard() {
	gameView.scoreboard.increment();
}
//socket stuff

socket.on('connect', function () {
	console.log('Connected to server');

	var params = $.deparam(window.location.search);
	// params['color'] = '#'+Math.floor(Math.random()*16777215).toString(16);
  // params['ready'] = false;
	
  thisPlayer = new Player(socket.id,params.name);



	socket.emit('join', thisPlayer, function(err){
	  if(err) {
		  alert(err);
		  window.location.href='/';
	  }else {
		console.log('no error, login success');

	  }
	})

  });


socket.on('adminSetup', function(){
  if(!adminButtonsShown) {
  adminPageSetup();
  adminButtonsShown = true;
  }

})


  socket.on('updatePlayerList', function(players){
	var ul = $('<ul></ul>');

   localPlayers=players;
   readyPlayers = players.filter((player)=> player.ready === true).length; 
	numPlayers = readyPlayers;

	players.forEach((player)=> {
		console.log(player.playerColor);
    var li = $('<li></li>');
    var borderColor = player.ready ?  "10px solid #ffff00" : player.playerColor;
    li.css({ "background-color" : player.playerColor});
     li.css({ "background" : player.playerColor});
    li.css({ "color" : "#000" });
     li.css({ "border" : borderColor});
    ul.append(li.text(player.name));
	   })

	   $('#players').html(ul);
  })


  // socket.on('updatePlayerReadyList', function(players){
  //   var ul = $('<ul></ul>');
  //   console.log(players);
  //   players.forEach((player)=> {
  //     var li = $('<li></li>');
  //     li.css({ "background-color" : player.color});
  //     li.css({ "color" : "white" });
  //     li.css({ "border" : "10px solid #ffff00"});
  //     ul.append(li.text(player.name));
  //   })
  //   $('#players').html(ul);
  // })


socket.on('startClientGame', function(game){
	 
    startGameSound.play();
    // scoreboard.innerHTML = "round " + game.currentRound;
    localGame = game;
    // console.log(localGame.numPlayers);

});

socket.on('trigClientRound', function(game){
	gamePaused = true;
	console.log(game.sequence);
	localGame.sequence = game.sequence;
	console.log(localGame.sequence);
	// console.log(game.sequence);
	// console.log(localSequence);
	setTimeout(function() {
	 	thisRound = setInterval(trigPlayer, localGame.tempo);
	 },localGame.tempo);
})


socket.on("wrongAnswer", function(){
	loseGameSound.play();
})

socket.on("wonRound", function(){
	// wonRoundSound.play();
	updateScoreboard();
})

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
  
	var messageTextbox = jQuery('[name=message]');
  
	socket.emit('createMessage', {
	  text: messageTextbox.val()
	}, function () {
	  messageTextbox.val('')
	});
  });




  socket.on('newMessage', function (message) {
	
	var newMessage = new Message(message.color,message.text);
	messages.push(newMessage);
	
	
	// var formattedTime = moment(message.createdAt).format('h:mm a');
	// var template = jQuery('#message-template').html();
	// var html = Mustache.render(template, {
	//   text: message.text,
	//   from: message.from,
	//   createdAt: formattedTime
	// });

	// jQuery('#messages').append(html);
	// scrollToBottom();
  });
