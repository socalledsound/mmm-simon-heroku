var flagged = true;
var numPlayers = 0;
var thisPlayer;
var localPlayers = [];
var thisMouseFollowers = [];
var allMouseFollowers=[];
var messages = [];
var arcs = [];
var colors = [];
var localGame;
var gameView;
var adminButtonsShown = false;

var osc, env;

// var scoreboard = document.getElementById('scoreboard');
var nameDiv = document.getElementById('name');
var nameDiv = $('#name');
var cheatDiv = $('#cheat');
var scoreboard;
var currentScore = 0;
var startButton, jamButton, adminButtons;
var readyButton;
var soundButtons = [];
var cnv;
var canvasBGcolor = 200;


var timerColor = [0,0,0];
var gamePaused = true;

var readyPlayers=0;
var thisLocalPlayer;


var socket = io();
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');


var startGameSound = new Howl({src: '/sounds/interfaceSounds/start-game.mp3'});
var wrongAnswerSound = new Howl({src: '/sounds/interfaceSounds/wrong-answer.mp3'});
var loseGameSound = new Howl({src: '/sounds/interfaceSounds/lose-game.mp3'});
var wonRoundSound = new Howl({src: '/sounds/interfaceSounds/boxing-bell.mp3'});





var loadedSounds = [];
var soundIndex=0;


console.log("numPlauers init: : "+numPlayers);


function setup() {

    cnv = createCanvas(380,380);
    cnv.parent('game');
 	background(canvasBGcolor);
	noStroke();
	initReadyButton();
	//initOscillator();
	welcomeMessage();

  colors.map((color,i) => {
  	colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
  	});


	//initOscillator();

  var ul = $('<ul></ul>');
  sounds.forEach((sound,i)=> {
    loadedSounds[i] = new Howl({src:sound.path});
		console.log(sound.name);
    console.log(i);
    var button = $('<button></button>');
    soundButtons.push(button);
    var borderColor = sound.chosen ?  "10px solid #77ffff" : sound.bgColor;
    button.css({ "background-color" : sound.bgColor});
    button.css({ "color" : "#000" });
    button.css({ "border" : borderColor});
    button.click({param1:i},chooseSound);
    ul.append(button.text(sound.name));
	   })

  $('#sounds').html(ul);


  currentSound = loadedSounds[0];


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

  //this is where we draw the mouse stuff
  if(typeof thisPlayer != 'undefined') {
    thisMouseFollowers.push(new MouseFollower(mouseX,mouseY,thisPlayer.playerColor));

    thisMouseFollowers.forEach(function(mousefollower, index){

      // mousefollower.update();
      mousefollower.initValue = mousefollower.initValue+1;
      if(mousefollower.initValue > mousefollower.deathDelay) {
        mousefollower.dead = true;
      }
      if(mousefollower.dead) {
        thisMouseFollowers.splice(index,1);
      }

      fill(mousefollower.fillColor);
      ellipse(mousefollower.x,mousefollower.y,40);

		});




    // console.log(mouseFollowers);
    socket.emit('mouseData',thisMouseFollowers);
  }


	allMouseFollowers.forEach(function(mousefollower, index){

					// mousefollower.update();
					mousefollower.initValue = mousefollower.initValue+1;
					if(mousefollower.initValue > mousefollower.deathDelay) {
						mousefollower.dead = true;
					}
					if(mousefollower.dead) {
						allMouseFollowers.splice(index,1);
					}

					fill(mousefollower.fillColor);
					ellipse(mousefollower.x,mousefollower.y,40);

					// mousefollower.show();


				});
}

function chooseSound(e){
	console.log("sound chosen : "+e.data.param1);
	soundIndex = e.data.param1;
  sounds.forEach(function(sound,i){
    sound.chosen = false;
    soundButtons[i].css({ "background-color" : sound.bgColor});
  })
  soundButtons[e.data.param1].css({ "background-color" : "#fff"});
	currentSound = loadedSounds[e.data.param1];
	nameDiv.text(thisPlayer.name + "  :  " + sounds[soundIndex].name);
  console.log(sounds[e.data.param1].chosen);
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
			trigPlayer(thisPlayer.playerNumber, true);
      if (thisPlayer.inGame) {
        socket.emit("checkMouseClick", thisPlayer.playerNumber);
      }

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
	//	nameDiv.innerHTML = thisPlayer.name + "  :  " + currentSound.name;
		nameDiv.text(thisPlayer.name + "  :  " + sounds[soundIndex].name);
		nameDiv.css({"background-color" : thisPlayer.playerColor})
    $('#message-wrapper').css({"background-color" : thisPlayer.playerColor})

	gameView = new GameView(numPlayers, thisPlayer.playerNumber, thisPlayer.playerColor, currentScore);
	gameView.init();

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

function updateCheat() {
  var ul = $('<ul></ul>');

  console.log("seq:"+ localGame.sequence);
  if(typeof localGame.sequence != 'undefined') {
    localGame.sequence.forEach(function(number, index){
      var li = $('<li></li>');
      var cheatPlayer = localPlayers[number];
      var borderColor = (index === localGame.memoryCounter) ?  "10px solid #ffff00" : cheatPlayer.playerColor;

      console.log(cheatPlayer.name);
      li.css({ "background-color" : cheatPlayer.playerColor});
       li.css({ "border" : borderColor});
      li.css({"color" : "#000"});
      li.css({"width" : "80px"});
      li.css({"list-style-type" :"none"});
      li.css({"display" : "inline-flex"});
      li.css({"margin-left" : "5px"});
      // li.css({"margin-right" : "5px"});
      li.css({"margin-top" : "10px"});
      li.css({"padding" : "5px 5px 5px 5px"});
      ul.append(li.text(cheatPlayer.name));

    });
    cheatDiv.html(ul);
  }
}


function trigPlayer(playerNum, moused) {
	var currentNum = typeof playerNum != 'undefined' ? playerNum : localGame.sequence[localGame.memoryCounter];
	if(typeof moused != 'undefined' && moused) {
		gameView.playerButton.turnOn();
		playSound(playerNum);
    return
	}

  if (typeof gameView != 'undefined') {

			gameView.arcs[currentNum].turnOn();

		if(currentNum === thisPlayer.playerNumber) {
			playSound(currentNum);

		}

		// socket.emit("incrementGlobalMemoryCounter");
    localGame.memoryCounter++;
    setTimeout(updateCheat,500);
		if(localGame.memoryCounter == localGame.sequence.length) {

			clearInterval(thisRound);
			setTimeout(function(){
				gameView.sequencePlaying = false;
				}
				,600);
			localGame.sequencePlaying = false;
			gamePaused = false;

      setTimeout(finishedSequence,500);
			// setTimeout(nextRound, tempo);
			//setTimeout(awaitResponse, tempo);
		}

	}
	else {
		playSound(currentNum);
	}



}


function finishedSequence() {
  socket.emit("resetGlobalMemoryCounter");
  clearInterval(thisRound);
  updateCheat();
}

// trigArc = trigArc.bind(this);
 trigPlayer = trigPlayer.bind(this);



function playSound(index) {
  currentSound.play();
  console.log("playing");


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
  clearInterval(thisRound);
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
	
    var params = $.deparam(window.location.search);
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
	numPlayers = players.filter((player)=> player.ready === true).length;
	players.forEach((player,index)=> {
		console.log(player.playerColor);

    var li = $('<li></li>');
    var borderColor = player.ready ?  "10px solid #77ffff" : player.playerColor;
    li.css({ "background-color" : player.playerColor});
     li.css({ "background" : player.playerColor});
    li.css({ "color" : "#fff" });
     li.css({ "border" : borderColor});
    ul.append(li.text(player.name));
	   })

	   $('#players').html(ul);



	readyPlayers = players.filter((player) => player.ready === true);
	readyPlayers.forEach((player, index)=>{
		player.playerNumber = index;
		if(player.name === thisPlayer.name) {
			thisPlayer.playerNumber = player.playerNumber;
		}
	});
	localPlayers=readyPlayers;

	if (typeof gameView != 'undefined') {
		gameView.playerNumber = thisPlayer.playerNumber;
				gameView.updatePlayers(localPlayers,numPlayers);

				}

	})


socket.on("resetGame", function(){
  if(typeof thisRound != 'undefined') {
    clearInterval(thisRound);
  }

})


socket.on("syncGames", function(game){
  if (typeof localGame != 'undefined') {
    localGame.sequence = game.sequence;
  };
})

socket.on('startClientGame', function(game){

    startGameSound.play();
    // scoreboard.innerHTML = "round " + game.currentRound;
    localGame = game;
    // console.log(localGame.numPlayers);

});

socket.on('trigClientRound', function(game){
  if(typeof thisRound != 'undefined') {
    clearInterval(thisRound);
  }

	gamePaused = true;
	gameView.sequencePlaying = true;
	localGame.sequence = game.sequence;

//if this player number is in localGame.sequence then
  // var inSequence = (index === localGame.memoryCounter) ?  "10px solid #ffff00" : cheatPlayer.playerColor;
  // var inSequence = (localGame.sequence.filter       ? true : false;

  var inSequence = localGame.sequence.filter(function(number){
      number ===  thisPlayer.playerNumber;
  })

console.log("in sequence ::: :: " + inSequence);

        if(inSequence != 'undefined') {
          thisPlayer.inGame = true;
}


  updateCheat();

	setTimeout(function() {
	 	thisRound = setInterval(trigPlayer, localGame.tempo);
	 },localGame.tempo);
})


socket.on("wrongAnswer", function(){
	wrongAnswerSound.play();
  updateCheat();
  // socket.emit("resetGlobalMemoryCounter");
})

socket.on("wonRound", function(){
	 wonRoundSound.play();
   updateCheat();
  // socket.emit("resetGlobalMemoryCounter");
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

  });

  socket.on('sendBackMouseData', function(mouseData){
    // console.log(mouseData);
     allMouseFollowers = mouseData;
  })

socket.on("incrementMemoryCounter", function(){
  localGame.memoryCounter++;
  console.log("update memory counter: " + localGame.memoryCounter);
  updateCheat();
})

socket.on("resetMemoryCounter", function(){
  localGame.memoryCounter = 0;
  updateCheat();
})

