function input(){
	var search = document.getElementById("search");
	search.onfocus=function(){
		if(search.value=="搜索内容..."){
			search.msg=search.value;
			search.value="";
		}
	}
	search.onblur=function(){
		if(!search.value){
			search.value=search.msg;
		}
	}
}

function toTop(){

	function getScrollTop(){
		return (document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;
	}

	var toTopBox = document.getElementById("to-top");
	toTopBox.addEventListener("click", function(){
		this.timeInterval =  setInterval(function(){
			var scrollTop = getScrollTop();

			if(scrollTop == 0){
				clearInterval(toTopBox.timeInterval);
			}
			document.documentElement.scrollTop = document.body.scrollTop = Math.floor(scrollTop * 0.7);
		},80);
	});
}



window.addEventListener("load",input);
window.addEventListener("load",toTop);