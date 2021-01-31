var nRow = 3; var nCol = 7;
var brickWidth; var brickHeight = 15; var bricks = [];
var r = 8; var cx = r; var cy;
var dxRight = 6; var dxLeft = -dxRight; var dx = dxRight; var dyUp = -6; var dyDown = -dyUp; var dy = dyUp;
var bricksHit = 0;
var ballTrail = [];

function setup() {
    createCanvas(600, 400);
    brickWidth = Math.floor(width / nCol / 10) * 10;
    cy = height - r
    createBricks();
  }

  function draw() {
    background("lightgrey");
    drawBall();
    drawBricks();
    checkBallCollisionWithCanvas(cy, r)
}

function createBricks() {
    for (let iRow = 0; iRow < nRow; iRow++) {
        for (let iCol = 0; iCol < nCol; iCol++) {
            var brick = {
                x: 10 + iCol * (brickWidth + 5),
                y: 70 + iRow * (brickHeight + 10),
                w: brickWidth,
                h: brickHeight,
                color: "blue",
                isNotHit: true
            };
            bricks.push(brick);
        }
    }
}

function drawBall() {
    
    if (bricksHit === bricks.length) {
        fill(color("red"))
    } else {
        fill(color("yellow"))
    }
    cx += dx;
    cy += dy;
    ballTrail.push({ cx, cy });
    if (ballTrail.length > 20) {
        ballTrail.shift(); //remove from the beginning of the array
    }
    stroke("white")
    for (let i = 0; i < ballTrail.length; i++) {
        circle(ballTrail[i].cx, ballTrail[i].cy, 1);
    }
    stroke("grey")
    circle(cx, cy, r);
}

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].y += 0.1; //move bricks down
        bricks[i].isNotHit = checkBallCollisionWithBrick(bricks[i].isNotHit, bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h)
        if (bricks[i].isNotHit) { //don't draw hit bricks
            fill(color(bricks[i].color))
            rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        }
    }
}

function checkBallCollisionWithBrick(isNotHit, x, y, w, h) {
    if (isNotHit) { //Check collision only for bricks that were not hit before
        if (cx + r >= x && cx - r <= x + w) { //horizontal hit check
            if (cy <= y + h && cy >= y) {
                dx = -dx;
                bricksHit++;
                isNotHit = false;
            }
        }
        if (cy - r <= y + h && cy + r >= y) { //vertical hit check
            if (cx <= x + w && cx >= x) {
                dy = -dy;
                bricksHit++;
                isNotHit = false;
            }
        }
    }
    return isNotHit;
}

function checkBallCollisionWithCanvas() {
    if (cy + r >= height) dy = dyUp; //bounce from bottom
    if (cy - r <= 0) dy = dyDown; //bounce from top
    if (cx + r >= width) dx = dxLeft; //bounce from right
    if (cx - r <= 0) dx = dxRight; //bounce from left
}
