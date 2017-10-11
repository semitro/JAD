/**
 * Created by semitro on 09.10.17.
 */

$('.plot').bind('click',onPlotClick);

function onPlotClick(inf){

    drawPoint(inf.pageX - document.getElementById("plotCanvas").offsetLeft,
        inf.pageY - document.getElementById("plotCanvas").offsetTop);
}

 function drawPoint(x, y) {
     console.log(x);
     console.log(y);
     var c = document.getElementById("plotCanvas");
     var ctx = c.getContext("2d");
     ctx.beginPath();
     ctx.arc(95,50,2,0,2*Math.PI);
     ctx.arc(95,50,4,0,2*Math.PI);
     ctx.stroke();

    }