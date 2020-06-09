var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15;
var radius = 7; var cx = canvas.width/2; var cy = canvas.height - radius;
var dx0 = 2; var dx = dx0; var dy0 = -2; var dy = dy0;
var brickColor = "blue"

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cy += dy;
    moveBall(cx, cy);
    ctx.beginPath();
    var x = canvas.width/2 - brickWidth/2;
    var y = 60;
    ctx.rect(x, y, brickWidth, brickHeight);
    if (cx >= x && cx <= x + brickWidth && cy + radius >= y && cy - radius <= y + brickHeight) {
        brickColor = "red";
        dy = -dy0; //bounce down
    }
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
    if (cy + radius >= canvas.height) dy = dy0; //bounce from bottom
    window.requestAnimationFrame(animate);
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