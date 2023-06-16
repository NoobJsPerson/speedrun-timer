function interpolate(template, variables) {
	return template.replace(/\${[^{]+}/g, (match) => {
		const path = match.slice(2, -1).trim();
		return variables[path];
	});
}

function format(duration) {
	let hours = ~~(duration / 3600000);

	let minutes = ~~((duration % 3600000) / 60000);
	let seconds = ((duration % 60000) / 1000).toFixed(3);

	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	return hours + ":" + minutes + ":" + seconds;

};
// Initialise URL Params
const searchParams = new URLSearchParams(window.location.search),
	videoIframe = document.querySelector("iframe"),
	videoId = searchParams.get("id"),
	type = searchParams.get("type"),
	time = +searchParams.get("t");
console.log(time)
if (type == 'y') {
	videoIframe.src = `https://img.youtube.com/vi/${videoId}/0.jpg`
	// Load the IFrame Player API code asynchronously.
	let tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
} else if (type == 't') {
	videoIframe.hidden = true;
}



// Load page elements
const totalTimeSpan = document.getElementById('total-time'),
	siteVideoIdInput = document.getElementById('video-id'),
	startSpan = document.getElementById('start'),
	goToStartButton = document.getElementById('go-to-start'),
	endSpan = document.getElementById('end'),
	goToEndButton = document.getElementById('go-to-end'),
	currentTimeSpan = document.getElementById('current-time'),
	modMessageText = document.getElementById("modMessage"),
	modMessageButton = document.getElementById("modMessageButton"),
	currentFrameSpan = document.getElementById('current-frame'),
	framerateElement = document.getElementById("framerate"),
	cmm = localStorage.getItem("cmm") || "Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://noobjsperson.github.io/speedrun-timer)";
// Create page variables
let start = null,
	end = null,
	currentMillis = 0,
	currentFrame = 0,
	framerate = 30,
	isLoaded = false,
	twitch;

// Apply Appearance Mode
document.documentElement.setAttribute("theme", localStorage.getItem('theme'));

// Fallback Player
let player = {
	seekTo: function () {
		throw 'unimplemented';
	},
	pauseVideo: function () {
		throw 'unimplemented';
	},
	getCurrentTime: function () {
		throw 'unimplemented';
	},
	playVideo: function () {
		throw 'unimplemented';
	}
};

function validateFramerate() {
	framerate = parseInt(framerateElement.value || framerate);
	framerateElement.value = framerate;
}

function updateCurrentTime() {
	currentMillis = Math.floor(player.getCurrentTime() * 1000);
	currentFrame = Math.floor(player.getCurrentTime() * framerate);
}

function setTime(millis) {
	player.pauseVideo();
	player.seekTo(millis);
}

function stepBy(amount) {
	player.pauseVideo();
	updateCurrentTime();
	setTime(Math.ceil(((currentFrame + amount) / framerate) * 1000) / 1000);
}
async function copyModMessage() {
	// Allow user to copy mod message to clipboard

	modMessageText.focus();
	modMessageText.select();
	document.execCommand('copy');
	alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`)

	// I dont know why this approach doesn't work. If you can fix it please make a pull request
	// function oldCopy() {
	// 	modMessageText.focus();
	// 	modMessageText.select();
	// 	document.execCommand('copy');
	// 	alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`)
	// }
	// const result = await navigator.permissions.query({ name: "clipboard-write" })
	// console.log(result.state)
	// if (result.state == "granted") {
	// 	navigator.clipboard.writeText(modMessageText.innerText).then(
	// 		() => { alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`) },
	// 		oldCopy);
	// } else {
	// 	oldCopy();
	// }

}
function updateTotalTime() {

	// handle negative time I guess
	if (start !== null && end !== null && start <= end) {


		const endFrame = Math.round(end / 1000 * framerate);
		const startFrame = Math.round(start / 1000 * framerate);
		const frames = endFrame - startFrame;

		let ms = ~~(frames * 1000 / framerate);
		let timeStr = format(ms);
		const params = {
			start: format(start),
			end: format(end),
			timeStr,
			framerate
		};

		const modMessage = interpolate(cmm, params);
		totalTimeSpan.innerHTML = timeStr;
		modMessageText.value = modMessage

		modMessageButton.disabled = false;
		modMessageText.disabled = false;
	}
}

function showStart() {
	if (start === null) {
		return;
	}

	startSpan.innerHTML = start;
	goToStartButton.style.visibility = "visible";


}

function setStart() {
	updateCurrentTime();
	start = currentMillis;
	showStart();
	updateTotalTime();
}

function goToStart() {
	setTime(start / 1000);
}

function showEnd() {
	if (end === null) {
		return;
	}

	endSpan.innerHTML = end;
	goToEndButton.style.visibility = "visible";


}

function setEnd() {
	updateCurrentTime();
	end = currentMillis;
	showEnd();
	updateTotalTime();
}

function goToEnd() {
	setTime(end / 1000);
}



function updateCurrentTimeSpan() {
	updateCurrentTime();
	currentTimeSpan.innerHTML = currentMillis;
	currentFrameSpan.innerHTML = currentFrame;
}

function onPlayerReady() {
	player.playVideo();
	if (time) player.seekTo(time);
	if (type == "t") setTimeout(() => framerateElement.value = twitch.getPlaybackStats().fps, 3000);
	setInterval(updateCurrentTimeSpan, 50);
}

// Load the player.
console.log(type);
if (type == "y") {
	videoIframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
	let youtube;
	function onYouTubePlayerAPIReady() {
		youtube = new YT.Player("video-iframe", {
			playerlets: {
				rel: 0,
			},
			events: {
				'onReady': onYoutubeReady,
				'onError': onYoutubeError,
				'onStateChange': onYoutubeChange
			}
		});
		setTimeout(() => {
			if (isLoaded != true) onYoutubeError();
		}, 5000);

	}

	function onYoutubeChange(event) {
		if (event.data == -1) isLoaded = true;
	}

	function onYoutubeError(event) {
		console.log(event)
		if (event?.data === '5') return; // return if the video is private
		document.querySelector(".for-debug").style.display = "initial";
		document.querySelector(".for-player").style.display = "none";

	}

	function onYoutubeReady() {
		console.log("ready")
		player = {
			seekTo: function (timestamp) {
				youtube.seekTo(timestamp);
			},
			pauseVideo: function () {
				youtube.pauseVideo();
			},
			getCurrentTime: function () {
				return youtube.getCurrentTime();
			},
			playVideo: function () {
				youtube.playVideo();
			}
		};
		onPlayerReady();
	}
} else if (type == "t") {
	twitch = new Twitch.Player("video-div", {
		video: videoId
	});

	player = {
		seekTo: function (timestamp) {
			// player.playVideo();
			twitch.seek(timestamp);
			// player.pauseVideo();
		},
		pauseVideo: function () {
			twitch.pause();
		},
		getCurrentTime: function () {
			return twitch.getCurrentTime();
		},
		playVideo: function () {
			twitch.play();
		}
	};
	twitch.addEventListener(Twitch.Player.READY, onPlayerReady);
} else {
	document.body.innerText = "You shouldn't be here";
}
function parseForTime(event) {
	framerate = parseInt(document.getElementById('framerateAlt').value || framerate);
	const lct = parseFloat((JSON.parse(event.target.value)).lct);
	if (isNaN(lct)) return;
	if (event.target.id == "startobj") start = lct
	else end = lct
	document.getElementById(event.target.id).value = `${Math.floor(lct * framerate) / framerate}`;
}
