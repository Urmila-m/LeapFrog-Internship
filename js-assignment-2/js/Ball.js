function Ball(x, y, color, canvas){
    const self = this;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;

    // speed is initialized randomly between 30 to 40
    this.xSpeed = Math.random()*10 + 30;
    this.ySpeed = Math.random()*10 + 30;

    this.myCanvas = canvas;
    this.img = document.createElement('img');
    this.img.style.position = 'absolute';
    this.img.style.top = y + 'px';
    this.img.style.left = x + 'px';
    if(color == 'g'){
        this.img.src = "images/green.png";
    }
    else if(color == 'r'){
        this.img.src = 'images/red.png';
    }
    else{
        this.img.src = 'images/blue.png';
    }
    this.myCanvas.appendChild(this.img);
}
    Ball.prototype.move = function(){
            // moving right
            if(this.xSpeed>0){
                this.x = Math.min(450, this.x + this.xSpeed/50);
                this.img.style.left = this.x + 'px';
            }
            // moving left
            else{
                this.x = Math.max(0, this.x + this.xSpeed/50);
                this.img.style.left = this.x + 'px';
            }
            // moving down
            if(this.ySpeed>0){
                this.y = Math.min(450, this.y + this.ySpeed/50);
                this.img.style.top = this.y + 'px';
            }
            // moving up
            else{
                this.y = Math.max(0, this.y + this.ySpeed/50);
                this.img.style.top = this.y + 'px';
            }
            if(this.x == 0 || this.x == 450){
                this.xSpeed = -this.xSpeed;   
            }
            if(this.y == 0 || this.y == 450){
                this.ySpeed = -this.ySpeed;
            }
    }

Ball.prototype.checkCollision = function(ballList){
    for(var i=0; i<ballList.length; i++){
        if(this!==ballList[i]){
            element = ballList[i];
            if (this.x < element.x + element.width &&
                this.x + this.width > element.x &&
                this.y < element.y + element.height &&
                this.y + this.height > element.y) {

                    // collision detected!
                    this.xSpeed = -this.xSpeed;
                    this.ySpeed = -this.ySpeed;
                    element.xSpeed = -element.xSpeed;
                    element.ySpeed = -element.ySpeed;
            }
        }
    }
}

var canvas = document.getElementById('canvas');
var NO_OF_BALLS = 5;
var colors = ['r', 'g', 'b'];
var ballList = [];
for(var i=0; i<NO_OF_BALLS; i++){
    x = Math.random()*450;
    y = Math.random()*450;
    ballList.push(new Ball(x, y, colors[i%colors.length], canvas));
}

setInterval(function(){
    for(var i=0; i<ballList.length; i++){
        ballList[i].checkCollision(ballList);
        ballList[i].move();
    }
        
}, 20);