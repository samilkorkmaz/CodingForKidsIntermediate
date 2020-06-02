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