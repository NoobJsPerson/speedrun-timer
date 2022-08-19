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
const searchParams = new URLSearchParams(window.location.search);
const videoId = searchParams.get('id');
// Load the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//date
let crdate = NaN;

// Load page elements
const totalTimeSpan = document.getElementById('total-time'),
    siteVideoIdInput = document.getElementById('video-id'),
    startValueInput = document.getElementById('start-value'),
    endValueInput = document.getElementById('end-value'),
    startSpan = document.getElementById('start'),
    goToStartButton = document.getElementById('go-to-start'),
    endSpan = document.getElementById('end'),
    goToEndButton = document.getElementById('go-to-end'),
    currentTimeSpan = document.getElementById('current-time'),
    modMessageText = document.getElementById("modMessage"),
    modMessageButton = document.getElementById("modMessageButton"),
    currentFrameSpan = document.getElementById('current-frame'),
    framerateElement = document.getElementById("framerate"),
    type = searchParams.get("type")[0];
let videoDiv = document.getElementById('video-div'),
    cmm = localStorage.getItem("cmm") || "Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://noobjsperson.github.io/speedrun-timer)";
// Create page variables
let start = null,
    end = null,
    currentMillis = 0,
    currentFrame = 0,
    framerate = 30,
    isLoaded = false;

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
function copyModMessage() {
    // Allow user to copy mod message to clipboard

    modMessageText.focus();
    modMessageText.select();
    document.execCommand('copy');
    alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`);
}
function updateTotalTime() {

    // handle negative time I guess
    if (start !== null && end !== null && start <= end) {


        const endFrame = Math.round(end / 1000 * framerate);
        const startFrame = Math.round(start / 1000 * framerate);
        const frames = endFrame - startFrame;

        let ms = ~~(frames * 1000 / framerate);
        let timeStr = format(ms);
        //get current date
        crdate = new Date();
        //adds the date to the params
        const params = {
            start: format(start),
            end: format(end),
            timeStr,
            framerate,
            crdate
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
    startValueInput.value = start;
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
    endValueInput.value = end;
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
    videoDiv = document.getElementById('video-div');
    player.playVideo();
    if (type == "t") setTimeout(() => framerateElement.value = twitch.getPlaybackStats().fps, 6000);
    setInterval(updateCurrentTimeSpan, 50);
}

// Load the player.
if (type == "y") {

    let youtube;
    function onYouTubePlayerAPIReady() {
        youtube = new YT.Player("video-div", {
            videoId: videoId,
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
} else {
    let twitch = new Twitch.Player("video-div", {
        video: videoId
    });

    player = {
        seekTo: function (timestamp) {
            player.playVideo();
            setTimeout(function () {
                twitch.seek(timestamp);
                setTimeout(function () {
                    twitch.seek(timestamp);
                    player.pauseVideo();
                }, 50)
            }, 50);
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
}
function computeFromDebugValues() {

}
function parseForTime(event) {
    framerate = parseInt(document.getElementById('framerateAlt').value || framerate);
    const lct = parseFloat((JSON.parse(event.target.value)).lct);
    if (isNaN(lct)) return;
    if (event.target.id == "startobj") start = lct
    else end = lct
    document.getElementById(event.target.id).value = `${Math.floor(lct * framerate) / framerate}`;
}
