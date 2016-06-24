var rightAnswer = [0,0,2,1,2,1,2,0,0,-1];
var answer = [];
var record = [];
var selectedItemNo = -1;
var currentPageNo=1;
//var answer = [];
var total = 9;
function addClass(elem,className){
	elem.setAttribute("class", elem.getAttribute("class")+" "+className);
}
function removeClass(elem,className){
	var classArr = elem.getAttribute("class").split(" ");
	var index = classArr.indexOf(className)
	if(index != -1){
		classArr.splice(index,1);
		elem.setAttribute("class", classArr.join(" "));		
	}
}

function showResult(answer,rightAnswer){
	var rightCount=0;
	for(var i = 0, len = answer.length; i < len; i++){
		if(answer[i] == rightAnswer[i]){
			rightCount++;
		}else if(rightAnswer[i]==-1){
			rightCount++;
		}
	}
	if(rightCount<=4){
		record[0]=parseInt(record[0], 10) + 1;
	}else{
		record[rightCount-4]=parseInt(record[rightCount-4], 10) + 1;
	}
	var score = document.getElementById("score");
	var textNode = document.createTextNode(""+rightCount*10);
	score.appendChild(textNode);
	var button = document.getElementById("button");
	button.style.display = 'none';

	var discribtion = document.getElementById("discribtion");
	var disTextNode;
	switch(rightCount){
		case 0:
		case 1:
			disTextNode = document.createTextNode("兄弟，你是真学渣哇！我给你跪了！");
			break;
		case 2:
		case 3:
		disTextNode = document.createTextNode("学渣请再回答我一个问题吧！1+1等于几啊？");
			break;
		case 4:
		disTextNode = document.createTextNode("其实你已经打败了 2% 的学渣了继续加油！");
			break;
		case 5:
		case 6:
		disTextNode = document.createTextNode("可以说你处于中等学渣水平，加把劲做个真学渣！come on！");
			break;
		case 7:
		case 8:	
		disTextNode = document.createTextNode("兄弟，你本来可以靠脸吃饭的可你偏要靠才华，哎！");
			break;
		case 9:
		case 10:
		disTextNode = document.createTextNode("妹子你也太厉害了吧，你让我等真学渣情何以堪啊？");
			break;
		default:
			break;
	}
	discribtion.appendChild(disTextNode);


}



function getData(){
	var commentList = document.getElementsByClassName("ds-post");
	if(commentList){
		var len = commentList.length;
		if(len==0){
			return "";
		}
		var p = commentList[len-1].getElementsByTagName("p")[0];
		if(!p){
			return "";
		}
		return p.innerHTML;
	}
}

function submitData(){
	var textarea = document.getElementsByTagName("textarea")[0];
	
	var str = "";
	for(var i=0,len=record.length;i<len-1;i++){
		str+=record[i]+"-";
	}
	str +=record[i]; 
	
	console.log(str);
	textarea.value = str;

	var submitButton = document.getElementsByClassName("ds-post-button")[0];
	submitButton.click();
	var dsname = document.getElementById("ds-dialog-name");
	dsname.value = "js";
	var dsemail = document.getElementById("ds-dialog-email");
	dsemail.value = "wy@wy-ei.com";
	var popsubmitButton = document.getElementById("ds-wrapper").getElementsByTagName("button");
	//popsubmitButton[0].click();
}


function replaceClass(elem,newClassName,oldClassName){
	removeClass(elem,oldClassName);
	addClass(elem,newClassName);
}


window.onload = function(){
	//add click event onto <li> and set selectedItemNo; 
	(function(){
		var wrap = document.getElementById("wrapper");
		var uls = wrap.getElementsByTagName("ul");
		for (var i = uls.length - 1; i >= 0; i--) {
			var lis = uls[i].getElementsByTagName("li");
			for(var j = lis.length -1; j >= 0; j--){
				lis[j].onclick = function(){
					var brotherlis = this.parentNode.getElementsByTagName("li");
					for(var k = brotherlis.length - 1; k >= 0; k--){
						brotherlis[k].removeAttribute("class");
						//set selectedItemNo
						if(brotherlis[k]===this){
							selectedItemNo = k;
						}
					}
					this.setAttribute("class", "selected");
					enableButton();	
				}
			}
		}
	})();

	function enableButton(){
		//enable submit button
		//I samplely set it's opacity to 1 meaning it's enable
		var button = document.getElementById("button");
		button.style.opacity = 1;
	}
	function disableButton(){
		var button = document.getElementById("button");
		button.style.opacity = 0.5;
	}

	//hindding all pages except first one
	(function(){
		var pages = document.getElementsByClassName("page");

		for (var i = pages.length - 1; i >= 1; i--) {
			pages[i].style.display = 'none';
		}
		addClass(pages[0],"in");
	})();


	//add click event onto button
	(function(){
		var button = document.getElementById("button");
		button.onclick = function(){
			function nextPage(){
				var currentPage = document.getElementById("page"+currentPageNo);
				currentPageNo++;

				var nextPage = document.getElementById("page"+currentPageNo);
				replaceClass(currentPage,"out","in");
				setTimeout(function(){
					currentPage.style.display = 'none';
					nextPage.style.display = 'block';
					addClass(nextPage,"in");
				}, 1000);
			}

			(function(){
				if(currentPageNo <= total){
					if(selectedItemNo!=-1){
						//record answer
						answer.push(selectedItemNo);
						//show next page
						nextPage();
						//disable button
						disableButton();
						//clear selectedItemNo
						selectedItemNo = -1;
					}
				}else{

					//next one
					if(currentPageNo==total+1){
						(function(){	
							nextPage();
							disableButton();
							var button = document.getElementById("button");
							setTimeout(function(){
								button.innerHTML = "完成";
							}, 1000);
							
							
						})();
					}
					//show result
					else if(currentPageNo == total+2){
						answer.push(selectedItemNo);
						nextPage();
						showResult(answer,rightAnswer);
						console.log(currentPageNo);
					//	submitData();
						setTimeout(function(){
							var share = document.getElementById("share");
							share.style.display = 'block';
						}, 1000);
					}
				}
				if(currentPageNo==total+1){
					enableButton();
					//show result
						(function(){
							//process recode string
							var str;
							if(!str){
								str = "0-0-0-0-0-0-0";
							}
							// 40< 50 60 70 80 90 100
							record = str.split("-");
							console.log(record);	
						})();
				}

			})();
		}
	})();
}