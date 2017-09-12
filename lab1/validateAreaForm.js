

function validate(){
//if(isEverythingOk())
	document.getElementById("mainForm").submit();
}

function isEverythingOk(){

	if(document.getElementById("whichButton").value == "default"){
		alert("Select Y please");
		return false;
	}
	var r = document.getElementById("R").value;
	var x = document.getElementById("x").value;
	// if(!/[0-9]*([\.,][0-9]*)?/.test(x) 
	// 	|| 
	//    !/[0-9]*([\.,][0-9]*)?/.test(r))
	// 	return false;

	if(!isNumber(r) || !isNumber(x)){
		alert("R and X must be numbers");
		return false;
	}

	if(r < 2 || r > 5) { alert("R must be in [2,5]"); return false; }
	if(x<-5  || x > 3) { alert("X must be in [-5,3]"); return false; }

	return true;
}

function isNumber(n){
	return parseFloat(n) == n;
 }

/**
* A function to hightlight a button last pressed
**/
var styleColor;
var alreadyBeenHere = false;
function yButtonPress(whichButton){

	//set up value of the hidden mergin
	document.getElementById('whichButton').value=whichButton;
 
	var elements = document.getElementsByClassName("butt");

	// We need to remember the buttonses true color
	if(!alreadyBeenHere){
		styleColor = elements[0].style.backgroundColor;
		alreadyBeenHere = true;
	}


    for (var butt in elements )
		if(elements[butt].value == whichButton )
			elements[butt].style.backgroundColor = "#736144";
		else
			elements[butt].style.backgroundColor = styleColor;
}