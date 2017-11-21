var Game = function(numPlayers) {
    this.numPlayers = numPlayers;
    this..radLimit =40;
	  this.diameter = 1800;

    this.tempo = 300;
    this.memoryCounter = 0;
    this.arcs =[];
    this.sequence = [];
    this.chooseFrom = [];
    this.pickedNums = [];
    this.players = [];
    this.playerButtons = [];
    this.playerResponses = [];
    this.currentRound = 0;
    this.allNums = Array.apply(null, Array(this.numPlayers));
    this.freqs = Array.apply(null, Array(this.numPlayers));
    this.colors =  Array.apply(null, Array(this.numPlayers));
    this.sequencePlaying = false;
    this.checkAnswerCounter = 0;
    this.gamePaused = true;
    this.startGameSound = new Howl({src: 'start-game.mp3'});
    this.wrongAnswerSound = new Howl({src: 'wrong-answer.mp3'});
    this.loseGameSound = new Howl({src: 'lose-game.mp3'});

this.init = function() {
  this.startGameSound.play();
  this.sequence = [];
	this.chooseFrom = [];
	this.pickedNums = [];
	this.playerResponses = [];
	this.currentRound = 1;

  this.allNums.map((x,i) => {
  	this.allNums[i] = i;
  	});

  this.colors.map((color,i) => {
  	this.colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
  	});

  this.freqs.map((freq,i) => {
    	freqs[i] = 220+(i*50);
    	});
   	for(var i=0; i<this.numPlayers; i++) {
  		// console.log("begin arcLegnth:"+arcLength);
  		this.arcs[i] = new ArcButton(i,width/2,height/2, options.arcDiameter, radians(i*options.arcLength), radians(options.arcLength+(i*options.arcLength)), options.colors[i%4]);
  		 this.arcs[i].turnOff();
  	};


	scoreboard.innerHTML = "round " + currentRound;
	setTimeout(this.nextRound,500);

}








this.loseGame() {
	loseGameSound.play();
}



function addStep(sequence) {

	setChooseFrom();

	var pickedNum = chooseFrom[Math.floor(Math.random() * chooseFrom.length)];


	pickedNums.push(pickedNum);
	sequence.push(pickedNum);
	return sequence
}

this.setChooseFrom = function() {
		if(pickedNums.length < allNums.length) {
		chooseFrom = allNums.filter((num)=>{
			return !pickedNums.includes(num)
		})
	}
	else {
		chooseFrom = allNums;
	}
}

this.nextRound = function() {
	gamePaused = false;
	sequencePlaying = true;
	checkAnswerCounter = 0;
	memoryCounter = 0;
	sequence = addStep(sequence);
	 // console.log("sequence: " + sequence);

	 setTimeout(function() {
	 	thisRound = setInterval(trigArc, tempo);
	 },tempo);
}

//
// this.trigArc = function(player) {
// 	var currentArc = typeof player != 'undefined'? player : sequence[memoryCounter];
// 	// var currentArc = sequence[memoryCounter];
// 	arcs[currentArc].turnOn();
// 	playSound(currentArc);
// 	memoryCounter++;
// 	if(memoryCounter == sequence.length) {
//
// 		clearInterval(thisRound);
// 		sequencePlaying = false;
// 		// setTimeout(nextRound, tempo);
//
// 		//setTimeout(awaitResponse, tempo);
// 	}
// }
//
//
// function playSound(index) {
// 	osc.freq(freqs[index]
// 		);
// 	env.play(osc);
// }
//
// function awaitResponse() {
// 	fill(210,110,20);
// 	rect(width-110,0,100,1000);
// 	// shrinkTimer = setInterval()
// }

//
// this.playerTrigger = function(index){
// 	if(!this.sequencePlaying) {
// 		if(index === this.sequence[this.checkAnswerCounter]) {
// 			this.trigArc(index);
// 			playerResponses.push(index);
// 			this.checkAnswerCounter = this.checkAnswerCounter + 1;
// 			if(this.playerResponses.length === this.sequence.length) {
// 				playerResponses = [];
// 				currentRound = currentRound +1;
//
// 				scoreboard.innerHTML = "round " + currentRound;
// 				nextRound();
// 			}
// 		}
// 		else {
// 			wrongAnswerSound.play();
// 			setTimeout(loseGame,200);
// 			textSize(32);
// 			fill(200,0,0);
// 			text("YOU HAVE BEEN DEFEATED BY SIMON.",200,250);
// 			text("TO TRY AGAIN PRESS START",270,600);
// 			scoreboard.innerHTML = "";
// 			gamePaused = true;
// 			setTimeout(showStartButton,1000);
// 		}
//
// 	}
//
// }
//
//
