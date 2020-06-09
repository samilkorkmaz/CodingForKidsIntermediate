var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
nRow = 3; nCol = 7; var defBrickColor = "blue";
var brickWidth = Math.floor(canvas.width / nCol / 10) * 10; var brickHeight = 15; var bricks = [];
var radius = 4; var cx = radius; var cy = canvas.height - radius;
var dx0 = 4; var dx = dx0; var dy0 = -4; var dy = dy0;
var bricksHit = 0;

function start() {
    createBricks();
    animate();
}

function createBricks() {
    for (let iRow = 0; iRow < nRow; iRow++) {
        for (let iCol = 0; iCol < nCol; iCol++) {
            var brick = {
                w: brickWidth, h: brickHeight,
                x: 10 + iCol * (brickWidth + 5),
                y: 70 + iRow * (brickHeight + 10),
                color: defBrickColor,
                isNotHit: true
            };
            bricks.push(brick);
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cx += dx;
    cy += dy;
    moveBall(cx, cy);
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].y += 0.1;
        if (bricks[i].isNotHit) { //check collision
            if (cx >= bricks[i].x && cx <= bricks[i].x + bricks[i].w) {
                if (cy - radius <= bricks[i].y + bricks[i].h && cy + radius >= bricks[i].y + bricks[i].h) { //hit brick from bottom
                    bricksHit++;
                    bricks[i].isNotHit = false;
                    dy = -dy0; //bounce downward
                } else if (cy + radius >= bricks[i].y && cy - radius <= bricks[i].y) { //hit brick from top
                    bricksHit++;
                    bricks[i].isNotHit = false;
                    dy = dy0; //bounce upward
                }
            }
        }
        if (bricks[i].isNotHit) { //don't draw hit bricks because their lightgray color will obscure the ball
            ctx.beginPath();
            ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
            ctx.fillStyle = bricks[i].color;
            ctx.fill();
            ctx.closePath();
        }
    }
    //Collision with canvas:
    if (cy + radius >= canvas.height) dy = dy0; //bounce from bottom
    if (cy - radius <= 0) dy = -dy0; //bounce from top
    if (cx + radius >= canvas.width) dx = -dx0; //bounce from right
    if (cx - radius <= 0) dx = dx0; //bounce from left
    window.requestAnimationFrame(animate);
}

function checkHit(isNotHit, cx, cy, radius, x, y, w, h) {
    if (isNotHit) {
        //TODO Add brick collision logic here
    }
    //Collision with canvas:
    if (cy + radius >= canvas.height) dy = dy0; //bounce from bottom
    if (cy - radius <= 0) dy = -dy0; //bounce from top
    if (cx + radius >= canvas.width) dx = -dx0; //bounce from right
    if (cx - radius <= 0) dx = dx0; //bounce from left
}

var ballTrail = [];
function moveBall(cx, cy) {
    ballTrail.push({ cx, cy });
    if (ballTrail.length > 20) {
        ballTrail.shift(); //remove from the beginning of the array
    }
    for (let i = 0; i < ballTrail.length; i++) {
        ctx.beginPath();
        ctx.arc(ballTrail[i].cx, ballTrail[i].cy, 1, 0, 2 * Math.PI);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    }
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, radius, angleStart_rad, angleEnd_rad);
    if (bricksHit === bricks.length) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.fill();
    ctx.closePath();
}

start();