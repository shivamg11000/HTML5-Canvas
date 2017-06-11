var no_of_circles = window.innerWidth*(32.25/100);
var circle_max_size = window.innerWidth*(4.46/100);
var circle_min_size = 5;
var colorArray = [ 
                   "#df7852",     // add any color 
                   "#ff9384",
                   "#ffdf00",
                   "#099"
                 ];
/*   canvas   */
var canvas = document.getElementById('myCanvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

var mouse = {
  x : undefined,
  y : undefined
};

function Circle(x, y, dx, dy, color ,r=5){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.r = r;
  
  this.draw = function(){
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI*3.14);
    c.fillStyle = this.color;
    c.fill();
  }
  
  this.update = function(){
    if (this.x-this.r<0 || this.x+this.r>canvas.width){
      this.dx = -this.dx;
    }
    if (this.y-this.r<0 || this.y+this.r>canvas.height){
      this.dy = -this.dy;
    }
    // enlarge the circles in the range of 50 from the mouse 
    if(Math.abs(mouse.x-this.x)<50 && Math.abs(mouse.y-this.y)<50){
      if(this.r<circle_max_size)
         this.r+=1;
    }
    else{
        if(this.r>circle_min_size){
          this.r-=1;
        }
    }
    this.y+= this.dy;
    this.x+= this.dx;
  }
  
}

/* initialising the circles */
circleArray = [];
function init(){
   no_of_circles = window.innerWidth*(32.25/100);
   circle_max_size = window.innerWidth*(4.46/100);
    
   circleArray = [];  
   for (var i=0;i<no_of_circles;i++){
     var x = Math.random()*canvas.width;
     var y = Math.random()*canvas.height;
     var dx = (Math.random()-0.5)*1;
     var dy = (Math.random()-0.5)*1;
     var color = colorArray[Math.floor(Math.random()*colorArray.length)];
     var circle = new Circle(x, y, dx, dy, color);
     circleArray.push(circle); 
   }
}
init();

/* Get mouse coordinates */
canvas.addEventListener('mousemove',function(event){
   mouse.x = event.x;
   mouse.y = event.y;
});
/* resize the window */
window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(); 
  
});

/* Animation function */
function anime(){
   requestAnimationFrame(anime);
   c.clearRect(0,0,canvas.width,canvas.height);

   for(var i=0;i<circleArray.length;i++){
     circleArray[i].draw();
     circleArray[i].update();
   }
}
anime();


