function validate(){
	var x = document
	.getElementById("x").value;
	var hidden = document.getElementById("whichButton").value;
	alert(hidden);
}

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