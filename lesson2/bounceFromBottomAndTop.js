var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var r = 50;
var cx = 240;
var cy = r;
var angleStart_rad = 0;
var angleEnd_rad = 2 * Math.PI
var dy = 2;
ctx.font = "22px Arial";
canvas.addEventListener("mousedown", MouseDownHandler, false);
var isPaused = false;

function MouseDownHandler() {
    isPaused = !isPaused;
}

function draw() {
    if (!isPaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        cy += dy;
        if (cy + r >= canvas.height) { //bounce from bottom
            dy = -2;
            isPaused = true;
        }
        if (cy - r <= 0) { //bounce from top
            dy = 2;
            isPaused = true;
        }

        if (dy < 0) {
            drawUpArrow("red", cx - 170, cy - 30);
            ctx.fillStyle = "red"; ctx.fillText("dy = " + dy, cx - 150, cy);
        } else {
            drawDownArrow("blue", cx - 170, cy - 30);
            ctx.fillStyle = "blue"; ctx.fillText("dy = " + dy, cx - 150, cy);
        }

        drawCircle("red", 0, 0, 3);
        drawCircle("red", 0, canvas.height, 3);
        drawCircle("green", cx, cy, r);
        drawCircle("black", cx, cy, 3);
        drawCircle("red", cx, cy + r, 3);
        drawCircle("red", cx, cy - r, 3);

        //diameter line:
        ctx.beginPath();
        ctx.moveTo(cx, cy - r);
        ctx.lineTo(cx, cy + r);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.fillStyle = "blue"; ctx.fillText("cy-r = " + (cy - r), cx + 2, cy - r + 15);
        ctx.fillStyle = "black"; ctx.fillText("cy = " + cy, cx + 2, cy + 5);
        ctx.fillStyle = "blue"; ctx.fillText("cy+r = " + (cy + r), cx + 2, cy + r - 5);
        ctx.fillStyle = "black"; ctx.fillText("y = 0", 0, 15);
        ctx.fillStyle = "black"; ctx.fillText("y = canvas.height = " + canvas.height, 0, canvas.height - 5);
    }
    window.requestAnimationFrame(draw);
}

function drawCircle(color, cx, cy, r) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fill();
    ctx.closePath();
}

function drawDownArrow(color, x, y) {
    drawArrow(color, x, y, true)
}

function drawUpArrow(color, x, y) {
    drawArrow(color, x, y, false)
}

function drawArrow(color, x, y, isDown) {
    ctx.beginPath();
    ctx.rect(x, y, 6, r);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = color;
    if (isDown) {
        ctx.moveTo(x - 5, y + r);
        ctx.lineTo(x + 11, y + r);
        ctx.lineTo(x + 3, y + r + 8);
        ctx.lineTo(x - 5, y + r);
    } else {
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 11, y);
        ctx.lineTo(x + 3, y - 8);
        ctx.lineTo(x - 5, y);
    }
    ctx.fill();
    ctx.closePath();
}

draw();