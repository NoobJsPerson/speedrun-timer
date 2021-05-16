const inputUrl = document.getElementById('url');
 
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
 
function redirect() {
    window.location.href = "/new_run.html?id=" + parseYoutubeId(inputUrl.value);
}