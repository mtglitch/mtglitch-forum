var url, avatar;
$('.AI').each(function() { 
  url = $(this).attr('avatar');
  
  if ($(this).parents(".inner").find("img.avatar").length === 0) {
    $(this).parents(".inner").find(".avatar-container").append("<img class='avatar'></img>");
  }
  avatar = $(this).parents(".inner").find("img.avatar");
  
  avatar.css({'max-width': "192px", 'max-height': "150px"});
  avatar.attr('height', null);
  avatar.attr('width', null);
  
  avatar.attr('src', url);
});

quotetext = $('#postform').find('#message').val();
if (quotetext) {
  quotetext = quotetext.replace(/\[AI\].*\[\/AI\]/g, "");
  $('#postform').find('#message').val(quotetext.replace(/\[AI\=.*\]/g, ""));
}
