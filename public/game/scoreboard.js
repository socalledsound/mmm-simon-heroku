var Scoreboard = function(score) {
    this.currentScore = score;
    this.x = width/2-30;
    this.y = height/2;
    this.color = [220,0,0];

    this.increment = function(score) {
        this.currentScore = this.currentScore+1;
    },
    this.update = function() {
        fill(this.color);
        textSize(20);
        text("score: "+this.currentScore,this.x,this.y);
    }
}