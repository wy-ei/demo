function App(){
    var content = document.getElementById('content').innerText;
    var rScript = /<script\b[\s\S]*?>([\s\S]+)<\/script>/m;
    var rStyle = /<style\b[\s\S]*?>([\s\S]+)<\/style>/m;
    var matchScript = rScript.exec(content);
    var matchStyle = rStyle.exec(content);
    this.html = content;
    this.script = '';
    this.style = '';

    if(matchScript){
        this.script = matchScript[1];
        this.html = this.html.replace(matchScript[0],'');
    }

    if(matchStyle){
        this.style = matchStyle[1];
        this.html = this.html.replace(matchStyle[0],'');
    }
}

App.prototype = {
    insert: function(){
        var iframe = document.getElementById('iframe');
        var lib = [];

        libUsed = libUsed ? libUsed.split(',') : [];
        var libs = libUsed.map(function(lib){
            return LibData[lib];
        }).filter(function(lib){
            return lib;
        });

        var window = iframe.contentWindow;
        window.postMessage({
            html: this.html,
            style: this.style,
            script: this.script,
            libs: libs
        },'*');

        var htmlContainer = document.getElementById('html-container'),
            cssContainer = document.getElementById('css-container'),
            jsContainer = document.getElementById('js-container');
        if(this.html && htmlContainer){
            htmlContainer.getElementsByTagName('code')[0].textContent = this.html.trim();
        }

        if(this.style && cssContainer){
            cssContainer.getElementsByTagName('code')[0].textContent = this.style.trim();
        }

        if(this.script && jsContainer){
            jsContainer.getElementsByTagName('code')[0].textContent = this.script.trim();
        }
    },
    highlight: function(){
        hljs.configure({
            languages: ['css','xml','javascript']
        })
        hljs.initHighlighting();
    }
};

window.addEventListener('load', function(){
    var app = new App();
    app.insert();
    app.highlight();
});


window.addEventListener('scroll',function(event){
    event.preventDefault();
})
