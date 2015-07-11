var site_url = "http://wy-ei.com/demo/page/Jekyll-theme-use-ajax/";

window.addEventListener("load",function(){
	(function(){
		var as  = document.querySelectorAll("body header a");
		for(var i = 0,len = as.length;i<len;i++){
			as[i].addEventListener("click",function(event){
				changeContent(this.href,function(){
						initPostPage();
						addClickEventListener();
				});
				event.preventDefault();
			});
		}
	})();
	addClickEventListener();
	route();
});


function addClickEventListener(){
	var links = document.querySelectorAll("#ajaxContent a");
	for(var i=0,len = links.length;i<len;i++){
		if(isInnerLink(links[i].href)){
			links[i].addEventListener("click",function(event){
				changeContent(this.href,function(){
					initPostPage()
					addClickEventListener();
				});
				event.preventDefault();
			});
		}
	}
}

function setHash(hash){
	window.location.hash = hash;
}

function isInnerLink(url){
	if(url.indexOf(site_url)!=-1){
		return true;
	}else{
		false;
	}
}

function changeContent(url,callBack){
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.setRequestHeader("contentType","text/html");
	request.send();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200 ){
			var content = document.getElementById("ajaxContent");
			content.innerHTML = request.responseText;
			if(callBack){
				callBack();
			}

			var hash = url.slice(url.lastIndexOf("/")+1);
			setHash("#"+hash);
		}
		if(request.readyState ===4 && request.status === 404){
				var content = document.getElementById("ajaxContent");
				content.innerHTML = request.responseText;
				var hash = url.slice(url.lastIndexOf("/")+1);
				setHash("#"+hash);
		}
	}
}

function route(){
	var hash = window.location.hash;
	if(hash.match(/#.+/)){
		hash = hash.slice(1);
		changeContent(site_url+hash,function(){
			initPostPage()
			addClickEventListener();
		});
	}
}
