var cube = document.getElementById('cube');
var d_keys = document.getElementById('d_keys');
var keys = document.getElementById('keys');
var win_h = document.documentElement.clientHeight;
console.log(win_h);
if(win_h > 270){
	cube.style.marginTop = win_h/2 - 110 + "px";
}


var xAngle = 0, yAngle = 0;
document.addEventListener('keydown', function(e) {
	switch(e.keyCode) {
	
	  case 37: // left
		yAngle -= 90;
		break;
	
	  case 38: // up
		xAngle += 90;
		break;
	
	  case 39: // right
		yAngle += 90;
		break;
	
	  case 40: // down
		xAngle -= 90;
		break;
	};
	
	cube.style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
}, false);

d_keys.addEventListener('click', function(e) {
	if(keys.style.display != "block"){
		keys.style.display = "block";
	}else{
		keys.style.display = "none";
	}
}, false);