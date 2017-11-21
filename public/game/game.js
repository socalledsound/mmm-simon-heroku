var Game = function(numPlayers) {
    this.numPlayers = numPlayers;
    this.radLimit =40;
	  this.diameter = options.diamter;

    this.tempo = 300;
    this.memoryCounter = 0;
    this.sequence = [];
    this.chooseFrom = [];
    this.pickedNums = [];
    this.players = [];
    this.playerButtons = [];
    this.playerResponses = [];
    this.currentRound = 0;
    this.allNums = Array.apply(null, Array(this.numPlayers));
    this.freqs = Array.apply(null, Array(this.numPlayers));
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



  this.freqs.map((freq,i) => {
    	freqs[i] = 220+(i*50);
    	});



	scoreboard.innerHTML = "round " + currentRound;
	setTimeout(this.nextRound,500);

}








this.loseGame = function() {
	loseGameSound.play();
}



this.addStep = function(sequence) {

	setChooseFrom();

	var pickedNum = chooseFrom[Math.floor(Math.random() * chooseFrom.length)];


	pickedNums.push(pickedNum);
	sequence.push(pickedNum);
	return sequence
}

this.setChooseFrom  = function () {
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




function awaitResponse() {
	fill(210,110,20);
	rect(width-110,0,100,1000);
	// shrinkTimer = setInterval()
}



}
