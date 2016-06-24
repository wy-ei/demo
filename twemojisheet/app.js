var wrap = document.getElementsByClassName('wrap')[0];

wrap.addEventListener('click',function(event){
    var target = event.target;
    if(target.tagName === 'I'){
        var key = target.dataset.key;
        prompt('Copy to clipboard via Ctrl +C and Enter',key);
    }
});

var loadEmojiKeywords = function(callback){
    var url = 'keywords.json';
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    xhr.open('GET',url);
    xhr.send(null);
    xhr.onload = function(){
        callback(xhr.response);
    }
}

loadEmojiKeywords(function(map){
    var keys = Object.keys(map);
    var nodes = [];
    var div = document.createElement('div');
    keys.forEach(function(key){
        var i = document.createElement('i');
        i.dataset.key = key;
        i.classList.add('emoji');
        i.style.backgroundImage = 'url(https://twemoji.maxcdn.com/svg/' + map[key] +  '.svg)';
        div.appendChild(i);
    });
    wrap.appendChild(div);
});
