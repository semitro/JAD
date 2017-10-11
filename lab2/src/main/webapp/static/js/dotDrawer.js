/**
 * Created by semitro on 09.10.17.
 */

$('#plotCanvas').bind('click',onPlotClick);

function onPlotClick(inf){
    drawPoint(inf.offsetX,inf.offsetY);
}

function drawPoint(x, y) {
    console.log(x);
    console.log(y);
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,2,0,2*Math.PI);
    ctx.arc(x,y,4,0,2*Math.PI);
    ctx.stroke();
}