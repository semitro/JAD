function click_handler(data) {
    var status = data.status; // Can be "begin", "complete" or "success".
    var source = data.source; // The parent HTML DOM element.

    switch (status) {
        case "begin": // Before the ajax request is sent. 
            break;

        case "complete": // After the ajax response is arrived.
            break;

        case "success": // After update of HTML DOM based on ajax response.
            // ...
            break;
    }
}

/**
 * Created by semitro on 09.10.17.
 */

//$('#imageWrapper').bind('click',onPlotClick);
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("plotCanvas").addEventListener("click", onPlotClick);
});

function onPlotClick(inf){
    // Заданная пользователем радиус
    var R = parseFloat(document.getElementById("inputForm:r_input_input").value);
    // Поля для передачи в запросе
    var xfield = document.getElementById("pointInputForm:x_input");
    var yfield = document.getElementById("pointInputForm:y_input");
    var rfield = document.getElementById("pointInputForm:r_input");
    // Пересчёт в координаты математической модели
    var x = calculateX(inf.offsetX, R);
    var y = calculateY(inf.offsetY, R);
    // Заполняем поля и они сами отправляются!
    xfield.value = x;
    yfield.value = y;
    rfield.value = R.toString();
    rfield.dispatchEvent(new Event("change"));
}
//{
//    $.get(
//        "mainController", // По заданию, направляем главному контроллеру, а не конкретной страничке
//        data,
//        function (response, code) {
//            if(code==="success"){
//                var message = ""
//                message+= "X: ";
//                message += calculateX(inf.offsetX,document.forms[0].R.value).toString().substr(0,5);
//                message += "<br>Y: " +
//                    calculateY(inf.offsetY,document.forms[0].R.value).toString().substr(0,5);
//                message += "<br>Попадание: " + JSON.parse(response).hit;
//                var color;
//                if(JSON.parse(response).hit === "Да")
//                    color = "#fff4e0";
//                else
//                    color = "#490006";
//                pts.push({x: (inf.offsetX-ZeroX)*R.value, y: (inf.offsetY-ZeroY)*R.value,
//                    mx: calculateX(inf.offsetX,document.forms[0].R.value),
//                    my: calculateY(inf.offsetY,document.forms[0].R.value)});
//                drawPoint(inf.offsetX, inf.offsetY, color);
//                toastr.info(message , "Поймали точку");
//                data = 'X='+ x +
//                    '&Y=' + y +
//                    '&R='+ document.forms[0].R.value;
//                $.get(
//                    "mainController",
//                    data,
//                    ajaxCallback
//                );
//            }
//            else
//                toastr.error("ошибка запроса к серверу","Хмм");
//        },
//        "html"
//    );
//}

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
function redrawAllPoints(factor) {
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,1000,1000);
    ctx.drawImage(pic, 0, 0);
    pts.forEach(function (point) {
         var data = 'X='+ point.mx +
            '&Y=' + point.my +
            '&R='+ document.forms[0].R.value + '&format=json';

            $.get(
            "mainController", // По заданию, направляем главному контроллеру, а не конкретной страничке
            data,
            function (response, code) {
                if(code==="success") {
                    var color;
                    if (JSON.parse(response).hit === "Да")
                        color = "#fff4e0";
                    else
                        color = "#490006";
                    drawPoint(point.x / factor + ZeroX, point.y / factor + ZeroY, color);

                }
            });

    });
}
// Внимание! Всё привязано к конкретному изображению.
// Эмпирически - для точки (0;0) offsetX = 112 offsetY = 111
//               для точки (R;0) offsetX = 190 offsetY = 111
// Значит, расположение точки в воображаемом графике:
// R * ( (offsetR - offsetZero) / (clickOffsetX - offsetZero) )
var ZeroX = 125, ZeroY = 125,
    offsetR = 225;

function calculateX(clickOffsetX, currentR) {
    return currentR * ( (clickOffsetX-ZeroX)/(offsetR - ZeroX));
}
function calculateY(clickOffsetY, currentR) {
    return currentR * ( (clickOffsetY-ZeroY)/(ZeroY - offsetR));
}
