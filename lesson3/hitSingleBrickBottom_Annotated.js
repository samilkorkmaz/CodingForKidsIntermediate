var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 26;
var r = 30; var cx = 240; var cy = canvas.height - r;
var dy = -2; //initial motion is up
var brickColor = "blue"
var brickX = cx- brickWidth / 2;
var brickY = 100;

ctx.font = "22px Arial";
var isPaused = false;

document.onkeydown = function(e) {
	if(e.keyCode == 38) isPaused = false; //up arrow
	if(e.keyCode == 40) isPaused = false;//down arrow
}

animate();

function animate() {
    if (!isPaused) {
        clearCanvas();
        cy += dy; //move ball
        drawBricks();
        checkBallCollisionWithCanvas();
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
        var str = "y = " + (brickY + brickHeight);
        ctx.fillStyle = "black"; ctx.fillText(str, brickX + brickWidth, brickY + brickHeight);
        ctx.fillStyle = "black"; ctx.fillText("y = canvas.height = " + canvas.height, 0, canvas.height - 5);
    }
    isPaused = true;
    window.requestAnimationFrame(animate);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(color, cx, cy, r) {
    ctx.beginPath();
    ctx.fillStyle = color;
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    checkBallCollisionWithBrick();
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = brickColor;
    ctx.fill();
    ctx.closePath();
}

function checkBallCollisionWithBrick() {
    if (cy - r <= brickY + brickHeight) { //ball hits bottom of brick
        brickColor = "red";
        dy = -dy; //bounce down from brick
    }
}

function checkBallCollisionWithCanvas() {
    if (cy + r >= canvas.height) dy = -dy; //bounce up from bottom
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