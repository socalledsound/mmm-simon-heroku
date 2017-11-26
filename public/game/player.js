var Player = function (id, name) {
	this.id = id;
	this.playerNumber = -1;
	this.name = name;
	this.playerColor = '#'+Math.floor(Math.random()*1677).toString(16);
	this.admin = false;
	this.ready = false;
	this.sound= "placeholder";
	this.arcButton = "placeholder";
}
