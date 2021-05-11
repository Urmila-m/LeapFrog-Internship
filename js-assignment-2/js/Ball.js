function Ball(x, y, color, radius, canvas){
    const self = this;
    this.x = x;
    this.y = y;
    this.width = radius;
    this.height = radius;

    // speed is initialized randomly between 70 to 100
    this.xSpeed = Math.random()*100 + 30;
    this.ySpeed = Math.random()*70 + 30;

    this.myCanvas = canvas;
    this.img = document.createElement('img');
    this.img.style.position = 'absolute';
    this.img.style.top = y + 'px';
    this.img.style.left = x + 'px';
    this.img.style.width = this.width + 'px';
    this.img.style.height = this.height + 'px';
    if(color == 'g'){
        this.img.src = "images/green.png";
    }
    else if(color == 'r'){
        this.img.src = 'images/red.png';
    }
    else if(color == 'y'){
        this.img.src = "images/yellow.png";
    }
    else if(color == 'o'){
        this.img.src = "images/orange.png";
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

                    // collision detected! still overlaps but oscillatory behaviour gone.
                    left = this.x > element.x ? element: this;
                    right = this.x > element.x ? this : element;
                    bottom = this.y > element.y ? this: element;
                    top = this.y > element.y ? element: this;

                    if(!(left.xSpeed < 0 && right.xSpeed > 0)){
                        left.xSpeed = -left.xSpeed;
                        right.xSpeed = -right.xSpeed;
                    }

                    if(!(top.ySpeed<0 && bottom.ySpeed>0)){
                        top.ySpeed = -top.ySpeed;
                        bottom.ySpeed = -bottom.ySpeed;
                    }
                    // this.xSpeed = -this.xSpeed;
                    // this.ySpeed = -this.ySpeed;
                    // element.xSpeed = -element.xSpeed;
                    // element.ySpeed = -element.ySpeed;
            }
        }
    }
}

var canvas = document.getElementById('canvas');
var NO_OF_BALLS = 20;
var colors = ['r', 'g', 'b', 'o', 'y'];
var ballList = [];
for(var i=0; i<NO_OF_BALLS; i++){
    radius = Math.random()*10+20;
    x = Math.random()*(500-radius);
    y = Math.random()*(500-radius);
    ballList.push(new Ball(x, y, colors[i%colors.length], radius, canvas));
}

setInterval(function(){
    for(var i=0; i<ballList.length; i++){
        ballList[i].checkCollision(ballList);
        ballList[i].move();
    }
        
}, 20);
