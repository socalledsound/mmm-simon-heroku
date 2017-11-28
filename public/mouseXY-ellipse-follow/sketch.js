var fillColor = [200,20,20];
var mouseFollowers = [];


function setup() {

  createCanvas(1000,800);
    background(0);

    fill(fillColor);
    ellipse(mouseX, mouseY, 5, 2);

    //setInterval(resetInterface,5000);

}

function draw() {
  background(0);

  mouseFollowers.push(new MouseFollower(mouseX,mouseY,fillColor));

  mouseFollowers.forEach(function(mousefollower, index){
    mousefollower.update();
    if(mousefollower.dead) {
      mouseFollowers.splice(index,1);
    }
    mousefollower.show();
  });



  // if(mouseFollowers.length > 100) {
  //   mouseFollowers.splice(0,1);
  // }




}


function mousePressed() {

}


function resetInterface() {
    background(0);

}
