/**
* DOM组件，DOM扩展组件DOMextend，事件处理组件EventUtil
* 触摸方向检测
*
**/

document.getClass = function (className) {
    var el = [],  el2 = document.getElementsByTagName('*'), i, j, ell;
    for (i = 0; i < el2.length; i++) {
        if (el2[i].className === className) {
            el[el.length] = el2[i];
        } else {
            ell = el2[i].className.split(" ");
            for (j = 0; j < ell.length; j++) {
                if (ell[j] === className) {
                    el[el.length] = el2[i];
                }
            }
        }
    }
    return el;
};

var DOMExtend = function (name, fn) {
    if (!document.all) {
        eval("HTMLElement.prototype." + name + " = " + fn);
    } else {
        var _createElement = document.createElement;
        document.createElement = function (tag) {
            var _elem = _createElement(tag);
            eval("_elem." + name + " = fn");
            return _elem;
        }

        var _getElementById = document.getElementById;
        document.getElementById = function (id) {
            var _elem = _getElementById(id);
            eval("_elem." + name + " = fn");
            return _elem;
        }

        var _getElementsByTagName = document.getElementsByTagName;
        document.getElementsByTagName = function (tag) {
            var _arr = _getElementsByTagName(tag);
            for (var _elem = 0; _elem < _arr.length; _elem++) 
                eval("_arr[_elem]." + name + " = fn");
            return _arr;
        }
    }
}


DOMExtend('hasClass', function(className){
    var _this = this;
    var c = _this.getAttribute('class');

    if (c === className) {
        return true;
    }else{
        var _ell = c.split(" ");
        for(var j = 0; j < _ell.length; j++){
            if (_ell[j] === className) {
                return true;
            }
        }
    }

    return false;
});

DOMExtend('addClass',function(cn){
    var _this = this;
    var c = _this.getAttribute('class');
    if (c) {
        _this.setAttribute('class', c + " " + cn);
    }else{
        _this.setAttribute('class', cn);
    }
});

DOMExtend('removeClass',function(cn){
    var _this = this;
    var c = _this.getAttribute('class');
    if(!c) return false;
    if (c === cn) {
        _this.setAttribute('class', '');
    }else{
        var cl = c.split(" ");
        var cnow = '';
        for(var j=0; j < cl.length; j++){
            if(cl[j] !== cn){
                cnow += cl[j] + ' ';
            }
        }
        _this.setAttribute('class', cnow.slice(0,-1));
    }
});

DOMExtend('addHandler',function(type, callback){
    var _this = this;
    if(_this.addEventListener){
        _this.addEventListener(type, callback, false);
    }else if(_this.attachEvent){
        _this.attachEvent('on'+type, callback);
    }else{
        _this['on'+type] = callback;
    }
});


DOMExtend('removeHandler',function(type, callback){
    var _this = this;
    if(_this.removeEventListener){
        _this.removeEventListener(type, callback, false);
    }else if(_this.detachEvent){
        _this.detachEvent('on'+type, callback);
    }else{
        _this['on'+type] = null;
    }
});

DOMExtend('offset', function(){
    var _this = this;
    var top = 0, left = 0;
    while(_this.offsetParent){
        top += _this.offsetTop;
        left += _this.offsetLeft;
        _this = _this.offsetParent;
    }
    return{
        'top':top,
        'left':left,
    }
});

DOMExtend('position', function(){
    var _this = this;
    if(_this.parentNode == _this.offsetParent){
        var x = _this.offsetLeft;
        var y = _this.offsetTop;
        var px = parseInt(getStyle(_this.offsetParent,"borderLeftWidth")) || 0;
        var py = parseInt(getStyle(_this.offsetParent,"borderTopWidth")) || 0;
        if(document.all){
            x = x - px;
            y = y - py;
        }
    }else{
        var o = offset(_this);
        var p = offset(_this.offsetParent);
        var x = o.left - p.left;
        var y = o.top - p.top;
    }
    return {
        'left' : x,
        'top' : y,
    };

    function offset(_this){
        var top = 0, left = 0;
        while(_this.offsetParent){
            top += _this.offsetTop;
            left += _this.offsetLeft;
            _this = _this.offsetParent;
        }
        return{
            'top':top,
            'left':left,
        }
    }
    function getStyle(e, n){
        if(e.style[n]){
            return e.style[n];
        }else if(e.currentStyle){
            return e.currentStyle[n];
        }else if(document.defaultView && document.defaultView.getComputedStyle){
            n = n.replace(/([A-Z])/g,'-$1');
            n = n.toLowerCase();
            var s = document.defaultView.getComputedStyle(e,null);
            if(s){
                return s.getPropertyValue(n);
            }else{
                return null;
            }
        }
    }
});

DOMExtend('getStyle', function (n){
    var _this = this;
    if(_this.style[n]){
        return _this.style[n];
    }else if(_this.currentStyle){
        return _this.currentStyle[n];
    }else if(document.defaultView && document.defaultView.getComputedStyle){
        n = n.replace(/([A-Z])/g,'-$1');
        n = n.toLowerCase();
        var s = document.defaultView.getComputedStyle(_this,null);
        if(s){
            return s.getPropertyValue(n);
        }else{
            return null;
        }
    }
});

DOMExtend('setStyle', function (o){
    var _this = this;
    var a = {};
    for(var i in o){
        a[i] = _this.style[i];
        _this.style[i] = o[i];
    }
    return a;
});


var EventUtil = {
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    getRelatedTarget: function(e){
        if(e.relatedTarget){
            return e.relatedTarget;
        }else if(e.fromElement){
            return e.fromElement;
        }else if(e.toElement){
            return e.toElement;
        }else{
            return null;
        }
    },
    preventDefault:function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue = false;
        }
    },
    stopPropagation:function(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    isChildorSelf:function(tgt, relObj){
        var _this = tgt;
        return _this === relObj || _this.contains(relObj);
    }

};


function swipedetect(el, callback){
 
 var touchsurface = el,
 swipedir,
 startX,
 startY,
 distX,
 distY,
 threshold = 150, //required min distance traveled to be considered swipe
 restraint = 100, // maximum distance allowed at the same time in perpendicular direction
 allowedTime = 300, // maximum time allowed to travel that distance
 elapsedTime,
 startTime,
 handleswipe = callback || function(swipedir){}
 
 touchsurface.addEventListener('touchstart', function(e){
  var touchobj = e.changedTouches[0]
  swipedir = 'none'
  dist = 0
  startX = touchobj.pageX
  startY = touchobj.pageY
  startTime = new Date().getTime() // record time when finger first makes contact with surface
  //e.preventDefault()
 
 }, false)
 
 touchsurface.addEventListener('touchmove', function(e){
  e.preventDefault() // prevent scrolling when inside DIV
 }, false)
 
 touchsurface.addEventListener('touchend', function(e){
  var touchobj = e.changedTouches[0]
  distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
  distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
  elapsedTime = new Date().getTime() - startTime // get time elapsed
  if (elapsedTime <= allowedTime){ // first condition for awipe met
   if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
    swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
   }
   else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
    swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
   }
  }
  handleswipe(swipedir)
  //e.preventDefault()
 }, false)
}
 
//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
 swipedir contains either "none", "left", "right", "top", or "down"
 if (swipedir =='left')
   alert('You just swiped left!')
})
*/
