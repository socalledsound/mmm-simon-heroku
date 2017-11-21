var fillColor = [200,20,20,1];

function setup() {
  
  createCanvas(1000,800);
    background(0);
    
    fill(fillColor);
    ellipse(mouseX, mouseY, 200, 100); 
  
    setInterval(resetInterface,5000);
  
}

function draw() {
    noStroke();
      fill(fillColor);
    ellipse(mouseX, mouseY, 200, 100); 
}


function mousePressed() {

}


function resetInterface() {
    background(0);
    
}