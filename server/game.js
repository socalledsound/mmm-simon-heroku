class Game {
    constructor(numPlayers) {
      console.log(numPlayers);
      this.numPlayers = numPlayers;
      this.radLimit =40;
      this.diameter = 1800;
      this.tempo = 600;
      this.memoryCounter = 0;
      this.arcs =[];
      this.sequence = [];
      this.answered = [];
      this.numRightAnswers = 0;
      this.chooseFrom = [];
      this.pickedNums = [];
      this.players = [];
      this.playerButtons = [];
      this.playerResponses = [];
      this.currentRound = 1;
      this.allNums = Array.apply(null, Array(this.numPlayers));
      this.freqs = Array.apply(null, Array(this.numPlayers));
      this.colors =  Array.apply(null, Array(this.numPlayers));
      this.sequencePlaying = false;
      this.checkAnswerCounter = 0;
      this.gamePaused = true;
      // this.startGameSound = new Howl({src: 'start-game.mp3'});
      // this.wrongAnswerSound = new Howl({src: 'wrong-answer.mp3'});
      // this.loseGameSound = new Howl({src: 'lose-game.mp3'});

    this.addStep = this.addStep.bind(this);
    this.setChooseFrom = this.setChooseFrom.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.shuffle = this.shuffle.bind(this);
    }


    init() {

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
        this.freqs[i] = 220+(i*50);
        });

    // for(var i=0; i<this.numPlayers; i++) {
    //    // console.log("begin arcLegnth:"+arcLength);
    //    this.arcs[i] = new ArcButton(i,width/2,height/2, options.arcDiameter, radians(i*options.arcLength), radians(options.arcLength+(i*options.arcLength)), options.colors[i%4]);
    //     this.arcs[i].turnOff();
    //  };
    //
    //    this.startGameSound.play();
    // scoreboard.innerHTML = "round " + currentRound;
    // setTimeout(this.nextRound,500);

  }


  loseGame() {
     // loseGameSound.play();
     console.log("game lost");
   }



  addStep(sequence) {

      this.setChooseFrom();

      var pickedNum = this.chooseFrom[Math.floor(Math.random() * this.chooseFrom.length)];


      this.pickedNums.push(pickedNum);
      sequence.push(pickedNum);
      return sequence
    }

  setChooseFrom() {
      if(this.pickedNums.length < this.allNums.length) {
        this.chooseFrom = this.allNums.filter((num)=>{
          return !this.pickedNums.includes(num)
            })
          }
      else {
        this.chooseFrom = allNums;
      }
  }


  // nextRound() {
  //   this.gamePaused = true;
  //   this.sequencePlaying = true;
  //   this.checkAnswerCounter = 0;
  //   this.memoryCounter = 0;
  //   this.sequence = this.addStep(this.sequence);
  //   console.log("sequence: " + this.sequence);
  //   return this.sequence

  //    // setTimeout(function() {
  //    //   thisRound = setInterval(trigArc, tempo);
  //    // },tempo);
  // }

  resetAnswers() {
    this.checkAnswerCounter = 0;
    this.memoryCounter = 0;
    this.numRightAnswers = 0;
    this.answered = [];
  }


  nextRound() {
    this.gamePaused = true;
    this.sequencePlaying = true;
    this.checkAnswerCounter = 0;
    this.memoryCounter = 0;
    this.numRightAnswers = 0;
    this.answered = [];
    this.sequence = Array.apply(null, Array(this.numPlayers));

    var sequenceLength = this.sequence.length*this.currentRound;
    console.log(sequenceLength);

    for(var i=0;i<sequenceLength;i++) {
      this.sequence[i] = i%this.numPlayers;
    }


      this.sequence = this.shuffle(this.sequence);



    console.log("sequence: " + this.sequence);
    return this.sequence

     // setTimeout(function() {
     //   thisRound = setInterval(trigArc, tempo);
     // },tempo);
  }



  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }




  nextPattern(patternLength) {
    this.gamePaused = true;
    this.sequencePlaying = true;
    this.checkAnswerCounter = 0;
    this.memoryCounter = 0;

    this.sequence = Array.apply(null, Array(patternLength));
    this.sequence.map((i,index)=>{
      this.sequence[index] = Math.round((Math.random() * (this.numPlayers)));
      // this.sequence[index] = Math.round(Math.random());
    })


    console.log("sequence: " + this.sequence);

    return this.sequence

     // setTimeout(function() {
     //   thisRound = setInterval(trigArc, tempo);
     // },tempo);
  }



}
//
// this.trigArc = function(player) {
//  var currentArc = typeof player != 'undefined'? player : sequence[memoryCounter];
//  // var currentArc = sequence[memoryCounter];
//  arcs[currentArc].turnOn();
//  playSound(currentArc);
//  memoryCounter++;
//  if(memoryCounter == sequence.length) {
//
//    clearInterval(thisRound);
//    sequencePlaying = false;
//    // setTimeout(nextRound, tempo);
//
//    //setTimeout(awaitResponse, tempo);
//  }
// }
//
//
// function playSound(index) {
//  osc.freq(freqs[index]
//    );
//  env.play(osc);
// }
//
// function awaitResponse() {
//  fill(210,110,20);
//  rect(width-110,0,100,1000);
//  // shrinkTimer = setInterval()
// }

//
// this.playerTrigger = function(index){
//  if(!this.sequencePlaying) {
//    if(index === this.sequence[this.checkAnswerCounter]) {
//      this.trigArc(index);
//      playerResponses.push(index);
//      this.checkAnswerCounter = this.checkAnswerCounter + 1;
//      if(this.playerResponses.length === this.sequence.length) {
//        playerResponses = [];
//        currentRound = currentRound +1;
//
//        scoreboard.innerHTML = "round " + currentRound;
//        nextRound();
//      }
//    }
//    else {
//      wrongAnswerSound.play();
//      setTimeout(loseGame,200);
//      textSize(32);
//      fill(200,0,0);
//      text("YOU HAVE BEEN DEFEATED BY SIMON.",200,250);
//      text("TO TRY AGAIN PRESS START",270,600);
//      scoreboard.innerHTML = "";
//      gamePaused = true;
//      setTimeout(showStartButton,1000);
//    }
//
//  }
//
// }
//
//
module.exports = {Game};
