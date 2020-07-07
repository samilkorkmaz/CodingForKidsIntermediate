var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 20; var bricks = [];
var r = 7; var cx = r; var cy = canvas.height - r;
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
            y: 70, 
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
    checkBallCollisionWithCanvas(cy, r)
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
    ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
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
        if (cx + r >= x && cx - r <= x + w) { //horizontal hit check
            if(cy <= y + h && cy >= y) {
                dx = -dx;
                bricksHit++;
                isNotHit = false;
            }             
        }
        if (cy - r <= y + h && cy + r >= y) { //vertical hit check
            if(cx <= x + w && cx >= x) {
                dy = -dy;
                bricksHit++;
                isNotHit = false;
            }
        } 
    }
    return isNotHit;
}

function checkBallCollisionWithCanvas() {
    if (cy + r >= canvas.height) dy = dyUp; //bounce from bottom
    if (cy - r <= 0) dy = dyDown; //bounce from top
    if (cx + r >= canvas.width) dx = dxLeft; //bounce from right
    if (cx - r <= 0) dx = dxRight; //bounce from left
}