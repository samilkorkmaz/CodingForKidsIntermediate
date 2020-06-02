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
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "red";
ctx.stroke();
ctx.fillStyle = "yellow";
ctx.fill();
ctx.closePath();