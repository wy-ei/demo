var imgs={
urls:["/images/op/bestfriends/pic1.jpg","/images/op/bestfriends/pic2.jpg","/images/op/bestfriends/pic3.jpg","/images/op/bestfriends/pic4.jpg",
"/images/op/bestfriends/pic5.jpg","/images/op/bestfriends/pic6.jpg","/images/op/bestfriends/pic7.jpg","/images/op/bestfriends/pic8.jpg",
"/images/op/bestfriends/pic9.jpg","/images/op/bestfriends/pic10.jpg","/images/op/bestfriends/pic11.jpg","/images/op/bestfriends/pic12.jpg",
"/images/op/bestfriends/pic13.jpg","/images/op/bestfriends/pic14.jpg","/images/op/bestfriends/pic20.jpg","/images/op/bestfriends/pic16.jpg",
"/images/op/bestfriends/pic17.jpg","/images/op/bestfriends/pic18.jpg","/images/op/bestfriends/pic19.jpg","/images/op/bestfriends/pic15.jpg",
"/images/op/bestfriends/pic21.jpg"],
index:0	
};


function addLoadEvent(func){
    var oldfunc = window.onload;
    if(typeof(window.onload) == "function"){
        window.onload = function(){
            oldfunc();
            func();
        }
    }else{
        window.onload = func;
    }
}



function addImg(imgUrls){

	var piccontainer = document.getElementById("piccontainer");
	var width = piccontainer.clientWidth;
	console.log(width);
	for (var i = 0,len = imgUrls.length; i < len; i++) {	
		var img = document.createElement("img");
		img.setAttribute("src", imgUrls[i]);
		img.setAttribute("no", i);
		img.style.width = width/3 + "px";
		img.style.height = width/3 * 9 /16 + "px";
		img.style.left = (width/3) * (i%3) + Math.random()*40-20 + "px";
		img.style.top = (width/3*9/16) * Math.floor(i/3) + Math.random()*20 - 10 + "px";
		var deg = Math.random()*50 - 25;
		img.style.webkitTransform = "rotate("+deg+"deg)";
		img.style.transform = "rotate("+deg+"deg)";
		piccontainer.appendChild(img);
	}
	piccontainer.style.height = (width/3*9/16)*Math.ceil(i/3)+"px";
}


var pop=function(){
	addImg(imgs.urls);


	(function(){
		
		var images = piccontainer.getElementsByTagName("img");

		for (var i = images.length - 1; i >= 0; i--) {
			images[i].addEventListener("mouseover",function(){
				this.oldTransform = this.style.transform;
				this.style.transform = "rotate(0deg) scale(1.6)";
				this.style.webkitTransform = "rotate(0deg) scale(1.6)"
			},false);

			images[i].addEventListener("mouseout", function(){
				this.style.transform = this.oldTransform;
			},false);
		}
	})();
}


addLoadEvent(pop);