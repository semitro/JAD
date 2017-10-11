/**
 * Created by semitro on 09.10.17.
 */

$('#plotCanvas').bind('click',onPlotClick);


$('#R').bind('blur',function (e) {
    if(isNumber(e.target.value))
        redrawAllPoints(e.target.value);
});

function onPlotClick(inf){
    // isNumber is defined in validateAreaForm.js
    if(!isNumber(document.forms[0].R.value)){
        toastr.error("Ммвыв","Вы забыли указать R");
        return;
    }

    // Дублирующийся код. Плохо, но быстро
    if( inf.offsetX,document.forms[0].R.value < 1
        || inf.offsetX,document.forms[0].R.value > 3){
        toastr.error("Ммвыв","R должно принадлежать [1,3]");
        return;
    }

        // Пересчёт в координаты математической модели
        var x = calculateX(inf.offsetX,document.forms[0].R.value);
        var y = calculateY(inf.offsetY,document.forms[0].R.value)
        var data = 'X='+ x +
            '&Y=' + y +
            '&R='+ document.forms[0].R.value +
            '&format=json';
        $.get(
            "mainController", // По заданию, направляем главному контроллеру, а не конкретной страничке
            data,
            function (response, code) {
                if(code==="success"){
                    var message = ""
                    message+= "X: ";
                    message += calculateX(inf.offsetX,document.forms[0].R.value).toString().substr(0,5);
                    message += "<br>Y: " +
                        calculateY(inf.offsetY,document.forms[0].R.value).toString().substr(0,5);
                    message += "<br>Попадание: " + JSON.parse(response).hit;
                    var color;
                    if(JSON.parse(response).hit === "Да")
                        color = "#490006";
                    else
                        color = "#fff4e0";
                    pts.push({x: (inf.offsetX-ZeroX)*R.value, y: (inf.offsetY-ZeroY)*R.value,
                        mx: calculateX(inf.offsetX,document.forms[0].R.value),
                        my: calculateY(inf.offsetY,document.forms[0].R.value)});
                    drawPoint(inf.offsetX, inf.offsetY, color);
                    toastr.info(message , "Поймали точку");
                    data = 'X='+ x +
                        '&Y=' + y +
                        '&R='+ document.forms[0].R.value;
                    $.get(
                        "mainController",
                        data,
                        ajaxCallback
                    );
                }
                else
                    toastr.error("ошибка запроса к серверу","Хмм");
            },
            "html"
        );


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

pic       = new Image();
pic.src    = "static/img/areas.png";
pic.onload = function() {    // Событие onLoad, ждём момента пока загрузится изображение
    ctx.drawImage(pic, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
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
                        color = "#490006";
                    else
                        color = "#fff4e0";
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
var ZeroX = 112, ZeroY = 111,
    offsetR = 190;

function calculateX(clickOffsetX, currentR) {
    return currentR * ( (clickOffsetX-ZeroX)/(offsetR - ZeroX));
}
function calculateY(clickOffsetY, currentR) {
    return currentR * ( (clickOffsetY-ZeroY)/(ZeroY - offsetR));
}
