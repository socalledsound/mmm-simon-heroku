
var numPlayers = 6;
var thisPlayer;
var localPlayers = [];
var arcs = [];
var colors = [];
var localGame;

var osc, env;
var scoreboard = document.getElementById('scoreboard');
var readyButton;
var timerColor = [0,0,0];
var gamePaused = true;

var socket = io();
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');


function setup() {

  createCanvas(1000,800);
 	background(0);
	noStroke();
	initReadyButton();
	//initOscillator();
	welcomeMessage();

  colors.map((color,i) => {
  	colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
  	});


  for(var i=0; i<numPlayers; i++) {
    // console.log("begin arcLegnth:"+arcLength);
    arcs[i] = new ArcButton(i,width/2,height/2, options.arcDiameter, radians(i*options.arcLength), radians(options.arcLength+(i*options.arcLength)), colors[i%4]);
     arcs[i].turnOff();
  };

	//maybe start button does go back here actually, and then it triggers a 'loading' visual

}

function welcomeMessage() {
	textSize(32);
	fill(200,0,0);
	// text("MY NAME IS SIMON.",350,100);
	text("DO YOU WANT TO PLAY A GAME?",260,220);
	text("PRESS THE BUTTON WHEN YOU'RE READY",330,620);
}



function mousePressed() {
	if(!gamePaused) {
		var clicked = inCircle();
		if(clicked) {
			var pos = getRad();
			//var clickedArc = 10;
			var clickedArc = arcs.filter((arc,i) => (pos > arc.start_arc && pos < arc.end_arc),this);
      console.log(clickedArc);
//			var player = clickedArc[0].id;
			playerTrigger(thisPlayer);
		}
	}

}

function initReadyButton() {

   	readyButton = createButton('ready').addClass('ready-button');
   	readyButton.position(230,700);
   	readyButton.mousePressed(readyPlayer);

}





function readyPlayer() {
	background(0);
	hideReadyButton();
  thisPlayer.ready = true;
  console.log(thisPlayer);
  socket.emit("playerReady", thisPlayer, function() {
    console.log("player emit");
  })
	// player.init();

}


function showReadyButton () {
	readyButton.style("display", "inline-block");
}

function hideReadyButton () {
	readyButton.style("display", "none");
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

function playerTrigger(index){
	if(!game.sequencePlaying) {
		if(index === game.sequence[game.checkAnswerCounter]) {

			trigArc(index);

      //here need to add socket message to update server to local state


      //where does this go/come from?  probably stored on server yeah???
			playerResponses.push(index);

      //this obv needs to go to server too
      game.checkAnswerCounter = game.checkAnswerCounter + 1;


			if(game.playerResponses.length === game.sequence.length) {
				playerResponses = [];
				currentRound = currentRound +1;

				scoreboard.innerHTML = "round " + currentRound;
				nextRound();
			}
		}
		else {
			wrongAnswerSound.play();
			setTimeout(loseGame,200);
			textSize(32);
			fill(200,0,0);
			text("YOU HAVE BEEN DEFEATED BY SIMON.",200,250);
			text("TO TRY AGAIN PRESS START",270,600);
			scoreboard.innerHTML = "";
			gamePaused = true;
			setTimeout(showStartButton,1000);
		}

	}

}



function trigArc(player) {
	var currentArc = typeof player != 'undefined'? player : sequence[memoryCounter];
	// var currentArc = sequence[memoryCounter];
	arcs[currentArc].turnOn();
	playSound(currentArc);
	memoryCounter++;
	if(memoryCounter == sequence.length) {

		clearInterval(thisRound);
		sequencePlaying = false;
		// setTimeout(nextRound, tempo);

		//setTimeout(awaitResponse, tempo);
	}
}


function playSound(index) {
	osc.freq(freqs[index]
		);
	env.play(osc);
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


  socket.on('updatePlayerList', function(players){
	var ul = $('<ul></ul>');
  // console.log(players);
	players.forEach((player)=> {
	  var li = $('<li></li>');
	  console.log(player.color);
	  li.css({ "background-color" : player.color.asString});
	  li.css({ "color" : "white" });
	  ul.append(li.text(player.name));

	})
	$('#players').html(ul);
  })


  socket.on('updatePlayerReadyList', function(players){
    var ul = $('<ul></ul>');
    players.forEach((player)=> {
      var li = $('<li></li>');

      li.css({ "background-color" : player.color});
      li.css({ "color" : "white" });
      li.css({ "border" : "10px solid #ffff00"});
      ul.append(li.text(player.name));

    })
    $('#players').html(ul);
  })

  socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
	  text: message.text,
	  from: message.from,
	  createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
  });
