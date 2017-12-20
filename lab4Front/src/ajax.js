export default function ajaxpost(url, body, callback, onerror, encoding) {
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('POST', url, true);
	if (callback != undefined) {
		xhr.onload = ()=>callback(xhr.responseText, xhr.status);
	}
	if (onerror != undefined) {
		xhr.onerror = ()=>onerror(xhr.status);
	}
	if (encoding != undefined){
		xhr.setRequestHeader('Content-Type', encoding);
	}
	else {
		xhr.setRequestHeader('Content-Type', 'application/json');
	}
	xhr.timeout = 1000*30;
	xhr.send(body);
}
