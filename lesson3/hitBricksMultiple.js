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
        var brick = { w: brickWidth, h: brickHeight, x: 10 + i * (brickWidth + 5), y: 60, color: "blue" };
        bricks.push(brick);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cx += dx;
    cy += dy;
    moveBall(cx, cy);
    for (let i = 0; i < bricks.length; i++) {
        ctx.beginPath();
        ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        if (cx >= bricks[i].x && cx <= bricks[i].x + bricks[i].w &&
            cy + radius >= bricks[i].y && cy - radius <= bricks[i].y + bricks[i].h) {
            if (bricks[i].color === "blue") bricksHit++;
            console.log("bricksHit: ", bricksHit)
            bricks[i].color = "red";
            dy = -dy0; //bounce
        }
        ctx.fillStyle = bricks[i].color;
        ctx.fill();
        ctx.closePath();
    }
    if (cy + radius >= canvas.height) dy = dy0; //bounce from bottom
    if (cy - radius <= 0) dy = -dy0; //bounce from top
    if (cx + radius >= canvas.width) dx = -dx0; //bounce from right
    if (cx - radius <= 0) dx = dx0; //bounce from left
    window.requestAnimationFrame(animate);
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