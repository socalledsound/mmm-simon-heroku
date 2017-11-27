
var inCircle = function() {
	if(mouseX < 1000 && mouseX > 0 && mouseY < 800 && mouseY > 0) {


		if(dist(mouseX, mouseY, width/2, height/2) < options.diameter/2) {
			return true
		}
	}
}


var inRect = function() {
	if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
		return true	
	}
}

function whichArc(pos) {
	arcs.filter((arc,i) => {

			if (pos > arc.start_arc && pos < arc.end_arc){
				console.log(arc.id);
				return arc.id
			}
			else {
				return 100
			}

		});
}



function getRad () {

	var deltaX = (width/2 - mouseX);
	var deltaY = (height/2 - mouseY);

	// In radians
	var rad =  Math.atan2(deltaY, deltaX) + Math.PI;
	// var deg = Math.round(rad * (180 / Math.PI)) //In degrees
	// console.log(degrees(rad));
	return rad
}

function revertColor(i) {

	arcs[i].fillColor = arcs[i].originalColor;
}
