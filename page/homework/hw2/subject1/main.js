'use strict';
//control popup
(function () {
  var ul = document.getElementById("download-type");
  var popup = document.getElementById('popup');
  ul.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() == 'a') {
      var type = target.parentElement.dataset['popup'];
      if (type) {
        popup.style.display = 'block';
        event.preventDefault();
      }
    }
  });
  var close = document.getElementById('close-popup');
  close.addEventListener('click', function () {
    popup.style.display = 'none';
  });
  var downloadBtn = document.getElementById('download-btn');
  downloadBtn.addEventListener('click', function (evet) {
    popup.style.display = 'block';
    event.preventDefault();
  });
})();


window.addEventListener('load', function () {
  //control slide

  (function () {
    var prev = document.getElementById('prev'),
      next = document.getElementById('next'),
      wrap = document.getElementById('bg-img-wrap'),
      bgs = document.getElementsByClassName('bg-img'),
      len = bgs.length,
      width =  parseInt(getStyle(bgs[0],'width')),
      index = 1;

    wrap.style.width = width * (len + 1) + 'px';

    prev.addEventListener('click', function () {
      scroll('r');
    });
    next.addEventListener('click', function(){
      scroll('l');
    });
    go(-width);
    function scroll(dir) {
      var offset = 0;
      if (dir == 'r') {
        if (index < len-1) {
          index += 1;
          offset = width;
        }else{
          index = 0;
          offset = -width * (len-1);
        }
      }else{
        if(index > 0){
          index -= 1;
          offset = - width;
        }else{
          index = len - 1;
          offset = (len-1)*width;
        }
      }
      go(offset);
    }
    function go(offset){
      var w = offset / 5,
        i = 1,
        left = parseInt(getStyle(wrap,'left'));
      setTimeout(function _go(){
        if(i<5){
          i++;
          wrap.style.left = left + (w*i) + 'px';
          setTimeout(_go,130);
        }
      },130);
    }

    function getStyle(el,style){
      return el.currentStyle && el.currentStyle[style] ||  window.getComputedStyle(el,null)[style];
    }
  })();
});
