var PlayerButton = function (playerNumber,playerColor) {

	// this.id = id;
	this.playerNumber = playerNumber
	this.x = width/2;
	this.y = height/2;
	this.diameter = options.diameter;
	this.centerD = 150;
	// this.start_arc = start_arc;
	// this.end_arc = end_arc;
	// this.arcLength = 360/numPlayers;
	this.onColor = playerColor;
	// this.onColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.offColor = canvasBGcolor;
	this.fillColor = this.offColor;
	this.centerCircleFill = 20;
	this.clicked = false;



	this.show = function() {
		fill(this.fillColor);
		// arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
		ellipse(this.x, this.y, this.diameter);
		fill(this.centerCircleFill+100);
		ellipse(this.x, this.y, this.centerD+40);
		fill(this.centerCircleFill);
		ellipse(this.x, this.y, this.centerD);
		
	}



	this.turnOn = function() {

		console.log("in here");
		this.fillColor = this.onColor;
		setTimeout(this.turnOff,options.tempo/2);

	},

	this.turnOff = function(){
		this.fillColor = this.offColor;
		
		 
	}

	this.turnOff = this.turnOff.bind(this);




}
