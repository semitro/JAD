/**
 * Created by semitro on 09.10.17.
 */

$('.plot').bind('click',onPlotClick);

$('.plot').onclick(function (event) {
    $(this).append(
        $('<div></div>')
            .css('left',12)
            .css('top',10)
            .css('border','thick solid red')
    )
})

function onPlotClick(inf){
    console.log(inf.pageX);
    console.log(inf.pageY);

}

// Переписать. Радиус должен браться с страницы
function getR(){
    return 12;
}