var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 15; var brickHeight = 50;
var brickX = 30; var brickY = (canvas.height - brickHeight)/2;
var radius = 7; var cx = canvas.width / 2; var cy = canvas.height/2;
var brickColor = "blue"

var dx = -2; //move left

animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    if (cx + radius >= canvas.width) { //ball hits right side of canvas
        dx = -2; //move left
    } 

    if (cx - radius <= brickX + brickWidth) { //ball hits right side of brick
        dx = 2; //move right
    } 
    window.requestAnimationFrame(animate);
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
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}
