class Obstacle{
    constructor(color, lane, position){
        this.color = color;
        this.lane = lane;
        this.obstacle = document.createElement('img');
        this.obstacle.src = 'images/' + color + '.png';
        this.obstacle.style.width = '80px';
        this.obstacle.style.height = '161px';
        this.obstacle.style.position = 'absolute';
        this.lane.appendChild(this.obstacle);
        this.y = position;
        this.height = 161;
        this.obstacle.style.top = this.y + 'px';
        this.speed = 100; //100px per sec
        this.obstacle.style.left = (this.lane.clientWidth/2 - this.obstacle.clientWidth/2) + 'px';

    }

    move(){
        this.y += this.speed/50 ;
        this.obstacle.style.top = this.y + 'px';
    }

    hasReachedEnd(){
        if(this.obstacle.y >= this.lane.clientHeight){
            return true;
        }
        else{
            return false;
        }
    }

    removeFromCanvas(){
        this.lane.removeChild(this.obstacle);
    }
}