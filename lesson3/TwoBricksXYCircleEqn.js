var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 10; var brickHeight = 60;
var brick1X = 30; var brick1Y = (canvas.height - brickHeight)/2;
var brick2X = canvas.width - 20 - brickWidth; var brick2Y = (canvas.height - brickHeight)/2;
var ballRadius = 20; var ballX = canvas.width / 2; var ballY = canvas.height/2;
var brickColor = "blue"

var speed = 4;
var dx = -speed; //move left
var dy = -speed; //move up

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    var ballTop = ballY - ballRadius;
    var ballBottom = ballY + ballRadius;
    var ballLeft = ballX - ballRadius;
    var ballRight = ballX + ballRadius;
    //Check canvas hit
    if (ballRight >= canvas.width) { //ball hits right side of canvas
        dx = -speed; //move left
    }
    if (ballLeft <= 0) { //ball hits left side of canvas
        dx = speed; //move right
    }
    if (ballTop <= 0) { //ball hits top side of canvas
        dy = speed; //move down
    }
    if (ballBottom >= canvas.height) { //ball hits down side of canvas
        dy = -speed; //move up
    } 

    //Check brick/racket hit
    var brick1Top = brick1Y;
    var brick1Bottom = brick1Y + brickHeight;
    var brick1Right = brick1X + brickWidth;
    if (intersects(ballX, ballY, ballRadius, brick1X-brickWidth/2, brick1Y+brickHeight/2, brickWidth, brickHeight)) { //ball hits right side of brick
        dx = speed; //move right
    } 
    var brick2Top = brick2Y;
    var brick2Bottom = brick2Y + brickHeight;
    var brick2Left = brick2X;
    if (intersects(ballX, ballY, ballRadius, brick2X+brickWidth/2, brick2Y+brickHeight/2, brickWidth, brickHeight)) { //ball hits left side of brick
        dx = -speed; //move left
    }
    window.requestAnimationFrame(animate);
}

/*https://stackoverflow.com/a/402010/51358
  Return true if circle and rect intersect */
function intersects(circleX, circleY, circleRadius, rectX, rectY, rectWidth, rectHeight)
{
    var circleDistanceX = Math.abs(circleX - rectX);
    var circleDistanceY = Math.abs(circleY - rectY);

    if (circleDistanceX > (rectWidth/2 + circleRadius)) { return false; }
    if (circleDistanceY > (rectHeight/2 + circleRadius)) { return false; }

    if (circleDistanceX <= (rectWidth/2)) { return true; } 
    if (circleDistanceY <= (rectHeight/2)) { return true; }

    cornerDistance_sq = Math.pow(circleDistanceX - rectWidth/2, 2) +  Math.pow(circleDistanceY - rectHeight/2, 2);
    return (cornerDistance_sq <= Math.pow(circleRadius, 2));
}

function drawBall() {
    ballX += dx;
    ballY += dy;
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(ballX, ballY, ballRadius, angleStart_rad, angleEnd_rad);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    ctx.beginPath();
    ctx.rect(brick1X, brick1Y, brickWidth, brickHeight);
    ctx.rect(brick2X, brick2Y, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}
