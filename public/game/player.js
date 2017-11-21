var Player = function (id, name) {
	this.id = id;
	this.name = name;
	this.color = '#'+Math.floor(Math.random()*16777).toString(16);
	this.admin = false;
	this.ready = false;
	this.sound= "placeholder";
	this.arcButton = "placeholder";
}
