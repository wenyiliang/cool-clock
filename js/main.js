
//Window.onload=function(){
   var canvas=document.getElementById("clock");
   var cxt=canvas.getContext("2d");

   var width=document.body.clientWidth;
   var height=document.body.clientHeight;
   var MARGINTOP=Math.round(height/5);
  var MARGINLEFT=Math.round(width/10);
   var r=Math.round(width*4/5/108-1);
   const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
   // var width=1349;
   // var height=704;
   // var r=10;
   // var MARGINTOP=20
   // var MARGINLEFT=50;
   var balls=[];
   canvas.width=width;
   canvas.height=height;
   var currentSeconds=getCurrentTime();
   //console.log(currentSeconds);
   draw(cxt);
    window.setInterval(function(){draw(cxt); update();},50);
//}
function update(){
	var newSeconds=getCurrentTime();
    
	var newhour=parseInt(newSeconds/(60*60));
	var newminute=parseInt((newSeconds-newhour*60*60)/60);
	var newmiao=parseInt(newSeconds%60);
	var curhour=parseInt(currentSeconds/(60*60));
	var curminute=parseInt((currentSeconds-curhour*60*60)/60);
	var curmiao=parseInt(currentSeconds%60);
		if(parseInt(newhour/10)!=parseInt(curhour/10)){
			addBall(MARGINLEFT,MARGINTOP,parseInt(curhour/10));
		};
		if(parseInt(newhour%10)!=parseInt(curhour%10)){
			addBall(MARGINLEFT+15*(r+1),MARGINTOP,parseInt(curhour%10));
		};
		if(parseInt(newminute/10)!=parseInt(curminute/10)){
			addBall(MARGINLEFT+39*(r+1),MARGINTOP,parseInt(curminute/10));
		};
		if(parseInt(newminute%10)!=parseInt(curminute%10)){
			addBall(MARGINLEFT+54*(r+1),MARGINTOP,parseInt(curminute%10));
		};
		if(parseInt(newmiao/10)!=parseInt(curmiao/10)){
			addBall(MARGINLEFT+78*(r+1),MARGINTOP,parseInt(curmiao/10));
		};
		if(parseInt(newmiao%10)!=parseInt(curmiao%10)){
			addBall(MARGINLEFT+93*(r+1),MARGINTOP,parseInt(curmiao%10));
		};
	currentSeconds=newSeconds;
	   updateballs();
	   console.log(balls.length);
}
function getCurrentTime(){
	var currentTime=new Date();
	var currentSeconds1=currentTime.getHours()*3600+currentTime.getMinutes()*60+currentTime.getSeconds();
	return currentSeconds1;
}
function addBall(x,y,num){
	for(i=0;i<digit[num].length;i++)
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
                var ball={
                	x:x+j*2*(r+1)+r+1,
                	y:y+i*2*(r+1)+r+1,
                	g:1.5+Math.random(),
                	vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5
                }
			    balls.push(ball);
			}
}
}
function updateballs(){
	for(i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>height-r){
			balls[i].y=height-r;
			balls[i].vy=-Math.abs(balls[i].vy)*0.75;
		}
	}
	var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + r > 0 && balls[i].x -r < width )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}
function draw(cxt){  
	var hour=parseInt(currentSeconds/(60*60));
	var minute=parseInt((currentSeconds-hour*60*60)/60);
	var miao=parseInt(currentSeconds%60);
	cxt.clearRect(0,0,width,height);
	drawdigit(MARGINLEFT,MARGINTOP,parseInt(hour/10),cxt);
	drawdigit(MARGINLEFT+15*(r+1),MARGINTOP,parseInt(hour%10),cxt);
    drawdigit(MARGINLEFT+30*(r+1),MARGINTOP,10,cxt);
    drawdigit(MARGINLEFT+39*(r+1),MARGINTOP,parseInt(minute/10),cxt);
    drawdigit(MARGINLEFT+54*(r+1),MARGINTOP,parseInt(minute%10),cxt);
    drawdigit(MARGINLEFT+69*(r+1),MARGINTOP,10,cxt);
    drawdigit(MARGINLEFT+78*(r+1),MARGINTOP,parseInt(miao/10),cxt);
    drawdigit(MARGINLEFT+93*(r+1),MARGINTOP,parseInt(miao%10),cxt);
    for(i=0;i<balls.length;i++){
    	        cxt.beginPath();
				cxt.fillStyle=colors[Math.floor(Math.random()*10)]
                cxt.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
    }
}
function drawdigit(x,y,num,cxt){
	    cxt.fillStyle="rgb(0,102,153)"
        for(i=0;i<digit[num].length;i++)
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(r+1)+r+1,y+i*2*(r+1)+r+1,r,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
			}		
        }   
}
