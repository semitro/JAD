

function validate(){
	if(isEverythingOk())
		document.forms[0].submit();
}

function isEverythingOk(){
	var errorel = document.getElementById("error");
	if(document.forms[0].Y.value == "default"){
		errorel.textContent = "надо выбрать Y";
		return false;
	}
	var r = document.getElementById("R").value;
	var x = document.getElementById("X").value;

	if(!isNumber(r)) {
		errorel.textContent = "R должно быть числом"
		return false;
	}
	if(!isNumber(x)){
		errorel.textContent = "X должно быть числом"
		return false;
	}

	if(r < 2 || r > 5) { errorel.textContent = "R должно принадлежать [2,5]";  return false; }
	if(x <-5 || x > 3) { errorel.textContent = "X должно принадлежать [-5,3]"; return false; }

	return true;
}

// Ограничение количества цифр после запятой

function limitPrecise(e){
	if(!isNumber(e.value))
		e.style.backgroundColor = "red";
	else
		e.style.backgroundColor = "gray";
 if (e.value.indexOf(".") != '-1')
    e.value=e.value.substring(0, e.value.indexOf(".") + 5); 
}
function isNumber(n){
	return parseFloat(n) == n;
 }

/**
* A function to hightlight a button last pressed
**/
var lastButton=null;
function yButtonPress(whichButton){
	document.forms[0].elements.Y.value = whichButton.value;
	whichButton.style.backgroundColor = "#736144";
	if(lastButton) {
		lastButton.style.backgroundColor = "#B94040";
	}
	lastButton = whichButton;
}
