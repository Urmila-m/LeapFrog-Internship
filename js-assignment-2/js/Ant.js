function Ant(x, y, canvas){
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
    this.img.style.width = this.width + 'px';
    this.img.style.height = this.height + 'px';
    this.img.style.position = 'absolute';
    this.img.style.top = y + 'px';
    this.img.style.left = x + 'px';
    this.img.style.border = 'solid black 1px';
    this.img.src = 'images/ant-icon.png';
    this.myCanvas.appendChild(this.img);
}

Ant.prototype.checkPointInsideBoundary= function(x, y){
    if (this.x <= x && x <= (this.x + this.width) && this.y <= y && y <= (this.y + this.height)){
        return true;
    }
    else{
        return false;
    }
}

Ant.prototype.move = function(){
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

Ant.prototype.checkCollision = function(antList){
    for(var i=0; i<antList.length; i++){
        if(this!==antList[i]){
            element = antList[i];
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
var NO_OF_ANTS = 5;
var antList = [];
for(var i=0; i<NO_OF_ANTS; i++){
    x = Math.random()*450;
    y = Math.random()*450;
    antList.push(new Ant(x, y, canvas));
}

setInterval(function(){
    for(var i=0; i<antList.length; i++){
        antList[i].checkCollision(antList);
        antList[i].move();
    }
}, 20);

canvas.addEventListener('click', function(e){
    canvasLeft = canvas.getBoundingClientRect()['x'];
    canvasTop = canvas.getBoundingClientRect()['y'];

    // position of mouse click relative to canvas
    x = e.clientX - canvasLeft;
    y = e.clientY - canvasTop;

    for(var i=0; i<antList.length; i++){
        if(antList[i].checkPointInsideBoundary(x, y)){
            canvas.removeChild(antList[i].img);
            antList.splice(i, 1);
        }
    }
});