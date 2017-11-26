var GameView = function(numPlayers,playerNumber, playerColor) {
    this.numPlayers = numPlayers;
    this.playerNumber = playerNumber;
    this.playerColor = playerColor;
    this.radLimit =40;
	this.diameter = options.diameter;
	this.arcLength = 360/this.numPlayers;
	this.arcs=[];
	this.playerButton;
	

    // this.tempo = 300;
    // this.memoryCounter = 0;
    // this.sequence = [];
    // this.chooseFrom = [];
    // this.pickedNums = [];
    // this.players = [];
    // this.playerButtons = [];
    // this.playerResponses = [];
    // this.currentRound = 0;
    // this.allNums = Array.apply(null, Array(this.numPlayers));
     this.freqs = Array.apply(null, Array(this.numPlayers));
    // this.sequencePlaying = false;
    // this.checkAnswerCounter = 0;
    // this.gamePaused = true;
    // this.startGameSound = new Howl({src: 'start-game.mp3'});
    // this.wrongAnswerSound = new Howl({src: 'wrong-answer.mp3'});
    // this.loseGameSound = new Howl({src: 'lose-game.mp3'});

// this.init = function() {
//   this.startGameSound.play();
//   this.sequence = [];
// 	this.chooseFrom = [];
// 	this.pickedNums = [];
// 	this.playerResponses = [];
// 	this.currentRound = 1;

//   this.allNums.map((x,i) => {
//   	this.allNums[i] = i;
//   	});



   this.freqs.map((freq,i) => {
     	this.freqs[i] = 220+(i*200);
     	});



// 	scoreboard.innerHTML = "round " + currentRound;
// 	setTimeout(this.nextRound,500);

// }


this.init = function() {

	this.playerButton = new PlayerButton(this.playerNumber, this.playerColor)

	//  	for(var i=0; i<numPlayers; i++) {
	// 	// console.log("begin arcLegnth:"+arcLength);
	// 	this.arcs[i] = new ArcButton(i,width/2,height/2, this.diameter, radians(i*this.arcLength), radians(this.arcLength+(i*this.arcLength)), colors[i%4]);
	// 	this.arcs[i].turnOff();
	// };
}


this.show = function () {
    this.playerButton.show();
}




// this.loseGame = function() {
// 	loseGameSound.play();
// }



// this.addStep = function(sequence) {

// 	setChooseFrom();

// 	var pickedNum = chooseFrom[Math.floor(Math.random() * chooseFrom.length)];


// 	pickedNums.push(pickedNum);
// 	sequence.push(pickedNum);
// 	return sequence
// }

// this.setChooseFrom  = function () {
// 		if(pickedNums.length < allNums.length) {
// 		chooseFrom = allNums.filter((num)=>{
// 			return !pickedNums.includes(num)
// 		})
// 	}
// 	else {
// 		chooseFrom = allNums;
// 	}
// }

// this.nextRound = function() {
// 	gamePaused = false;
// 	sequencePlaying = true;
// 	checkAnswerCounter = 0;
// 	memoryCounter = 0;
// 	sequence = addStep(sequence);
// 	 // console.log("sequence: " + sequence);

// 	 setTimeout(function() {
// 	 	thisRound = setInterval(trigArc, tempo);
// 	 },tempo);
// }




function awaitResponse() {
	fill(210,110,20);
	rect(width-110,0,100,1000);
	// shrinkTimer = setInterval()
}



}
