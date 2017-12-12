export default function ajaxpost(url, body, callback, encoding) {
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
