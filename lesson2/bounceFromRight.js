var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var r = 50;
var cx = r;
var cy = 150;
var angleStart_rad = 0;
var angleEnd_rad = 2 * Math.PI
var dx = 2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cx += dx;
    if (cx + r >= canvas.width) { //bounce from right
        dx = -2;
        isPaused = true;
    }

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(draw);
}

draw();