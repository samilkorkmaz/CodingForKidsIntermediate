var canvas = document.getElementById("myCanvas"); var ctx = canvas.getContext("2d");
var brickWidth = 50; var brickHeight = 20; var bricks = [];

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
            color: "blue"
        };
        bricks.push(brick);
    }
}

function animate() {
    clearCanvas();
    drawBricks();    
    window.requestAnimationFrame(animate);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        ctx.beginPath();
        ctx.rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        ctx.fillStyle = bricks[i].color;
        ctx.fill();
        ctx.closePath();
    }
}