var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 10; var brickHeight = 60;
var brick1X = 10; var brick1Y = (canvas.height - brickHeight)/2;
var brick2X = canvas.width - 10 - brickWidth; var brick2Y = (canvas.height - brickHeight)/2;
var ballRadius = 7; var ballX = canvas.width / 2; var ballY = canvas.height/2;
var brickColor = "blue"

var dx = -2; //move left

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    if (ballX + ballRadius >= canvas.width) { //ball hits right side of canvas
        dx = -2; //move left
    } 

    if (ballX - ballRadius <= brick1X + brickWidth) { //ball hits right side of brick
        dx = 2; //move right
    } 
    if (ballX - ballRadius <= brick2X && ballX + ballRadius >= brick2X) { //ball hits left side of brick
        dx = -2; //move left
    }
    window.requestAnimationFrame(animate);
}

function drawBall() {
    ballX += dx;
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
