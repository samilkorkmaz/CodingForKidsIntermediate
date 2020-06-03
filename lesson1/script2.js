var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
var x = 40;
var y = 60;
var w = 50;
var h = 70;
ctx.rect(x, y, w, h);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

ctx.beginPath();
var cx = 240;
var cy = 160;
var r = 50;
var angleStart_rad = 0;
var angleEnd_rad = 2*Math.PI
ctx.arc(cx, cy, r, angleStart_rad, angleEnd_rad);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
