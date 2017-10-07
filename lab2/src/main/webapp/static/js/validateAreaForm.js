
ajaxpost("hitTheArea.php","checkMath=true", function(response, code) {
		if(response == "false") {
			 document.getElementById('results').innerHTML += 
				"<caption>ВНИМАНИЕ! ТОЧНЫЕ РЕЗУЛЬТАТЫ НЕ ГАРАНТИРОВАНЫ! (Нужен модуль BCMath)</caption>";
		}
	});

function validate(){
	var error = isEverythingOk();
    if(error === "OK"){
		var body = 'X='+ document.forms[0].X.value+'&Y=' + document.forms[0].Y.value +'&R='+ document.forms[0].R.value;
		ajaxpost("hitTheArea.php",body,ajaxCallback);
	}
	else
		toastr.error(error,'Не всё так просто');
}

function isEverythingOk(){
	if(document.forms[0].Y.value == "default")
		return "Вы забыли выбрать Y";

	var r = document.getElementById("R").value;
	var x = document.getElementById("X").value;

	if(!isNumber(r))
        return "R должен быть числом";

	if(!isNumber(x))
		return "X должен быть числом";

	if(r < 2 || r > 5) return  "R должен принадлежать [2,5]";
	if(x <-5 || x > 3) return "X должен принадлежать [-5,3]";

	return "OK";
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
var lastColor=null;
function yButtonPress(whichButton){
	if(lastButton == whichButton)
		return;
	lastColor=whichButton.style.color
	document.forms[0].elements.Y.value = whichButton.value;
	whichButton.style.backgroundColor = "#C36144";
	if(lastButton) {
		lastButton.style.backgroundColor = lastColor;
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
	if(code==200) {
		document.getElementById('results_body').innerHTML += response;
	}
	else
		toastr.error("ошибка запроса к серверу","Хмм");
}
