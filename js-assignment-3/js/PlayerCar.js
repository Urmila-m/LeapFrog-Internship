class PlayerCar{
    constructor(lane){
        const self = this;
        this.lane = lane;
        this.score = 0;
        this.car = document.createElement('img');
        this.car.style.bottom = '0px';
        this.car.style.width = '80px';
        this.car.src = "images/white.png";
        this.lane.appendChild(this.car);
        this.height = 161;
        this.car.style.position = 'absolute';
        this.car.style.left = (this.lane.clientWidth/2 - this.car.clientWidth/2) + 'px';

    }

    changeLane(lane){
        this.lane.removeChild(this.car);
        this.lane = lane;
        this.lane.appendChild(this.car);
    }

    detectCollision(obstacle){
        if(obstacle.lane === this.lane){
            if(((obstacle.y + obstacle.height) >= (this.lane.clientHeight - this.height)) && obstacle.y <= this.lane.clientHeight){
                return true;
                
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }

    }
}