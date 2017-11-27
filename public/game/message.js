var Message = function(color, message) {

    this.color = color;
    this.text = message;
    this.x=width;
    this.y = random(50,height-50);
    this.speed = random(2);
    this.isDead = false;
    this.fontSize = random(15,90);

    this.show = function() {

        
        textSize(this.fontSize);
        fill(this.color);
        // text("MY NAME IS SIMON.",350,100);
        text(this.text,this.x,this.y);

    },

    this.update = function(){
        
        this.x=this.x-this.speed;
        if(this.x < -1000) {
            this.isDead = true;
        }
    
    }

}