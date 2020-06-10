var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15; var bricks = [];
var radius = 7; var cx = radius; var cy = canvas.height - radius;
var dxRight = 2; var dxLeft = -dxRight; var dx = dxRight; var dyUp = -2; var dyDown = -dyUp; var dy = dyUp;
var bricksHit = 0;

start();

function start() {
    createBricks();
    animate();
}

function createBricks() {
    for (let i = 0; i < 7; i++) {
        var brick = {
            x: 10 + i * (brickWidth + 5), 
            y: 60, 
            w: brickWidth, 
            h: brickHeight,            
            color: "blue",
            isNotHit: true
        };
        bricks.push(brick);
    }
}

function animate() {
    clearCanvas();
    drawBall();
    drawBricks();
    checkBallCollisionWithCanvas(cy, radius)
    window.requestAnimationFrame(animate);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
    cx += dx;
    cy += dy;
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, radius, angleStart_rad, angleEnd_rad);
    if(bricksHit === bricks.length) {
        ctx.fillStyle = "red"; //change ball color to red if all bricks have been hit
    } else {
        ctx.fillStyle = "green";
    }
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].isNotHit = checkBallCollisionWithBrick(bricks[i].isNotHit, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)
        if (bricks[i].isNotHit) { //don't draw hit bricks
            ctx.beginPath();
            ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
            ctx.fillStyle = bricks[i].color;
            ctx.fill();
            ctx.closePath();
        }
    }
}

function checkBallCollisionWithBrick(isNotHit, x, y, w, h) {
    if (isNotHit) { //Check collision only for bricks that were not hit before
        if (cx >= x && cx <= x + w) {
            if (cy - radius <= y + h && cy + radius >= y + h) { //ball hits bottom of brick
                bricksHit++;
                isNotHit = false;
                dy = -dyUp; //bounce downward
            } else if (cy + radius >= y && cy - radius <= y) { //ball hits bottom of brick
                bricksHit++;
                isNotHit = false;
                dy = dyUp; //bounce upward
            }
        }
    }
    return isNotHit;
}

function checkBallCollisionWithCanvas() {
    if (cy + radius >= canvas.height) dy = dyUp; //bounce from bottom
    if (cy - radius <= 0) dy = dyDown; //bounce from top
    if (cx + radius >= canvas.width) dx = dxLeft; //bounce from right
    if (cx - radius <= 0) dx = dxRight; //bounce from left
}