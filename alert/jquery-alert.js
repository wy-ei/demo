(function($){
	$.alert = (function(){
		var $document = $(document),
			documentWidth = $document.width(),
			windowHeight = $document.height(),
			alertBoxWidth ,
			alertBoxHeight;

		if(documentWidth<600){
			alertBoxWidth = documentWidth * 0.8;
		}else if(documentWidth < 900){
			alertBoxWidth = documentWidth * 0.5;
		}
		else{
			alertBoxWidth = documentWidth * 0.3;
		}
		alertBoxHeight = alertBoxWidth * 9/16;



	  	$('<div id="mask"></div><div id="alert-box"><p id="alert-text"></p><div id="alert-close"></div></div>').appendTo('body');

	  	$('#mask').css({
	  		position: 'fixed',
			display: 'none',
			top: 0,
			left: 0,
			backgroundColor: '#000',
			opacity: 0.8,
			zIndex: 10000,
			width:'100%',
			height: '100%',
	  	}).click(function(event) {
	  		event.stopPropagation();
	  	});

	  	$('#alert-text').css({
			position: 'relative',
			top: '50%',
			marginTop: '-7px',
			fontSize: '15px',
			color: '#000',
			letterSpacing: '4px'
	  	});

	  	$('#alert-box').css({
	  		display: 'none',
			position:'fixed',
			width: alertBoxWidth+'px',
			height: alertBoxHeight+'px',
			backgroundColor: '#fff',
			lineHeight: '1em',
			zIndex: 10001,
			textAlign: 'center',
			boxShadow: '0px 0px 1px 0px blue',
			userSelect: 'none',
			left: '50%',
			top: '50%',
			borderRadius: '5px',
			marginLeft:'-'+alertBoxWidth/2+'px',
			marginTop: '-'+alertBoxHeight/2+'px'
	  	});

	  	$('#alert-close').css({
			display: 'inline-block',
			width: '20px',
			height: '20px',
			borderRadius: '50%',
			position: 'absolute',
			right: '15px',
			top: '15px',
			backgroundColor: '#ccc',
			lineHeight: '20px',
			cursor: 'pointer',
			boxShadow: 'inset 0px 0px 0px 3px #ccc',
			backgroundImage: 'linear-gradient(135deg,transparent 47%,black 48%,black 52%,transparent 53%),linear-gradient(45deg,transparent 47%,black 48%,black 52%,transparent 53%)'
	  	}).hover(function() {
	  		$(this).css({backgroundImage: 'linear-gradient(90deg,transparent 47%,black 48%,black 52%,transparent 53%),linear-gradient(0deg,transparent 47%,black 48%,black 52%,transparent 53%)'});
	  	}, function() {
	  		$(this).css({backgroundImage: 'linear-gradient(135deg,transparent 47%,black 48%,black 52%,transparent 53%),linear-gradient(45deg,transparent 47%,black 48%,black 52%,transparent 53%)'});
	  	});

		var close = function(){
			$('#mask').hide();
			$('#alert-box').hide();
		};

		$('#alert-close').click(function(event){
			close();
			event.stopPropagation();
		});

		return  function(text){
			if( text ){
			   $('#alert-text').text(text);	
			}
			$('#mask').show();
			$('#alert-box').show();
		};
	})();
})(jQuery);