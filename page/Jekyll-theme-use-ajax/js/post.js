var windowWidth = (document.documentElement&&document.documentElement.clientWidth)||document.body.clientWidth;
var windowHeight = (document.documentElement&&document.documentElement.clientHeight)||document.body.clientHeight;
var duoshuoQuery = {short_name:"wy-ei"};

function adjustHomePageImags(){
    var page = document.getElementById("page");
    if(page){
        var imgs = page.getElementsByTagName("img");
        for(var i=0,len=imgs.length;i<len;i++){
            var imgWidth = imgs[i].clientWidth;
            imgs[i].style.height = imgWidth*9/16+"px";
        }
    }
}

function addImageAlt(){
    var content = document.getElementById("content");
    if(!content){
        return;
    }
    var imgs = content.getElementsByTagName("img");
    if(!imgs){
        return;
    }
    if(windowWidth>800){
        popup(imgs);
    }
    if(document.getElementById("page")){
        return;
    }
    for(var i=0;i<imgs.length;i++){
        var alt = imgs[i].getAttribute("alt");
        if(alt){
            var div = document.createElement("div");
            div.setAttribute("class", "imgAlt")
            var p = document.createElement("p");
            if (alt.match(/^bg/i)=="bg"){
                    var pwidth = imgs[i].offsetWidth;
                    imgs[i].setAttribute("id", "bg");
                    if(windowWidth<900){
                        imgs[i].style.height = pwidth*9/16+"px";
                    }else{
                        imgs[i].style.height = pwidth*9/16*10/7+"px";
                    }
                    if(alt=="bg"||alt.indexOf("-")!=2){
                        continue;
                    }
                    alt = alt.split("-")[1];

            }else if(alt.match(/^hbg/i)=="hbg"){
                    var header = document.getElementById("header");
                    header.style.backgroundImage = 'url('+ imgs[i].getAttribute("src") +')';
                    imgs[i].parentNode.style.display = 'none';
                    continue;
            }else if(alt.match(/^both/i)=="both"){
                    var pwidth = imgs[i].offsetWidth;
                    console.log(pwidth);
                    imgs[i].setAttribute("id", "bg");
                    if(windowWidth<900){
                        imgs[i].style.height = pwidth*9/16+"px";
                    }else{
                        imgs[i].style.height = pwidth*9/16*10/7+"px";
                    }
                    var header = document.getElementById("header");
                    header.style.backgroundImage = 'url('+ imgs[i].getAttribute("src") +')';
                    if(alt=="both"||alt.indexOf("-")!=2){
                        continue;
                    }
                    alt = alt.split("-")[1];
            }
            var text = document.createTextNode(alt);
            p.appendChild(text);
            div.appendChild(p);
            insertAfter(div,imgs[i]);
        }
    }
}





function resize(imgId,sec){
    var img= document.getElementById(imgId);
    if(img.rsize){
        clearTimeout(img.rsize);
    }
    var left = parseInt(img.style.left);
    if(left>-windowWidth){
        img.style.left = left - (windowWidth/10) + "px";
       // img.style.width = width/2 + "px";
        var repeat = "resize('"+imgId+"',"+sec+")";
        img.rsize = setTimeout(repeat, sec);
    }else{
        clearTimeout(img.rsize);
        img.parentNode.removeChild(img);
        var over = document.getElementById("over");
        over.style.width="0";
    }
}

function popup(imgNodes){
    var header = document.getElementById("header");
    var div = document.createElement("div");
    div.setAttribute("id", "over");
    insertAfter(div,header);
    var handler = function(event){
        switch(event.type){
            case "click":
                adjustImg(this);
                break;
        }
    }



    function adjustImg(img){
        var div = document.createElement("div");
        var p = img.parentNode;
        div.style.display="block";
        div.setAttribute("id", "container");
        var img1 = document.createElement("img");
        img1.setAttribute("src",img.src);
        img1.setAttribute("id", "containerImg");
        img1.style.opacity = "1";
        div.appendChild(img1);

        if(windowWidth<windowHeight){
            windowHeight = 9/16 * windowWidth;
        }

        div.style.height = windowHeight*0.7+"px";

        div.style.width = windowHeight*0.7*16/9+"px";

        if(windowWidth<windowHeight){
            div.style.top =  document.documentElement.clientHeight*0.15+"px";
        }else{
            div.style.top = windowHeight*0.15+"px";
        }

        div.style.top = windowHeight*0.15+"px";
        div.style.left = (windowWidth - windowHeight*0.7*16/9)*0.5+"px";

        prea = document.createElement("a");
        prea.setAttribute("id", "go-pre-img");
        prea.style.width =  windowHeight*0.2*16/9+"px";
        prea.style.height = windowHeight*0.7+"px";
        nexta =  document.createElement("a");
        nexta.setAttribute("id", "go-next-img");
        nexta.style.width =  windowHeight*0.2*16/9+"px";
        nexta.style.height = windowHeight*0.7+"px";
        prea.onclick=(function(){
            return function(){
                var content = document.getElementById("content");
                var imgs = content.getElementsByTagName("img");
                var filterImg  = new Array();
                for(var i=0;i<imgs.length;i++){
                    if(imgs[i].id!="containerImg"){
                        filterImg.push(imgs[i]);
                    }
                }
                var img3 = document.getElementById("containerImg");
                for(var i=filterImg.length-1;i>=0;i--){
                    console.log(i);
                    if(filterImg[i].src==img3.src){
                        break;
                    }
                }
                if(i==0){
                    this.activeWidth = this.style.width;
                    this.style.width="0px";
                }else{
                    if(nexta.style.width=="0px"){
                        nexta.style.width=nexta.activeWidth;
                    }
                    img3.setAttribute("src",filterImg[i-1].src);
                }
            }
        })();
        prea.onmouseover=(function(){
            return function(){
                this.style.opacity="1";
             //   alert(this.style.backgroundImage);
            }
        })();
        prea.onmouseout=(function(){
            return function(){
                this.style.opacity="0";
            }
        })();

        nexta.onclick=(function(){
            return function(){
                var content = document.getElementById("content");
                var imgs = content.getElementsByTagName("img");
                var filterImg  = new Array();
                for(var i=0;i<imgs.length;i++){
                    if(imgs[i].id!="containerImg"){
                        filterImg.push(imgs[i]);
                    }
                }
                var img3 = document.getElementById("containerImg");
                for(var i=filterImg.length-1;i>=0;i--){
                    console.log(i);
                    if(filterImg[i].src==img3.src){
                        break;
                    }
                }
                if(i==filterImg.length-1){
                    this.activeWidth = this.style.width;
                    this.style.width="0px";
                }else{
                    if(prea.style.width=="0px"){
                        prea.style.width=prea.activeWidth;
                    }
                    img3.setAttribute("src",filterImg[i+1].src);
                }
            }
        })();
        nexta.onmouseover=(function(){
            return function(){
                this.style.opacity="1";
             //   alert(this.style.backgroundImage);
            }
        })();
        nexta.onmouseout=(function(){
            return function(){
                this.style.opacity="0";
            }
        })();


        div.appendChild(prea);
        div.appendChild(nexta);

        p.insertBefore(div,img);
       // alert();
        over.style.opacity="0.8";
        over.style.width="100%";

    }
    for(var i = 0,len = imgNodes.length;i<len;i++){
        imgNodes[i].onclick = handler;
    }



    var over = document.getElementById("over");
    over.onclick=function(){
        resize("container",70);
    }


}

function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


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


function showComment(){
    var comment = document.getElementById("comment");
    comment.style.display="block";
    var show = document.getElementById("show");
    show.style.display="none";
    window.scrollTo(0,document.body.scrollHeight);
    return false;
}



function toTop(){

    function getScrollTop(){
            return (document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;
    }

    var toTopDiv = document.getElementById("toTop");
    toTopDiv.addEventListener("click", function(){

                this.timeInterval =  setInterval(function(){
                    var scrollTop = getScrollTop();
                    if(scrollTop == 0){
                        clearInterval(toTopDiv.timeInterval);
                    }
                    document.documentElement.scrollTop = document.body.scrollTop = Math.floor(scrollTop * 0.7);
            },80);
    });
}



function addIndex(){

    if(document.getElementById("page")){
        return;
    }

    function getText(id){
        var nodes = id.childNodes;
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType == 3){
                return nodes[i].nodeValue;
            }
        }
    }

    var content = document.getElementById("content");
    if(!content){
        return;
    }

    var ul = document.createElement("ul");
    var h2s = content.getElementsByTagName("h2");
    var nodes = content.querySelectorAll("h2,h3");
    if(nodes.length<3){
        return;
    }
    var lis = new Array();
    var tagname;
    var len = nodes.length;
    var row = 0,subrow=0;
    for(var i=0;i<len;){
        if(nodes[i].tagName.toLowerCase()=="h2"){
            row++;
            nodes[i].setAttribute("id", "h2"+row);
            lis.push(getText(nodes[i]));
            i++;
        }else{
            var sublis = new Array();
            while(i<len&&nodes[i].tagName.toLowerCase()=="h3"){
                subrow++;
                nodes[i].setAttribute("id", "h3"+row+""+subrow);
                sublis.push(getText(nodes[i]));
                i++;
            }
            subrow=0;
            lis.push(sublis);
        }
    }
    row=0;
    for(var j = 0;j<lis.length;j++){
        if(typeof lis[j] == "string"){
            row++;
            var li = document.createElement("li");
            var textNode = document.createTextNode(lis[j]);
            var a = document.createElement("a");
            a.setAttribute("href", "#h2"+row);
            a.appendChild(textNode);
            li.appendChild(document.createTextNode(row+". "));
            li.appendChild(a);
            ul.appendChild(li);      
        }else{
            var ul2 = document.createElement("ul");
            subrow=0;
            for(var k=0;k<lis[j].length;k++){
                subrow++;
                var subli = document.createElement("li");
                var a = document.createElement("a");
                a.setAttribute("href", "#h3"+row+""+subrow);
                var textNode = document.createTextNode(lis[j][k]);
                a.appendChild(textNode);
                subli.appendChild(document.createTextNode(row+"."+subrow+". "));
                subli.appendChild(a);     
                ul2.appendChild(subli);
            }
            var li = document.createElement("li");
            li.appendChild(ul2);
            ul.appendChild(li);
        }
    }
    if(row==0){
        ul = ul.firstChild.firstChild;
    }

    var div = document.createElement("div");
    div.setAttribute("id","index");
    var h3 = document.createElement("h3");
    var textnode = document.createTextNode("目录:");
    h3.appendChild(textnode);
    div.appendChild(h3);
    div.appendChild(ul);

    var bg = document.getElementById("bg");
    if(bg){
        insertAfter(div,bg.parentNode);
    }else{
        content.insertBefore(div,content.firstChild);
    }
}

function toggleDuoshuoComments(){
    var el = document.querySelector(".ds-thread");
    DUOSHUO.EmbedThread(el);
    var container = document.getElementById("comment")
    if(container){
        container.appendChild(el);
    }
}

function initPostPage(){
    addImageAlt();
    adjustHomePageImags();
    addIndex();
    toggleDuoshuoComments()
}

var loadEvent = function(){
    addImageAlt();
    toTop();
    addIndex();
    adjustHomePageImags(); 
    toTop();
}


addLoadEvent(loadEvent);