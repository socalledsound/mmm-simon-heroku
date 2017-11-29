var GameView = function(numPlayers,playerNumber, playerColor, score) {
    this.numPlayers = numPlayers;
    this.playerNumber = playerNumber;
    this.playerColor = playerColor;
    this.radLimit =40;
	  this.diameter = 800;
	  this.arcLength = 360/this.numPlayers;
	  this.arcs=[];
    this.playerButton;
    this.sequencePlaying = false;
    this.scoreboard;
    this.currentScore = score;



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
     this.freqs = Array.apply(null, Array(20));
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
     	this.freqs[i] = 360+(i*40);
     	});



// 	scoreboard.innerHTML = "round " + currentRound;
// 	setTimeout(this.nextRound,500);

// }


this.init = function() {

    this.playerButton = new PlayerButton(this.playerNumber, this.playerColor);
    this.scoreboard = new Scoreboard(this.currentScore);
	//  	for(var i=0; i<this.numPlayers; i++) {
	// 	// console.log("begin arcLegnth:"+arcLength);
	// 	this.arcs[i] = new ArcButton(i,width/2,height/2, this.diameter, radians(i*this.arcLength), radians(this.arcLength+(i*this.arcLength)), localPlayers[i].playerColor);
	// 	this.arcs[i].turnOff();
	// };
}


this.addArc = function(id) {
  console.log("id: " + id);
  console.log("arcLength: " + this.arcLength);
  console.log("arclength*id: " + this.arcLength*id);
    this.arcs[id] = new ArcButton(id,width/2,height/2, this.diameter, radians(id*this.arcLength), radians(this.arcLength+(id*this.arcLength)), localPlayers[id].playerColor);
}

//
// this.updatePlayers = function(numPlayers) {
//     this.numPlayers = numPlayers;
//     this.arcLength = 360/this.numPlayers;
//     for(var i=0; i<this.numPlayers; i++) {
//         // console.log("begin arcLegnth:"+arcLength);
//
// 		this.arcs[i] = new ArcButton(i,width/2,height/2, this.diameter, radians(i*this.arcLength), radians(this.arcLength+(i*this.arcLength)), localPlayers[i].playerColor);
// 		this.arcs[i].turnOff();
// 	};
// }


this.show = function () {

      this.playerButton.show();

    if(this.sequencePlaying) {
        for(var i=0; i<this.numPlayers; i++) {
            this.arcs[i].show();
            // console.log(this.arcs[i].isOn);
        }
    }

    this.scoreboard.update();
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
