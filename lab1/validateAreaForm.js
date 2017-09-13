ajaxpost("hitTheArea.php","checkMath=true", function(response, code) {
	if(response == "false") {
		 document.getElementById('results').innerHTML += 
			"<tr><td colspan='6'>ВНИМАНИЕ! ТОЧНЫЕ РЕЗУЛЬТАТЫ НЕ ГАРАНТИРОВАНЫ! (Нужен модуль BCMath)</td></tr>";
	}
}

function validate(){
	if(isEverythingOk()){
		var body = 'X='+ document.forms[0].X.value+'&Y=' + document.forms[0].Y.value +'&R='+ document.forms[0].R.value;
		ajaxpost("hitTheArea.php",body,ajaxCallback);
	}
}

function isEverythingOk(){
	var errorel = document.getElementById("error");
	if(document.forms[0].Y.value == "default"){
		errorel.textContent = "надо выбрать Y";
		errorel.style.color = "yellow";
		return false;
	}
	var r = document.getElementById("R").value;
	var x = document.getElementById("X").value;

	if(!isNumber(r)) {
		errorel.textContent = "R должно быть числом"
		errorel.style.color = "yellow";
		return false;
	}
	if(!isNumber(x)){
		errorel.textContent = "X должно быть числом"
		errorel.style.color = "yellow";
		return false;
	}

	if(r < 2 || r > 5) { errorel.textContent = "R должно принадлежать [2,5]";
		
		errorel.style.color = "yellow";  return false; }
	if(x <-5 || x > 3) { errorel.textContent = "X должно принадлежать [-5,3]";
		
		errorel.style.color = "yellow"; return false; }

	return true;
}

// Ограничение количества цифр после запятой

function limitPrecise(e){
	if(!isNumber(e.value))
		e.style.backgroundColor = "red";
	else
		e.style.backgroundColor = "gray";
 //if (e.value.indexOf(".") != '-1')
   // e.value=e.value.substring(0, e.value.indexOf(".") + 5); 
}
function isNumber(n){
	return parseFloat(n) == n;
 }

/**
* A function to hightlight a button last pressed
**/
var lastButton=null;
function yButtonPress(whichButton){
	if(lastButton == whichButton)
		return;
	document.forms[0].elements.Y.value = whichButton.value;
	whichButton.style.backgroundColor = "#736144";
	if(lastButton) {
		lastButton.style.backgroundColor = "#B94040";
	}
	lastButton = whichButton;
}


function ajaxpost(url, body, callback, encoding) {
	var ajaxRequest;
	try{ajaxRequest = new XMLHttpRequest();} catch (e){try{ajaxRequest=new ActiveXObject('Msxml2.XMLHTTP');} catch (e) {try{ajaxRequest=new ActiveXObject('Microsoft.XMLHTTP');} catch (e){alert("AJAX не работает!");return false;}}}
	if (callback){ajaxRequest.onreadystatechange=function(){if(ajaxRequest.readyState==4){callback(ajaxRequest.responseText, ajaxRequest.status);}}}
	ajaxRequest.open('POST',url,true);
	if(encoding!=undefined){
		ajaxRequest.setRequestHeader('Content-Type', encoding);
	}
	else {
		ajaxRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	ajaxRequest.send(body);
}

function ajaxCallback(response, code) {
	var errorel = document.getElementById("error");
	if(code==200) {
		document.getElementById('results').innerHTML += response;
	}
	else {
		errorel.textContent = "ошибка запроса к серверу";		
		errorel.style.color = "yellow";
	}
}

