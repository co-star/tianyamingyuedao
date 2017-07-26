    window.onload = function () {
            var container = document.getElementById('container');
            var list = document.getElementById('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 4;
            var animated = false;
            var interval = 3000;
            var timer;
            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && 
                    parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -312 * len + 'px';
                        }
                        if(left<(-312 * len)) {
                            list.style.left = '-312px';
                        }
                        animated = false;
                    }
                }
                go();
            }
            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }

            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 4) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-312);
                showButton();
            }
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 4;
                }
                else {
                    index -= 1;
                }
                animate(312);
                showButton();
            }
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -312 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }
            container.onmouseover = stop;
            container.onmouseout = play;
            play();
        }
/*动画效果*/
var adv={
  DISTANCE:0,//总距离
  DURATION:1000,//总时间
  STEPS:200,//总步数
  step:0,//步长
  interval:0,//每步时间间隔
  timer:null,//保存定时器序号
  moved:0,//保存已经移动的步数
  div:null,//保存广告div
  init:function(){
    this.div=document.getElementById("cebian");
	this.a=document.getElementById("zuola");
    this.DISTANCE=-parseFloat(
      getComputedStyle(this.div).right
    );
    this.interval=this.DURATION/this.STEPS;
    this.step=this.DISTANCE/this.STEPS;
    this.moveRight();
  },
  
  moveStep:function(dir){
    var right=parseFloat(
      getComputedStyle(this.div).right);
    this.div.style.right=
      right+dir*this.step+"px";
    this.moved++;
    if(this.moved==this.STEPS){
      clearInterval(this.timer);
      this.timer=null;
      this.moved=0;
    }
  },
  moveRight:function(){
    this.timer=setInterval(
      this.moveStep.bind(this,1),this.interval);
  },
  moveLeft:function(){
		if(this.timer==null){
		this.timer=setInterval(
			this.moveStep.bind(this,-1),this.interval
		);}
		
  },
	huan:function(){
	if(this.a.innerHTML=="&gt;"){
		this.moveLeft();
		this.a.innerHTML="&lt;"
	}else
	if(this.a.innerHTML=="&lt;"){
		this.moveRight();
		this.a.innerHTML="&gt;"
	}
  }
}
adv.init();
