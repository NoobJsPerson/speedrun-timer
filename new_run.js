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
var videoDiv = document.getElementById('video-div');

// Create page variables
var start = null;
var end = null;
var currentMillis = 0;
 
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
 
 
function updateCurrentTime() {
    currentMillis = Math.floor(player.getCurrentTime() * 1000);
}
 
function setTime(millis) {
    player.pauseVideo();
    player.seekTo(millis / 1000);
}
 
function stepBy(amount) {
    player.pauseVideo();
    updateCurrentTime();
    setTime(Math.max(0, currentMillis + amount));
}
 
function updateTotalTime() {
    if (start !== null && end !== null) {
        const timeDiff = end - start;
        var timeStr = "";
 
        // handle negative time I guess
        if (timeDiff < 0) {
            timeStr += "-";
            timeDiff *= -1;
        }
        
        const framerate = parseInt(document.getElementById("framerate").value||"60");
        let frames = (timeDiff / 1000) * framerate;
        
        let minutes =0,hours=0;
        let seconds = Math.floor(frames / framerate);
        frames %= framerate;
        let ms = Math.round(frames / framerate * 1000); 
        if (ms < 10) {
        ms = '00' + ms;
    } else if (ms < 100) {
        ms = '0' + ms;
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    }
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    }
 
        timeStr += hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's ' + ms.toString() + 'ms';
    
 
        totalTimeSpan.innerHTML = timeStr;
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
    setTime(start);
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
    setTime(end);
}
 

 
function updateCurrentTimeSpan() {
    updateCurrentTime();
    currentTimeSpan.innerHTML = currentMillis;
}
 
function onPlayerReady() {
    videoDiv = document.getElementById('video-div');
    player.playVideo();
    setInterval(updateCurrentTimeSpan, 50);
    
}
 
// Load the player.
    var youtube;
 
    function onYouTubePlayerAPIReady() {
        youtube = new YT.Player("video-div", {
            width: 960,
            height: 540,
            videoId: videoId,
            events: {
                'onReady': onYoutubeReady
            }
        });
    }
 
    function onYoutubeReady() {
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
