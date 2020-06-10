var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15;
var radius = 7; var cx = canvas.width / 2; var cy = canvas.height - radius;
var dyDown = 2; var dyUp = -dyDown; var dy = dyUp; //initial motion is up
var brickColor = "blue"
var x = canvas.width / 2 - brickWidth / 2;
var y = 60;

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
    cy += dy;
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
    if (cy - radius <= y + brickHeight) { //ball hits bottom of brick
        brickColor = "red";
        dy = dyDown; //bounce down from brick
    }
}

function checkBallCollisionWithCanvas() {
    if (cy + radius >= canvas.height) dy = dyUp; //bounce up from bottom
}