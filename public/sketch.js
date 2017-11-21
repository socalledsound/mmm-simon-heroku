
var numPlayers = 6;
var player;
var players = [];

var localGame;

var osc, env;
var scoreboard = document.getElementById('scoreboard');
var readyButton;
var timerColor = [0,0,0];
var gamePaused=false;

var socket = io();
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');


function setup() {

  	createCanvas(1000,800);
 	background(0);
	noStroke();
	initReadyButton();
	initOscillator();
	welcomeMessage();


	//maybe start button does go back here actually, and then it triggers a 'loading' visual
	
}

function welcomeMessage() {
	textSize(32);
	fill(200,0,0);
	text("MY NAME IS SIMON.",350,100);
	text("DO YOU WANT TO PLAY A GAME?",260,220);
	text("PRESS START TO PLAY",330,620);
}



function mousePressed() {
	if(!gamePaused) {
		var clicked = inCircle();
		if(clicked) {
			var pos = getRad();
			//var clickedArc = 10;
			var clickedArc = arcs.filter((arc,i) => (pos > arc.start_arc && pos < arc.end_arc),this);
			var player = clickedArc[0].id;
			playerTrigger(player);
		}
	}

}

function initReadyButton() {

   	readyButton = createButton('ready');
   	readyButton.position(100,700);
   	readyButton.mousePressed(readyPlayer);

}




   	
function readyPlayer() {
	background(0);
	hideReadyButton();
	player = new Player();
	player.init();
	
}


function showStartButton () {
	startButton.style("display", "inline-block");
}

function hideStartButton () {
	startButton.style("display", "none");
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


//socket stuff 

socket.on('connect', function () {
	console.log('Connected to server');
	
	var params = $.deparam(window.location.search);
	params['color'] = '#'+Math.floor(Math.random()*16777215).toString(16);
	
	socket.emit('join', params, function(err){
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
	players.forEach((player)=> {
	  var li = $('<li></li>');
	  console.log(player);
	  li.css({ "background-color" : player.color});
	  li.css({ "color" : "white" });
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

