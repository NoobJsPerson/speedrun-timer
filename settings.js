let modMessage = "Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://noobjsperson.github.io/speedrun-timer)";
let currentModMessage = localStorage.getItem("cmm");
document.getElementById("cstmmsg").value = currentModMessage;
if(!currentModMessage){
  localStorage.setItem("cmm",modMessage);
  currentModMessage = modMessage;
}
document.documentElement.setAttribute("theme", localStorage.getItem('theme'));
function smm(event){
  if (event && event.target.value.replace(/\s/g, "") && event.target.value != modMessage){
    currentModMessage = event.target.value;
		localStorage.setItem("cmm", currentModMessage);
  }
}
function changeMode() {
  let wanted = localStorage.getItem("theme") == "dark" ? "light" : "dark"
  document.documentElement.setAttribute("theme", wanted)
  localStorage.setItem("theme", wanted);
}

function resetmodmessage(event) {
  localStorage.setItem("cmm",modMessage);
  currentModMessage = modMessage;
  document.getElementById('cstmmsg').value = currentModMessage;
}