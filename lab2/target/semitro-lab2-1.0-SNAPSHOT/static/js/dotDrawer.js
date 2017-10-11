/**
 * Created by semitro on 09.10.17.
 */

$('#plotCanvas').bind('click',onPlotClick);

function onPlotClick(inf){
    // isNumber is defined in validateAreaForm.js
    var err = isEverythingOk()
    if( err == "OK"){
        drawPoint(inf.offsetX,inf.offsetY);
        // Пересчёт в координаты математической модели
        console.log(calculateX(inf.offsetX,document.forms[0].R.value));
        console.log(calculateY(inf.offsetY,document.forms[0].R.value));

    }
    else
        toastr.error("Ммвыв",err);

}

function drawPoint(x, y) {
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,2,0,2*Math.PI);
    ctx.arc(x,y,4,0,2*Math.PI);
    ctx.stroke();
}
// Внимание! Всё привязано к конкретному изображению.
// Эмпирически - для точки (0;0) offsetX = 112 offsetY = 111
//               для точки (R;0) offsetX = 190 offsetY = 111
// Значит, расположение точки в воображаемом графике:
// R * ( (offsetXR - offsetZero) / (clickOffsetX - offsetZero) )
var ZeroX = 112, ZeroY = 111,
    offsetR = 190;

function calculateX(clickOffsetX, currentR) {
    return currentR * ( (clickOffsetX-ZeroX)/(offsetR - ZeroX));
}
function calculateY(clickOffsetY, currentR) {
    return currentR * ( (clickOffsetY-ZeroY)/(ZeroY - offsetR));
}
