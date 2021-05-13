class Game{
    constructor(){
        this.base = document.getElementById("base");
        this.canvas = document.getElementById('canvas')
        this.infoDisplay = document.getElementById("info-display");
        this.infoDisplayElement = document.createElement('img');
        this.infoDisplayElement.src = 'images/message.png';
        this.infoDisplay.appendChild(this.infoDisplayElement);
        
        this.flapPosition = ['images/redbird-midflap.png', 'images/redbird-upflap.png', 'images/redbird-downflap.png'];
        this.pipes = [];

        this.score = document.getElementById('score');
        this.highScore = document.getElementById('high-score');

        this.highScore.innerHTML = localStorage.getItem('highScore')=== null? 0: localStorage.getItem('highScore');

        this.resetBtn = document.getElementById('reset');

        this.resetBtn.addEventListener('click', function(){
            this.reset();
        }.bind(this));

        this.infoDisplay.addEventListener('click', function(){
            this.startGame();
        }.bind(this));

    }

    reset(){
        this.stopCollisionCheck();
        this.stopBackgroundAnimation();
        this.stopPipeCreation();
        this.stopPipeAnimation();
        this.stopBirdAnimation();
        this.score.innerHTML = 0;
        this.highScore.innerHTML = localStorage.getItem('highScore')=== null? 0: localStorage.getItem('highScore');
        this.infoDisplayElement.src = 'images/message.png';

        for(let pipe of this.pipes){
            pipe.removeFromCanvas();
        }

        this.bird.removeFromCanvas();
        delete this.bird;
        this.pipes = [];
    }

    startGame(){
        this.bird = new Bird(canvas);
        this.startBackgroundAnimation();
        this.setPipes();
        this.setBird();

        this.collisionInterval = setInterval(function(){
            if(this.bird.detectCollision(this.pipes)){
                this.gameOver();
                clearInterval(this.collisionInterval);
            }
        }.bind(this), 20);
       
        document.addEventListener('keydown', function(e){ 
                if(e.key === ' '){
                    clearInterval(this.birdAnimation);
                    this.bird.moveUp();
                    this.setBird();
                }
            }.bind(this));
    }

    gameOver(){
        this.stopPipeAnimation();
        this.stopBackgroundAnimation();
        this.stopPipeCreation();
        this.infoDisplayElement.src = 'images/gameover.png';

        if(localStorage.getItem('highScore') !== null){
            if(this.bird.score > localStorage.getItem('highScore')){
                localStorage.setItem('highScore', this.bird.score);
            }
        }
        else{
            localStorage.setItem('highScore', this.bird.score);
        }
    }

    startBackgroundAnimation(){ 
        this.infoDisplay.style.display = 'None';
        this.base.style.animation = 'animatedBackground 3s linear infinite';
    }

    stopBackgroundAnimation(){
        this.infoDisplay.style.display = 'block';
        this.base.style.animation = '';
    }

    stopPipeCreation(){
        clearInterval(this.pipeCreation);
    }

    stopBirdAnimation(){
        clearInterval(this.birdAnimation);
    }

    stopPipeAnimation(){
        clearInterval(this.pipeMovementAnimation);
    }

    stopCollisionCheck(){
        clearInterval(this.collisionInterval);
    }

    setPipes(){
        // for generating new pipe in every 3 sec
        this.pipeCreation = setInterval(function(){
            var pipe = new Pipe(this.canvas);
            this.pipes.push(pipe);

            // for movement of pipe
            this.pipeMovementAnimation = setInterval(function(){
                if(pipe.hasReachedEnd()){
                    this.bird.score++;
                    this.score.innerHTML = this.bird.score;
                    pipe.removeFromCanvas();
                    this.pipes.splice(this.pipes.indexOf(pipe), 1);
                }
                else{
                    pipe.move();
                }
            }.bind(this), 50);
        }.bind(this), 3000);
    }

    setBird(){
        var i = 0;
        this.birdAnimation = setInterval(function(){
            if(this.bird.hasReachedBottom()){
                this.gameOver();
            }
            else{
                i = (i+1)%3;
                this.bird.moveDown(this.flapPosition[i]);
            }
        }.bind(this), 20);
    }
}

x = new Game();
