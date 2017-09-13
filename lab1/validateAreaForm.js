

function validate(){
	if(isEverythingOk())
		document.forms[0].submit();
}

function isEverythingOk(){

	if(document.forms[0].Y.value == null){
		alert("Select Y please");
		return false;
	}
	var r = document.getElementById("R").value;
	var x = document.getElementById("X").value;
	// if(!/[0-9]*([\.,][0-9]*)?/.test(x)
	// 	||
	//    !/[0-9]*([\.,][0-9]*)?/.test(r))
	// 	return false;

	if(!isNumber(r) || !isNumber(x)){
		alert("R and X must be numbers");
		return false;
	}

	if(r < 2 || r > 5) { alert("R must be in [2,5]");  return false; }
	if(x <-5 || x > 3) { alert("X must be in [-5,3]"); return false; }

	return true;
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
