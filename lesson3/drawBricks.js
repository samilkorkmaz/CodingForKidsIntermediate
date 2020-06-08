var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var brickWidth = 50;
var bricks = [];

function start() {
    createBricks();
    draw();
}

function createBricks() {
    for (let i = 0; i < 7; i++) {
        var brick = { w: brickWidth, h: 25, x: 10 + i * (brickWidth + 5), y: 60 };
        bricks.push(brick);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bricks.length; i++) {
        ctx.beginPath();
        ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }
    window.requestAnimationFrame(draw);
}

start();
