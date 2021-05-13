class Bird{
    constructor(canvas){
        this.element = document.createElement('img');
        this.element.src = MID_FLAP;
        this.element.style.position = 'absolute';
        this.element.style.left = '30%';
        this.element.style.top = '40%';
        this.canvas = canvas;
        this.canvas.appendChild(this.element);

        this.speed = 0.3;
        this.gravity = 0.1;
        this.height = 24;
        this.jumpHeight = 20;
        this.score = 0;

    }
    
    removeFromCanvas(){
        this.canvas.removeChild(this.element);
    }

    changeState(state){
        this.element.src = state;
    }

    moveDown(state){
        this.element.style.top = Math.min(this.element.offsetTop + this.speed, this.canvas.clientHeight - this.height) + 'px';
        this.speed += this.gravity;
        this.changeState(state);
    }

    resetSpeed(){
        this.speed = 0.3;
    }

    moveUp(){
        this.resetSpeed();
        this.element.style.top = Math.max(0, this.element.offsetTop - this.jumpHeight) + 'px';
        console.log(this.jumpHeight);
        this.changeState(UP_FLAP);
    }
    
    hasReachedBottom(){
        if(this.element.offsetTop >= (this.canvas.clientHeight - this.height)){
            return true;
        }
        else{
            return false;
        }
    }

    detectCollision(pipes){
        for(let pipe of pipes){
            // check for top element collision

            var pipeLeft = pipe.topElement.offsetLeft;
            var pipeWidth = pipe.pipeWidth;
        
            if(this.element.offsetLeft < pipeLeft + pipeWidth &&
                this.element.offsetLeft + this.element.clientWidth > pipeLeft){

                    if( this.element.offsetTop < pipe.pipeHeight - pipe.top &&
                        this.element.offsetTop + this.element.clientHeight > 0)
                    {
                        return true;
                    }

                    if(this.element.offsetTop < this.canvas.clientHeight &&
                       this.element.offsetTop + this.element.clientHeight > pipe.pipeHeight - pipe.top + pipe.gap){
                           return true;
                       }
                }

            return false;

        }

    }


}