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
	var audio=document.getElementById("audio_"+id);
	if(audio!=null)
	{
		audio.play();
	}
}
