var cube = document.getElementById('cube');
var box_hint = document.getClass('box_hint');
var hint = document.getClass('hint');
var win_h = document.documentElement.clientHeight;

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

swipedetect(cube, function(swipedir){
	switch(swipedir) {
	
	  case 'left': // left
		yAngle -= 90;
		break;
	
	  case 'up': // up
		xAngle += 90;
		break;
	
	  case 'right': // right
		yAngle += 90;
		break;
	
	  case 'down': // down
		xAngle -= 90;
		break;
	};
	
	cube.style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
})

for (var bhi = 0; bhi< box_hint.length; bhi++) {
		box_hint[bhi].addHandler('click', function(event){
			var _this = this;
			for(var j = 0; j < hint.length; j++){
				if(EventUtil.isChildorSelf(_this,hint[j])){
					if(hint[j].getStyle('display') != "block"){
						hint[j].setStyle({'display':'block'});
					}else{
						hint[j].setStyle({'display':'none'});
					}
				}
			}
	    	EventUtil.stopPropagation(event);
		});
	}