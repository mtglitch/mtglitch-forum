function getUserName() {
    return $('#username_logged_in .username').text() || 'Special Week';
}

$('.content').toArray().forEach(function(div) {
    div.innerHTML = div.innerHTML.replace(/\[you\]/g, getUserName()) });
