const modMessage = 'Mod Message: Time starts at ${start} and ends at ${end} with a framerate of ${framerate} FPS to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://noobjsperson.github.io/speedrun-timer)';
let currentModMessage = localStorage.getItem('currentModMessage') || modMessage;
const select = document.getElementsByTagName('select')[0];
select.value = localStorage.getItem('LA') || 'EN';
select.onchange = function (event) {
  localStorage.setItem('LA', event.target.value);
  translatePage(false);
};
document.getElementById('customModMessage').value = currentModMessage;
document.documentElement.setAttribute('theme', localStorage.getItem('theme') || 'light');
function setModMessage(event) {
  if (event && event.target.value.replace(/\s/g, '') && event.target.value !== modMessage) {
    currentModMessage = event.target.value;
    localStorage.setItem('currentModMessage', currentModMessage);
  }
}
function changeMode() {
  const wanted = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('theme', wanted);
  localStorage.setItem('theme', wanted);
}

function resetModMessage() {
  localStorage.removeItem('currentModMessage');
  document.getElementById('customModMessage').value = modMessage;
}
