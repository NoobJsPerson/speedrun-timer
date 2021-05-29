const inputUrl = document.getElementById('url');
 function parseTwitchId(vodUrl){
   var reg = vodUrl.match(/twitch\.tv\/videos\/(\d+)/);
    if (reg && reg.length >= 2) return reg[1];
 }
function parseYoutubeId(videoUrl) {
    var reg1 = videoUrl.match(/youtube\..+?\/watch.*?v=(.*?)(?:&|\/|$)/);
    if (reg1 && reg1.length >= 2) {
        return reg1[1];
    }
 
    var reg2 = videoUrl.match(/youtu\.be\/(.*?)(?:\?|&|\/|$)/);
    if (reg2 && reg2.length >= 2) {
        return reg2[1];
    }
 
    var reg3 = videoUrl.match(/youtube\..+?\/embed\/(.*?)(?:\?|&|\/|$)/);
    if (reg3 && reg3.length >= 2) {
        return reg3[1];
    }
 
    return videoUrl;
}
 
function redirectYoutube() {
    window.location.href = "/new_run.html?id=" + parseYoutubeId(inputUrl.value); + "&type=y";
}
function redirectTwitch(){
  window.location.href = "/new_run.html?id=" + parseTwitchId(inputUrl.value) +"&type=t";
}