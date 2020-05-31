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