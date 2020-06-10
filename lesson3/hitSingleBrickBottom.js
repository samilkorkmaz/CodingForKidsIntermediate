var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15;
var radius = 7; var cx = canvas.width/2; var cy = canvas.height - radius;
var dy = -2; //initial motion is up
var brickColor = "blue"

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cy += dy;
    moveBall(cx, cy);
    var x = canvas.width/2 - brickWidth/2;
    var y = 60;
    checkHit(cy, radius, y, brickHeight);
    ctx.beginPath();    
    ctx.rect(x, y, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(animate);
}

function checkHit(cy, radius, y, h) {
    if (cy - radius <= y + h) {
        brickColor = "red";
        dy = 2; //bounce down from brick
    }
    if (cy + radius >= canvas.height) dy = -2; //bounce up from bottom
}

function moveBall(cx, cy) {
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, radius, angleStart_rad, angleEnd_rad);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

animate();