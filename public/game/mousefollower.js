var MouseFollower = function(x,y,color) {

  this.x = x;
  this.y = y;
  this.fillColor = color;
  this.dead = false;
  this.initValue = 0;
  this.deathDelay = 30;


  this.update = function() {
    this.initValue = this.initValue+1;
    if(this.initValue > this.deathDelay) {
      this.dead = true;
    }
  }


  this.show = function() {
      fill(this.fillColor);
      ellipse(this.x,this.y,40);
  }

}
