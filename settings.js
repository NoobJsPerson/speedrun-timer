let modMessage = 'Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://speedrun-timer.itsmeme11.repl.co)';
let currentModMessage = localStorage.getItem("cmm");
if(!currentModMessage){
  localStorage.setItem("cmm",modMessage);
  currentModMessage = modMessage;
}
document.getElementById("cstmmsg").value = currentModMessage
function smm(event){
  if (event && event.target.value.replace(/\s/g, "") && event.target.value != modMessage){
    currentModMessage = event.target.value;
		localStorage.setItem("cmm", currentModMessage);
  }
}
