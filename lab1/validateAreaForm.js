function validate(){
	var x = document.getElementById("x").value;
	var hidden = document.getElementById("whichButton").value;
	alert(hidden);
}

function yButtonPress(whichButton){
	//set value of the hidden mergin
	document.getElementById('whichButton').value=whichButton;
	var elements = document.getElementsByClassName("butt");
    for (var butt in elements ) {
		// butt.style.backgroundColor = "red";
		if(elements[butt].value == whichButton )

		elements[butt].style.backgroundColor = "#736144";
    }
}