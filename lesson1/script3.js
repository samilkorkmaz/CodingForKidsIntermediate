var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
var x = 40;
var y = 60;
var dx = 50;
var dy = 70;
ctx.rect(x, y, dx, dy);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

ctx.beginPath();
var cx = 240;
var cy = 160;
ctx.moveTo(cx, cy);
var r = 50;
var angleStart_rad = 0;
var angleEnd_rad = Math.PI/2
ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.closePath();