var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 15; var bricks = [];
var radius = 7; var cx = radius; var cy = canvas.height - radius;
var dx0 = 2; var dx = dx0; var dy0 = -2; var dy = dy0;
var bricksHit = 0;

function start() {
    createBricks();
    animate();
}

function createBricks() {
    for (let i = 0; i < 7; i++) {
        var brick = {
            w: brickWidth, h: brickHeight, x: 10 + i * (brickWidth + 5), y: 60, 
            color: "blue",
            isNotHit: true
        };
        bricks.push(brick);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cx += dx;
    cy += dy;
    moveBall(cx, cy);
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].isNotHit = checkHit(bricks[i].isNotHit, cx, cy, radius, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)
        if (bricks[i].isNotHit) { //don't draw hit bricks
            ctx.beginPath();
            ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
            ctx.fillStyle = bricks[i].color;
            ctx.fill();
            ctx.closePath();
        }
    }
    window.requestAnimationFrame(animate);
}

function checkHit(isNotHit, cx, cy, radius, x, y, w, h) {
    if (isNotHit) {
        if (cx >= x && cx <= x + w) {
            if (cy - radius <= y + h && cy + radius >= y + h) { //hit brick from bottom
                bricksHit++;
                isNotHit = false;
                dy = -dy0; //bounce downward
            } else if (cy + radius >= y && cy - radius <= y) { //hit brick from top
                bricksHit++;
                isNotHit = false;
                dy = dy0; //bounce upward
            }
        }
    }
    //Collision with canvas:
    if (cy + radius >= canvas.height) dy = dy0; //bounce from bottom
    if (cy - radius <= 0) dy = -dy0; //bounce from top
    if (cx + radius >= canvas.width) dx = -dx0; //bounce from right
    if (cx - radius <= 0) dx = dx0; //bounce from left
    return isNotHit;
}

function moveBall(cx, cy) {
    ctx.beginPath();
    var angleStart_rad = 0;
    var angleEnd_rad = 2 * Math.PI
    ctx.arc(cx, cy, radius, angleStart_rad, angleEnd_rad);
    if(bricksHit === bricks.length) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.fill();
    ctx.closePath();
}

start();