(function(){
    window.addEventListener('message', function(event){
        var origin = event.origin || event.originalEvent.origin;
        var data = event.data;

        if(data.html){
            document.body.innerHTML = data.html;
        }

        if(data.style){
            var style = document.createElement('style');
            style.textContent = data.style;
            document.head.appendChild(style);
        }

        var js = [];
        if(data.libs.length){
            data.libs.forEach(function(lib){
                if(lib.type === 'js'){
                    js.push(lib.url);
                }else{
                    var link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = lib.url;
                    document.head.appendChild(link);
                }
            });
        }

        LazyLoad.js(js,function(){
            if(data.script){
                var script = document.createElement('script');
                script.textContent = data.script;
                document.body.appendChild(script);
            }
        });
    }, false);
})();
