var ball;
var database, ballPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    // ref() - reference to the location in the database
    ballPosition = database.ref("ball/position");
    // on() - listener
    ballPosition.on("value", readPosition, showError);
}

function readPosition(data) {
    var position = data.val() //val()
    ball.x = position.x;
    ball.y = position.y;
}

function showError(error) {
    console.log(error);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(changeInX,changeInY){
    // set() - writes data
    ballPosition.set({
        x : ball.x + changeInX,
        y : ball.y + changeInY
       })
   
}

