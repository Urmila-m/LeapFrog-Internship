function init(canvas){
    colors = ['blue', 'orange', 'yellow'];
    lanes = [];
    for(var i=0; i<3; i++){
        lane = document.createElement('div');
        lane.className += 'lane';
        lanes.push(lane);
        canvas.appendChild(lane); 
    }

    obstacles = [];

    lanes.forEach((element, index) => {
        if(index!==0){
            position = Math.floor(Math.random()*200)+161;
            obstacle = new Obstacle(colors[index], element, -position);
            obstacles.push(obstacle);
        }
    });

    currentLaneIndex = 1;
    player = new PlayerCar(lanes[currentLaneIndex]);

    document.addEventListener('keydown', function(event){
        if(event.key === 'a' && currentLaneIndex>0){
            currentLaneIndex -= 1;
            player.changeLane(lanes[currentLaneIndex]);
        }
        else if(event.key === 'd' && currentLaneIndex<2){
            currentLaneIndex += 1;
            player.changeLane(lanes[currentLaneIndex]);
        }
    });

    return [player, obstacles, lanes];
}

function stopOnCollision(intervalId, btnStart, player, scoreBoard, obstacles, lanes){
    clearInterval(intervalId);
    btnStart.innerHTML = "Over";
    gameOver = document.createElement('div');
    gameOver.innerHTML = "Game Over.";
    canvasContainer = document.getElementsByClassName('canvas-container')[0].children[0];
    canvasContainer.appendChild(gameOver);
    resetBtn = document.createElement('button');
    resetBtn.innerHTML = 'Reset';
    resetBtn.style.backgroundColor = 'red';
    resetBtn.style.color = 'white';
    resetBtn.style.padding = '10px';
    resetBtn.style.margin = '10px 0px';
    resetBtn.addEventListener('click', function(){
        player.score = 0;
        updateScoreBoard(scoreBoard, 0);
        canvasContainer.removeChild(gameOver);
        canvasContainer.removeChild(resetBtn);
        btnStart.innerHTML = "Start Game";
        for(let obstacle of obstacles){
            obstacle.removeFromCanvas();
        }
        obstacles = [];
    });
    canvasContainer.appendChild(resetBtn);
}

function startGame(stopOnCollision, player, obstacles, lanes, scoreBoard, btnStart){
    collision = setInterval(function(){
        for(let element of obstacles){
            if(player.detectCollision(element)){
                stopOnCollision(collision, btnStart, player, scoreBoard, obstacles, lanes); 
            }
            else{
                if(element.hasReachedEnd()){
                    player.score++;
                    updateScoreBoard(scoreBoard, player.score);
                    element.removeFromCanvas();
                    obstacles.splice(obstacles.indexOf(element), 1);
                    
                    position = Math.floor(Math.random()*200)+161;
                    obstacles.push(new Obstacle(element.color, lanes[Math.floor(Math.random()*2)], -position))
                }
                else{
                    element.move();
                }
            }
        }
    }, 20)
}

function updateScoreBoard(scoreBoard, score){
    scoreBoard.innerHTML = score;
}
 
var noOfGameInstances = document.getElementsByClassName('canvas').length;

for(var i=0; i<noOfGameInstances; i++){
    canvas = document.getElementsByClassName('canvas')[i];
    playerObstacles = init(canvas);
    player = playerObstacles[0];
    obstacles = playerObstacles[1];
    scoreBoard = document.getElementsByClassName('score')[i];
    scoreBoard.innerHTML = player.score;
    btnStart = document.getElementsByClassName('btn-start-game')[i];
    btnStart.addEventListener('click', function(){
        btnStart.innerHTML = 'Running';
        startGame(stopOnCollision, player, obstacles, playerObstacles[2], scoreBoard, btnStart);
    });
}
