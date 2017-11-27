var ArcButton = function (id,x,y,diameter,start_arc,end_arc, color) {

	this.id = id;
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.centerD = 150;
	this.start_arc = start_arc;
	this.end_arc = end_arc;
	this.arcLength = 360/numPlayers;
	this.onColor = color;
	// this.onColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.offColor = 0;
	this.fillColor = this.offColor;
	this.centerCircleFill = 20;
	this.clicked = false;
	this.isOn = false;



	this.show = function() {
		// console.log("in here");
		// console.log(this.fillColor);
		fill(this.fillColor);
		//ellipse(this.x,this.y, 30);
		 arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
		 fill(this.centerCircleFill+100);
		 ellipse(width/2, height/2, this.centerD+40);
		 fill(this.centerCircleFill);
		 ellipse(width/2, height/2, this.centerD);
	}

	this.turnOn = function() {

		this.fillColor = this.onColor;
		this.isOn = true;
 	  	setTimeout(this.turnOff,250);

	},

	this.turnOff = function(){
		this.fillColor = this.offColor;	
		this.isOn = false;		 
	}


this.turnOff = this.turnOff.bind(this);


}
