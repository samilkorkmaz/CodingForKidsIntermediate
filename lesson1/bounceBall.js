var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cx = 240;
var cy = 0;
var r = 50;
var angleStart_rad = 0;
var angleEnd_rad = 2 * Math.PI
var dy0 = 2;
var dy = dy0;
var dx0 = 2;
var dx = dx0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (cy + r >= canvas.height) { //bounce from bottom
        dy = -dy0;
    }
    if (cy - r <= 0) { //bounce from top
        dy = dy0;
    }
    if (cx + r >= canvas.width) { //bounce from right
        dx = -dx0;
    }
    if (cx - r <= 0) { //bounce from left
        dx = dx0;
    }
    cy += dy;
    cx += dx;
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    window.requestAnimationFrame(draw);
}

draw();