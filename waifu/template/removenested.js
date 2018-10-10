rnq = document.getElementsByName('rnq');

$.each(rnq, function ( index, button ){
  button.addEventListener("click", function () { 
    q_text = $('#message-box textarea').val();
    if(q_text) {
		var begin, end;
		
		while(q_text.split("[quote").length - 1 > 1) {
			begin = q_text.toLowerCase().lastIndexOf("[quote");
			end = q_text.toLowerCase().indexOf("[/quote]", begin);
			if( -1 === begin || -1 === end) {
				break;
			}
			q_text = q_text.substr(0, begin) + q_text.substr(end + "[/quote]".length);
		}
    $('#message-box textarea').val(q_text);
	}
  })
});
