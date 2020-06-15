var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var r = 50;
var cx = r;
var cy = 150;
var angleStart_rad = 0;
var angleEnd_rad = 2 * Math.PI
var dx = 2;
ctx.font = "20px Arial";
canvas.addEventListener("mousedown", MouseDownHandler, false);
var isPaused = false;

document.onkeydown = function(e) {
	if(e.keyCode == 37) isPaused = false; //left
	if(e.keyCode == 39) isPaused = false;//right
}

function MouseDownHandler() {
    isPaused = !isPaused;
}

function draw() {
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cx += dx;
        if (cx + r >= canvas.width) { //bounce from right
            dx = -2;
            isPaused = true;
        }
        if (cx - r <= 0) { //bounce from left
            dx = 2;
            isPaused = true;
        }

        if (dx < 0) {
            drawRightArrow("red", cx - 30, cy - r - 35);
            ctx.fillStyle = "red"; ctx.fillText("dx = " + dx, cx - 30, cy - r - 5);
        } else {
            drawLeftArrow("blue", cx - 30, cy - r - 35);
            ctx.fillStyle = "blue"; ctx.fillText("dx = " + dx, cx - 30, cy - r - 5);
        }

        drawCircle("red", 0, 0, 3);
        drawCircle("red", canvas.width, 0, 3);
        drawCircle("green", cx, cy, r);
        drawCircle("black", cx, cy, 3);
        drawCircle("red", cx + r, cy, 3);
        drawCircle("red", cx - r, cy, 3);

        //diameter line:
        ctx.beginPath();
        ctx.moveTo(cx - r, cy);
        ctx.lineTo(cx + r, cy);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.fillStyle = "blue"; ctx.fillText("cx-r", cx - r, cy + 20);
        ctx.fillStyle = "blue"; ctx.fillText((cx - r), cx - r, cy + 40);
        ctx.fillStyle = "black"; ctx.fillText("cx = " + cx, cx - 30, cy - 5);
        ctx.fillStyle = "blue"; ctx.fillText("cx+r", cx + r - 40, cy + 20);
        ctx.fillStyle = "blue"; ctx.fillText((cx + r), cx + r - 40, cy + 40);
        ctx.fillStyle = "black"; ctx.fillText("x = 0", 0, 15);
        ctx.fillStyle = "black"; ctx.fillText("x = canvas.width = " + canvas.width, canvas.width - 210, 15);
    }
    isPaused = true;
    window.requestAnimationFrame(draw);
}

function drawCircle(color, cx, cy, r) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fill();
    ctx.closePath();
}

function drawRightArrow(color, x, y) {
    drawArrow(color, x, y, false)
}

function drawLeftArrow(color, x, y) {
    drawArrow(color, x, y, true)
}

function drawArrow(color, x, y, isLeft) {
    ctx.beginPath();
    ctx.rect(x, y, r, 6);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = color;
    if (isLeft) {
        ctx.moveTo(x + r, y - 5);
        ctx.lineTo(x + r, y + 11);
        ctx.lineTo(x + r + 8, y + 3);
        ctx.lineTo(x + r, y - 5);
    } else {
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y + 11);
        ctx.lineTo(x - 8, y + 3);
        ctx.lineTo(x, y - 5);
    }
    ctx.fill();
    ctx.closePath();
}

draw();