document.addEventListener('DOMContentLoaded', function () {
  var updateFrequency = 1 * 60 * 1000; //one minute
  
  window.lastUpdateTime = new Date();
  setInterval(checkNewPosts, updateFrequency);
	
  if (localStorage.getItem('postNotifications') === 'on') {
	  $('#notificationToggle').text('Post Alert! (on)');
  } else {
    $('#notificationToggle').text('Post Alert! (off)');
  }

  
  $('#notificationToggle').on('click', function() {
	  if (localStorage.getItem('postNotifications') === 'on') {
	    localStorage.setItem('postNotifications', 'off');
      $('#notificationToggle').text('Post Alert! (off)');
    } else {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      localStorage.setItem('postNotifications', 'on');
      $('#notificationToggle').text('Post Alert! (on)');
    }
    return false;
  });
});


function checkNewPosts () {
  var unreadPostsURL = 'https://mtglitch.com/forums/search.php?search_id=unreadposts';
  
  if (localStorage.getItem('postNotifications') !== 'on'){
    return;
  }
  
  $.get(unreadPostsURL).done(function(activeTopics) {
    activeTopics = $(activeTopics);
    
    if ($('.lastpost:eq(1) > span', activeTopics).length > 0) {
      var lastPostDate = new Date($('.lastpost:eq(1) > span', activeTopics).text().split(/\n/)[4].trim());
      
      if (lastPostDate > lastUpdateTime) {
        lastUpdateTime = lastPostDate;
        var postTitle  = $('a.topictitle', activeTopics).filter(':first').text();
        var postAuthor = $('.lastpost:eq(1) > span', activeTopics).text().split(/\n/)[0].substring(13);
        notify('In ' + postTitle + ' by ' + postAuthor);
      
        if (window.document.title.charAt(0) !== '(') {window.document.title = '(!) ' + window.document.title;}
      }
    }
  });
}

function notify(notificationText) {
  if (Notification.permission !== 'granted')
    Notification.requestPermission();
  else {
    var notification = new Notification('New Post', {
      icon: 'https://mtglitch.com/forums/styles/jank/theme/images/site_logo1.png',
      body: notificationText,
    });

    notification.onclick = function () {
      window.open('https://mtglitch.com/forums/search.php?search_id=unreadposts', '_self');      
    };
  }
}