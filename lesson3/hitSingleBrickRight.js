var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15;
var radius = 7; var cx = canvas.width - radius; var cy = canvas.height / 2;
var dxRight = 2; var dxLeft = -dxRight; var dx = dxLeft; //initial motion is to the left
var brickColor = "blue"
var x = canvas.width / 2 - brickWidth / 2;
var y = cy - brickHeight / 2;

animate();

function animate() {
    clearCanvas();
    drawBall();
    drawBricks();
    checkBallCollisionWithCanvas()
    window.requestAnimationFrame(animate);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
    cx += dx;
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, radius, angleStart_rad, angleEnd_rad);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    checkBallCollisionWithBrick();
    ctx.beginPath();
    ctx.rect(x, y, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}

function checkBallCollisionWithBrick() {
    if (cx - radius <= x + brickWidth) { //ball hits right side of brick
        brickColor = "red";
        dx = dxRight; //bounce right from brick right side
    }
}

function checkBallCollisionWithCanvas() {
    if (cx + radius >= canvas.width) dx = dxLeft; //bounce left from right wall
}