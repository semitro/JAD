function click_handler(data) {
    var status = data.status; // Can be "begin", "complete" or "success".
    var source = data.source; // The parent HTML DOM element.

    switch (status) {
        case "begin": // Before the ajax request is sent. 
            break;

        case "complete": // After the ajax response is arrived.
            break;

        case "success": // After update of HTML DOM based on ajax response.
            makePoint();
            break;
    }
}

/**
 * Created by semitro on 09.10.17.
 */

//$('#imageWrapper').bind('click',onPlotClick);
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("plotCanvas").addEventListener("click", onPlotClick);
    document.getElementById("inputForm:r_input_input").addEventListener("blur", redrawAllPoints);
});

function onPlotClick(inf){
    // Заданная пользователем радиус
    var R = parseFloat(document.getElementById("inputForm:r_input_input").value);
    // Пересчёт в координаты математической модели
    var x = calculateX(inf.offsetX, R);
    var y = calculateY(inf.offsetY, R);
    doCheckArea(x, y, inf.offsetX, inf.offsetY, R);
}

function doCheckArea(x, y, xoff, yoff, R) {
    // Поля для передачи в запросе
    var xfield = document.getElementById("pointInputForm:x_input");
    var yfield = document.getElementById("pointInputForm:y_input");
    var rfield = document.getElementById("pointInputForm:r_input");
    var xofield =  document.getElementById("pointInputForm:x_offset");
    var yofield =  document.getElementById("pointInputForm:y_offset");
    // Заполняем поля и они сами отправляются!
    xfield.value = x;
    yfield.value = y;
    xofield.value = xoff.toString();
    yofield.value = yoff.toString();
    rfield.value = R.toString();
    rfield.dispatchEvent(new Event("change"));
}

function makePoint() {
    var xfield = document.getElementById("pointInputForm:x_input");
    var yfield = document.getElementById("pointInputForm:y_input");
    var rfield = document.getElementById("pointInputForm:r_input");
    var xofield =  document.getElementById("pointInputForm:x_offset");
    var yofield =  document.getElementById("pointInputForm:y_offset");
    var hitfield = document.getElementById("pointInputForm:hidden_hit");
    var R = parseFloat(rfield.value);
    var xoff = parseFloat(xofield.value);
    var yoff = parseFloat(yofield.value);
    var vmx = calculateX(xoff, R);
    var vmy = calculateY(yoff, R);
    var vx = (xoff-ZeroX)*R;
    var vy = (yoff-ZeroY)*R;
    pts.push({x: vx, y: vy, mx: vmx, my: vmy});
    if(hitfield.value==="true")
        color = HitColor;
    else
        color = NotHitColor;
    drawPoint(xoff, yoff, color);
}

var pts = new Array();
function drawPoint(x, y,color) {
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.arc(x,y,2,0,2*Math.PI);
    ctx.arc(x,y,4,0,2*Math.PI);
    ctx.stroke();
}

// Просто домножение координаты каждой точки на коэффициент
function redrawAllPoints(ev) {
    factor = parseFloat(ev.target.value);
    var R = parseFloat(document.getElementById("inputForm:r_input_input").value);
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,1000,1000);
    while(pts.length) {
        var point = pts.pop();
        doCheckArea(point.mx, point.my, point.x / factor + ZeroX, point.y / factor + ZeroY, R);
    }
}

function calculateX(clickOffsetX, currentR) {
    return currentR * ( (clickOffsetX-ZeroX)/(offsetR - ZeroX));
}
function calculateY(clickOffsetY, currentR) {
    return currentR * ( (clickOffsetY-ZeroY)/(ZeroY - offsetR));
}

// Внимание! Всё привязано к конкретному изображению.
// Эмпирически - для точки (0;0) offsetX = 112 offsetY = 111
//               для точки (R;0) offsetX = 190 offsetY = 111
// Значит, расположение точки в воображаемом графике:
// R * ( (offsetR - offsetZero) / (clickOffsetX - offsetZero) )
var ZeroX = 125, ZeroY = 125,
    offsetR = 225;

// Цвета
var HitColor = "#fff4e0", NotHitColor = "#490006";