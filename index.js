const  inputUrl = document.getElementById('url');
const theme = localStorage.getItem("theme");
document.documentElement.setAttribute("theme", localStorage.getItem('theme'));
if(!currentModMessage){
  localStorage.setItem("cmm",modMessage);
  currentModMessage = modMessage;
}
function parseTwitchId(vodUrl) {
    const reg = vodUrl.match(/twitch\.tv\/videos\/(\d+)/);
    if (reg && reg.length >= 2) return reg[1];
}

function parseYoutubeId(videoUrl) {
    const reg1 = videoUrl.match(/youtube\..+?\/watch.*?v=(.*?)(?:&|\/|$)/);
    if (reg1 && reg1.length >= 2) {
        return reg1[1];
    }
    const reg2 = videoUrl.match(/youtu\.be\/(.*?)(?:\?|&|\/|$)/);
    if (reg2 && reg2.length >= 2) {
        return reg2[1];
    }
    const reg3 = videoUrl.match(/youtube\..+?\/embed\/(.*?)(?:\?|&|\/|$)/);
    if (reg3 && reg3.length >= 2) {
        return reg3[1];
    }
    return videoUrl;
}



function redirectYoutube() {
    window.location.href = "new_run.html?id=" + parseYoutubeId(inputUrl.value) + "&type=y";
}

function redirectTwitch() {
    window.location.href = "new_run.html?id=" + parseTwitchId(inputUrl.value) + "&type=t";
}