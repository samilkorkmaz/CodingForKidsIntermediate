var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cx = 240;
var cy = 0;
var r = 50;
var angleStart_rad = 0;
var angleEnd_rad = 2 * Math.PI
var dy = 2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    cy += dy;
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(draw);
}

draw();
