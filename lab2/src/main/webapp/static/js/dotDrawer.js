/**
 * Created by semitro on 09.10.17.
 */

$('.plot').bind('click',onPlotClick);

function onPlotClick(inf){
    console.log(inf.pageX);
    console.log(inf.pageY);

}

// Переписать. Радиус должен браться с страницы
function getR(){
    return 12;
}