$(function(){
	var $source = $('#source');
	var $target = $('#target');

	$source.on('dragstart',function(event){
		// 使用原生事件
		event = event.originalEvent;	
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/plain',$(this).text());
		console.log('---dragstart---');
	});

	$source.on('drag',function(){
		console.log('---drag---');
	});

	$source.on('dragend',function(event){
		console.log('---end---');
	});

	$source.on('dragleave',function(){
		console.log('---dragleave---');
	});

	// 要想让一个元素成为放置目标，就需要重写
	// 其 `dragenter` 和 `dragover` 事件的默认行为
	$target.on('dragenter',function(event){
		event.preventDefault();
	});

	$target.on('dragover',function(event){
		event.preventDefault();
		event = event.originalEvent;
		event.dataTransfer.dropEffect = 'move';
	});

	$target.on('drop',function(event){
		event = event.originalEvent;
		var text = event.dataTransfer.getData('text/plain');
		$target.text(text);
	});
});