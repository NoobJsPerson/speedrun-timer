/* eslint-disable no-unused-vars */
const inputUrl = document.getElementById('url');
const ytRegex = /youtu(?:be\..+?|.be)\/(?:watch.*?v=|embed\/|shorts\/|)([A-Za-z0-9_-]+).*?((?<=(?:\?|&)t=))*(\d+)*/;
const twRegex = /twitch\.tv\/videos\/(\d+)/;
const generalIdRegex = /([a-zA-Z0-9]+)/;

const select = document.getElementsByTagName('select')[0];
select.value = localStorage.getItem('LA') || 'EN';
select.onchange = (event) => {
	localStorage.setItem('LA', event.target.value);
	// eslint-disable-next-line no-undef
	translatePage(false);
};

function parseTwitchId(vodUrl) {
	if (!vodUrl || !vodUrl.match(generalIdRegex)) return alert('Please enter a valid Twitch VOD link');
	const reg = vodUrl.match(twRegex);
	if (reg && reg.length >= 2) return reg[1];
	if (vodUrl.match(ytRegex)) return alert('You seem to have entered a Youtube Video link. You may want to press the "Load from Youtube" Button instead.');
	return vodUrl;
}

function parseYoutubeId(videoUrl) {
	if (!videoUrl || !videoUrl.match(generalIdRegex)) return alert('Please enter a valid Youtube Video link');
	const reg1 = videoUrl.match(ytRegex);
	if (reg1 && reg1.length >= 2) return [reg1[1], reg1[2]];
	if (videoUrl.match(twRegex)) return alert('You seem to have entered a Twitch VOD link. You may want to press the "Load from Twitch" Button instead.');
	return [videoUrl, null];
}

function redirectYoutube() {
	const [id, t] = parseYoutubeId(inputUrl.value);
	if (id) window.location.href = `new_run.html?id=${id}&type=y${t ? `&t=${t}` : ''}`;
}

function redirectTwitch() {
	const id = parseTwitchId(inputUrl.value);
	if (id) window.location.href = `new_run.html?id=${id}&type=t`;
}

function redirectGoogleDrive() {

	// if (id) window.location.href = `new_run.html?id=${id}&type=g`
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/speedrun-timer/ServiceWorker.js');
	});
}
