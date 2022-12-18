let modMessage = "Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://noobjsperson.github.io/speedrun-timer)";
let currentModMessage = localStorage.getItem("cmm") || modMessage;
const select = document.getElementsByTagName("select")[0];
select.value = localStorage.getItem('LA') || 'EN';
select.onchange = function (event) {
  localStorage.setItem('LA', event.target.value);
  translatePage(false);
}
document.getElementById("cstmmsg").value = currentModMessage;
document.documentElement.setAttribute("theme", localStorage.getItem('theme') || 'light');
function smm(event) {
  if (event && event.target.value.replace(/\s/g, "") && event.target.value != modMessage) {
    currentModMessage = event.target.value;
    localStorage.setItem("cmm", currentModMessage);
  }
}
function changeMode() {
  let wanted = localStorage.getItem("theme") == "dark" ? "light" : "dark"
  document.documentElement.setAttribute("theme", wanted)
  localStorage.setItem("theme", wanted);
}

function resetmodmessage() {
  localStorage.removeItem("cmm");
  document.getElementById('cstmmsg').value = modMessage;
}

function changecss() {
  let wanted = localStorage.getItem("css") == "old_css" ? "normal" : "old_css"
  document.documentElement.setAttribute("theme", wanted)
  localStorage.setItem("css", wanted);
  location = ""
}