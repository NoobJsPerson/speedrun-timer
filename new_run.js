function interpolate(template, variables){
	return template.replace(/\${[^{]+}/g, (match) => {
		const path = match.slice(2, -1).trim();
		return variables[path];
	});
}

function format(duration){
    let hours = ~~(duration/3600000);
 
    let minutes = ~~((duration % 3600000)/60000);
    let seconds = ((duration % 60000)/1000).toFixed(3);
    
    minutes = minutes < 10 ? "0"+minutes: minutes;
    seconds = seconds < 10 ? "0"+seconds: seconds;

  return hours+":"+minutes+":"+seconds;
  
};
// Load URL Params
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const videoId = getParameterByName('id');
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 
// Load page elements
const totalTimeSpan = document.getElementById('total-time');
const siteVideoIdInput = document.getElementById('video-id');
const startValueInput = document.getElementById('start-value');
const endValueInput = document.getElementById('end-value');
const startSpan = document.getElementById('start');
const goToStartButton = document.getElementById('go-to-start');
const endSpan = document.getElementById('end');
const goToEndButton = document.getElementById('go-to-end');
const currentTimeSpan = document.getElementById('current-time');
const modMessageText = document.getElementById("modMessage");
const modMessageButton = document.getElementById("modMessageButton");
const currentFrameSpan = document.getElementById('current-frame');
let videoDiv = document.getElementById('video-div');
const framerateElement = document.getElementById("framerate");
const type = getParameterByName("type");
let cmm = localStorage.getItem("cmm") || "Mod Message: time starts at ${start} and ends at ${end} with a framerate of ${framerate} fps to get a final time of ${timeStr}, retimed using [Better SpeedrunTimer](https://speedrun-timer.itsmeme11.repl.co)";
// Create page variables
var start = null;
var end = null;
var currentMillis = 0;
var currentFrame= 0;
var framerate = 30;
let isLoaded = false;

// Apply Appearance Mode
document.documentElement.setAttribute("theme", localStorage.getItem('theme'));
 
// Fallback Player
var player = {
    seekTo: function() {
        throw 'unimplemented';
    },
    pauseVideo: function() {
        throw 'unimplemented';
    },
    getCurrentTime: function() {
        throw 'unimplemented';
    },
    playVideo: function() {
        throw 'unimplemented';
    }
};

function validateFramerate (){
  framerate = parseInt(framerateElement.value||framerate);
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
    setTime((currentFrame + amount)/framerate);
}
 function copyModMessage() {
	// Allow user to copy mod message to clipboard
	
	modMessageText.focus();
	modMessageText.select();
	document.exec('copy');
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
        const params = {
          start: format(start),
          end: format(end),
          timeStr,
          framerate
        };
        
        const modMessage = interpolate(cmm,params);
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
    setTime(start/1000);
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
    setTime(end/1000);
}
 

 
function updateCurrentTimeSpan() {
    updateCurrentTime();
    currentTimeSpan.innerHTML = currentMillis;
    currentFrameSpan.innerHTML = currentFrame;
}
 
function onPlayerReady() {
    videoDiv = document.getElementById('video-div');
    player.playVideo();
    if(type == "t") setTimeout(() => framerateElement.value = twitch.getPlaybackStats().fps,6000);
    setInterval(updateCurrentTimeSpan, 50);
}
 
// Load the player.
if(type == "y"){

    var youtube;
    function onYouTubePlayerAPIReady() {
        youtube = new YT.Player("video-div", {
            videoId: videoId,
            playerVars:{
                rel: 0,
            },
            events: {
                'onReady': onYoutubeReady,
                'onError': onYoutubeError,
                'onStateChange': onYoutubeChange
            }
        });
      setTimeout(() => {
        if(isLoaded != true) onYoutubeError();
      },5000);
        
    }

    function onYoutubeChange(event) {
      if(event.data == -1) isLoaded = true;
    }

    function onYoutubeError(event) {
      console.log(event)
      document.querySelector(".for-debug").style.display = "initial";
      document.querySelector(".for-player").style.display = "none";
      
    }
 
    function onYoutubeReady() {
      console.log("ready")
        player = {
            seekTo: function(timestamp) {
                youtube.seekTo(timestamp);
            },
            pauseVideo: function() {
                youtube.pauseVideo();
            },
            getCurrentTime: function() {
                return youtube.getCurrentTime();
            },
            playVideo: function() {
                youtube.playVideo();
            }
        };
        onPlayerReady();
    }
} else {
  var twitch = new Twitch.Player("video-div", {
        video: videoId
    });

    player = {
        seekTo: function (timestamp) {
            player.playVideo();
            setTimeout(function() {
                twitch.seek(timestamp);
                setTimeout(function() {
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
    twitch.addEventListener(Twitch.Player.READY,onPlayerReady);
}
function computeFromDebugValues(){

}
function parseForTime(event) {
   framerate = parseInt(document.getElementById('framerateAlt').value || framerate);
    const lct = parseFloat((JSON.parse(event.target.value)).lct);
    if(isNaN(lct)) return;
    if(event.target.id == "startobj") start = lct
    else end = lct
    document.getElementById(event.target.id).value = `${Math.floor(lct * framerate) / framerate}`;
}
