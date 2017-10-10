
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
		console.log(body);
		ajaxpost("hitTheArea.php",body,ajaxCallback);
	}
	else
		toastr.error(error,'Не всё так просто');
}

function isEverythingOk(){
	if(document.forms[0].X.value == "")
		return "Вы забыли выбрать X";

	var r = document.getElementById("R").value;
	var y = document.getElementById("Y").value;

	if(!isNumber(r))
        return "R должно быть числом";

	if(!isNumber(y))
		return "Y должно быть числом";
	//  -3 < y < 3
	if( r < 2 || r > 5) return  "R должно принадлежать [2,5]";
	if(y < -3 || y > 3) return "Y должно принадлежать [-3,3]";

	return "OK";
}


// Краснение
function limitPrecise(e){
	if(!isNumber(e.value))
		e.style.backgroundColor = "red";
	else
		e.style.backgroundColor = "gray";
}
function isNumber(n){
	return parseFloat(n) == n;
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
