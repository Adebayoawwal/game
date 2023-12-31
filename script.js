//borad
var blockSize=25;
var rows=19;
var cols=40;
var board;
var context;
//snake head
var snakeX= blockSize*5;
var snakeY= blockSize*5;


var speedX=0;
var speedY=0;

var snakeBody=[];

//food head
var foodX;
var foodY;


var gameOver= false
window.onload= function(){
    board =document.getElementById("board");
    board.height= rows * blockSize;
    board.width= cols * blockSize;
    context=board.getContext("2d")

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update,1000/10);
}
function update(){
    if(gameOver){
        return;
    }
    context.fillStyle="lime"
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="red"
    context.fillRect(foodX,foodY,blockSize,blockSize);

if(snakeX == foodX && snakeY== foodY){
    snakeBody.push([foodX, foodY   ])
placeFood();
}

for(let i = snakeBody.length-1; i > 0; i--){
 snakeBody[i]=snakeBody[i-1];    
}

if(snakeBody.length){
    snakeBody[0]=[snakeX, snakeY]
}
    context.fillStyle="green"
    snakeX += speedX * blockSize;
    snakeY += speedY  * blockSize; 
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize,blockSize)
    }


    if(snakeX<0 || snakeX > cols*blockSize ||snakeY <0 || snakeY > rows*blockSize){
        gameOver =true;
        alert("Game Over")
        location.reload();
    }

    for (let  i= 0; i < snakeBody.length; i++) {
        if(snakeX== snakeBody[i][0] && snakeY== snakeBody[i][1]){
            gameOver =true;
            alert("Game Over")
            location.reload();
        }   
        
    }
}

function changeDirection(e){
if(e.code == "ArrowUp" && speedY != 1){
speedX=0;
speedY= -1;
}

else if(e.code == "ArrowDown" && speedY != -1){
    speedX=0;
    speedY= 1;
 }

else  if(e.code == "ArrowLeft"&& speedX != 1  ){
     speedX= -1;
     speedY= 0;
 }

else  if(e.code == "ArrowRight" && speedY != -1){
     speedX=1;
    speedY= 0;
 }

}


function placeFood(){
  foodX = Math.floor(Math.random()*cols) * blockSize; 
  foodY = Math.floor(Math.random()*rows) * blockSize;  
 
}