// set up lib and sound effects.
var lib=document.createElement("div");
lib.style.display="none";
document.body.appendChild(lib);
// now load the sfx.
console.log("preloading audio");
preloadSfx("runExample","sfx/sfx_calculate.mp3");
preloadSfx("loadExample","sfx/sfx_load.mp3");
preloadSfx("welldone","sfx/sfx_celebrate.mp3");
preloadSfx("error","sfx/sfx_error.mp3");
preloadSfx("incorrect","sfx/sfx_incorrect.mp3");
preloadSfx("correct","sfx/sfx-correct.mp3");
preloadSfx("terminal","sfx/sfx-terminal_error.mp3");
preloadSfx("voiceCorrect","sfx/voice_correct.mp3");
preloadSfx("voiceError","sfx/voice_error.mp3");
preloadSfx("voiceIncorrect","sfx/voice_incorrect.mp3");
preloadSfx("voiceComplete","sfx/voice_complete.mp3");

// create sfx and voice control and add to bottom right of page
// Create UI
const panel = document.createElement("div");
panel.id = "audio-controls";

panel.innerHTML = `
  <label>
    <input type="checkbox" id="toggle-sfx">
    SFX
  </label>
  <br>
  <label>
    <input type="checkbox" id="toggle-voice">
    voice
  </label>
`;

document.body.appendChild(panel);

// Add styles
const style = document.createElement("style");
style.textContent = `
#audio-controls {
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: rgba(0,0,0,0.75);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 9999;
}
#audio-controls input {
  margin-right: 6px;
}
`;
document.head.appendChild(style);

// Load saved settings
const sfxToggle = document.getElementById("toggle-sfx");
const voiceToggle = document.getElementById("toggle-voice");

sfxToggle.checked = localStorage.getItem("sfxEnabled") !== "false";
voiceToggle.checked = localStorage.getItem("voiceEnabled") !== "false";

// Hook into your audio system
function updateAudioSettings() {
  const sfxEnabled = sfxToggle.checked;
  const voiceEnabled = voiceToggle.checked;

  localStorage.setItem("sfxEnabled", sfxEnabled);
  localStorage.setItem("voiceEnabled", voiceEnabled);

  // 🔊 Hook into your sfx.js here
  if (window.sfx) {
    window.sfx.setEnabled(sfxEnabled);
  }

  if (window.voice) {
    if (voiceEnabled) {
      window.voice.play?.();
    } else {
      window.voice.pause?.();
    }
  }
}

// Event listeners
sfxToggle.addEventListener("change", updateAudioSettings);
voiceToggle.addEventListener("change", updateAudioSettings);

// Initialize once
updateAudioSettings();

// rest

function playDelayedSfx(id,timeout)
{
	console.log("playDelayedSfx promisse ",id,timeout);
	setTimeout(function () {
	console.log("playDelayedSfx fulfill",id,timeout);
	  playSfx(id);
	}, timeout);
}
function preloadSfx(id,url)
{
	var audio=document.createElement("audio");
	audio.id="audio_"+id;
	audio.src=url;
	audio.controls=true;
	lib.appendChild(audio);
}

function playSfx(id)
{
	  const sfxEnabled = localStorage.getItem("sfxEnabled") !== "false";
  const voiceEnabled = localStorage.getItem("voiceEnabled") !== "false";

  // If it's a voice clip
  if (id.toLowerCase().includes("voice")) {
    if (!voiceEnabled) return;
  } else {
    // Regular SFX
    if (!sfxEnabled) return;
  }

	
	var audio=document.getElementById("audio_"+id);
	if(audio!=null)
	{
		audio.play();
	}
}
