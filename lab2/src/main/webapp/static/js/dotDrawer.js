/**
 * Created by semitro on 09.10.17.
 */

$('#plotCanvas').bind('click',onPlotClick);

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

        drawPoint(inf.offsetX,inf.offsetY);
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
