class Pipe{
    constructor(canvas){
        this.canvas = canvas;
        this.speed = 5;
        this.gap = 100;
        this.pipeHeight = 320;
        this.pipeWidth = 52;

        // generate random number betweeb 80 and 306:
        // Math.floor(Math.random() * (max - min + 1) + min);
        this.top = Math.floor(Math.random() * (306 - 80 + 1) + 80);

        this.topElement = document.createElement('img');
        this.topElement.style.position = 'absolute';
        this.topElement.src = 'images/pipe-green-top.png';
        this.topElement.style.top = '-'+ this.top + 'px';
        this.topElement.style.left = this.canvas.clientWidth + 'px';

        this.bottomElement = document.createElement('img');
        this.bottomElement.src = 'images/pipe-green-bottom.png';
        this.bottomElement.style.position = 'absolute';
        this.bottomElement.style.left = this.canvas.clientWidth;
        this.bottomElement.style.top = this.pipeHeight - this.top + this.gap + 'px';
        this.bottomElement.style.left = this.canvas.clientWidth + 'px';

        this.canvas.appendChild(this.topElement);
        this.canvas.appendChild(this.bottomElement);
    }

    move(){
        this.topElement.style.left = this.topElement.offsetLeft - this.speed + 'px';
        this.bottomElement.style.left = this.bottomElement.offsetLeft - this.speed +'px';
    }

    removeFromCanvas(){
        this.canvas.removeChild(this.topElement);
        this.canvas.removeChild(this.bottomElement);
    }

    hasReachedEnd(){
        if(this.topElement.offsetLeft + this.pipeWidth <= 0){
            return true;
        }
        else{
            return false;
        }
    }
}