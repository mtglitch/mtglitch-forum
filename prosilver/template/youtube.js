document.addEventListener("DOMContentLoaded",
  function() {
    $(".youtube-player").each(function(i) {
      this.attr("data-id", YouTubeGetID(this.attr("yt-url")));
    });

    var div, n, ids, queryIds, nameRequest,
      v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
      div = document.createElement("div");
      div.setAttribute("data-id", v[n].dataset.id);
      div.innerHTML = labnolThumb(v[n].dataset.id);
      div.onclick = labnolIframe;
      v[n].appendChild(div);
    }

    var apiKey = 'AIzaSyA_iS-AFRFMM0QWC_bMrfJL4L_rVdzTWsQ';
    ids = Object.values(v).map(function(x) {
      return x.dataset.id;
    });
    ids = ids.filter(function(el, index, self) {
      return self.indexOf(el) === index;
    });

    var vById = {};
    for (let i = 0; i < ids.length; i++) {
      vById[ids[i]] = Array.prototype.filter.call(v, function(el) {
        return el.dataset.id === ids[i];
      });
    }

    while (ids.length > 0) {
      queryIds = ids.splice(0, 50);
      nameRequest = $.ajax('https://content.googleapis.com/youtube/v3/videos?id=' + queryIds.join() + '&part=snippet&key=' + apiKey);
      nameRequest.done(function(result) {
        var titles = Object.values(result.items).map(function(x) {
          return [x.id, x.snippet.title];
        });
        for (let i = 0; i < titles.length; i++) {
          var videos = vById[titles[i][0]];
          videos.forEach(function(video) {
            div = document.createElement("div");
            div.setAttribute("class", "player-title");
            div.innerHTML = '<a href = "https://www.youtube.com/watch?v=' +
              titles[i][0] + '" target="_blank">' + titles[i][1] + '</a>';
            video.appendChild(div);
          });
        }
      });
    }
  });

function labnolThumb(id) {
  var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
    play = '<div class="play"></div>';
  return thumb.replace("ID", id) + play;
}

function labnolIframe() {
  var iframe = document.createElement("iframe");
  var embed = "https://www.youtube.com/embed/ID?autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}

/**
* Get YouTube ID from various YouTube URL
* @author: takien
* @url: http://takien.com
* For PHP YouTube parser, go here http://takien.com/864
*/

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}
