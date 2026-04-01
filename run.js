// ==========================
// BUILD EXAMPLE LIST
// ==========================
const ul = document.querySelector(".examples");
console.log(ul);

function deactivateExamples() {
    // get all elements with class "example"
    var examples = document.getElementsByClassName("example");

    // convert HTMLCollection to Array so we can iterate safely
    Array.from(examples).forEach(function(el) {
        // remove "active" class if present
        el.classList.remove("active");
    });	
}
// initialise example list.
examples.forEach(example => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = "#";
  a.textContent = example.name;
  example.dom=a;
  

  a.onclick = function(e) {
    e.preventDefault();
	deactivateExamples();
	a.className="example active";
	revealText(document.getElementById("code"), example.code, 100);
    document.getElementById("output").innerHTML = "";
    document.getElementById("hint").innerHTML = "";
    document.getElementById("comment").innerHTML = "";
	revealText(document.getElementById("exercise"), example.exercise, 300);
    document.getElementById("start_lesson").style.display = "";
    current_example = example; 

  	if(typeof(playSfx)!="undefined")playSfx("loadExample");

  };

  li.appendChild(a);
  ul.appendChild(li);
});
let current_example=null;

// typewriter effect
function revealText(element, text, duration = 300) {
  // Store full text in attribute
  element.setAttribute("goal", text);

  // Initialize count
  element.setAttribute("count", 0);

  // Clear current content
  element.innerHTML = "";

  const totalChars = text.length;
  if (totalChars === 0) return;

  // Compute per-character interval
  const interval = duration / totalChars;

  function animate() {
    let goal = element.getAttribute("goal");
    let count = parseInt(element.getAttribute("count"), 10);

    // Increase count
    count++;
    element.setAttribute("count", count);

    // Update visible text
    element.innerHTML = goal.substring(0, count);

    // Stop when done
    if (count >= totalChars) return;

    // Continue animation
    setTimeout(animate, interval);
  }

  // Start the animation loop
  animate();
}
// ==========================
// OUTPUT FUNCTION
// ==========================
function createOutput(outputDiv) {
  return function print(...values) {
    const line = document.createElement("div");
	revealText(line, values.map(v => String(v)).join(" "), 300);

    outputDiv.appendChild(line);
  };
}

// ==========================
// RUN CODE
// ==========================
  document.getElementById("run").onclick = function () {
  const code = document.getElementById("code").textContent;
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = "";
  	if(typeof(playSfx)!="undefined")playSfx("runExample");


  const print = createOutput(outputDiv);

  try {
    new Function("print", code)(print);
	console.log(current_example);	
	outputDiv.style.background="#222"; 
	outputDiv.style.color="#ddd"; 
	outputDiv.style.borderColor="#888"; 
  } catch (err) {
	if(typeof(playSfx)!="undefined")playSfx("error");
	if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("voice_error",200);
    print("Error:", err.message);
	outputDiv.style.background="#400"; 
	outputDiv.style.color="#f00"; 
	outputDiv.style.borderColor="#800"; 
  }
  setTimeout(checkAnswer,350);
};

function checkAnswer()
{
  const outputDiv = document.getElementById("output");
  if(outputDiv.innerText==current_example.correct)
  {
	outputDiv.style.background="#020"; 
	outputDiv.style.color="#0d0"; 
	outputDiv.style.borderColor="#080"; 


	document.getElementById("comment").innerText="";// correct.
	// add a little check to the exercise.
	if(current_example.dom.innerText.substr(0,1)!="✓")
		current_example.dom.innerHTML="✓ "+current_example.dom.innerHTML;
		if(typeof(playSfx)!="undefined")playSfx("correct");
		if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("voiceCorrect",350);

	else
	{
		// user is trying again after succes..
		document.getElementById("comment").innerText="You already did this one, proceed to the next exercise by pressing the buttons at the top of the page.";// correct.
		if(typeof(playSfx)!="undefined")playSfx("terminal");
		if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("voiceError",350);
	}
	
	checkAllComplete();
  }else{
	outputDiv.style.background="#400"; 
	outputDiv.style.color="#f00"; 
	outputDiv.style.borderColor="#f00"; 
	if(typeof(playSfx)!="undefined")playSfx("incorrect");
		if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("voiceIncorrect",400);
	// show the hint link..	
	document.getElementById("hint").innerHTML='';
	if (typeof(current_example.hint) !== "undefined") 
	{
		// get the container
		var hintContainer = document.getElementById("hint");

		// create clickable label
		var hintLabel = document.createElement("div");
		hintLabel.innerHTML = "📺 Watch this hint, if you are stuck...";
		hintLabel.style.cursor = "pointer";
		hintLabel.style.fontWeight = "bold";
		hintLabel.style.marginBottom = "6px";

		// create the iframe but hide it initially
		var hintIframe = document.createElement("iframe");
		hintIframe.width = "560";
		hintIframe.height = "315";
		hintIframe.src = "https://www.youtube.com/embed/" + current_example.hint;
		hintIframe.title = "Hint Video";
		hintIframe.frameBorder = "0";
		hintIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
		hintIframe.allowFullscreen = true;
		hintIframe.style.display = "none"; // hide initially

		// toggle iframe visibility when label is clicked
		hintLabel.addEventListener("click", function() {
			hintIframe.style.display = hintIframe.style.display === "none" ? "block" : "none";
		});

		// append to container
		hintContainer.appendChild(hintLabel);
		hintContainer.appendChild(hintIframe);
	}
	document.getElementById("comment").innerText='expected output = "'+current_example.correct+'"\nChange the code to produce this output';
  }
}

function checkAllComplete()
{
	let complete=true;
	let nextclicked=false;
	for(let i in examples)
	{
		let example=examples[i];
		console.log(typeof(example.dom));
		if (typeof example !== "undefined" && typeof example.dom !== "undefined")
		{
			console.log("example first char:"+example.dom.innerText.substr(0,1));
			if(example.dom.innerText.substr(0,1)!="✓")
			{
				complete=false;
				if(nextclicked==false)
				{
					nextclicked=true;
					// now load this one..
					setTimeout(function() {
					  example.dom.click();
					}, 1500);	
				}					
			}
		}else
		{
			console.log("yo teach, remove the comma at the end of the example declaration, please!")
		}
	}
	if(complete)
	{
		let comment=document.getElementById("comment")
		comment.innerText='';
		var nextButton=document.createElement("button");
		nextButton.innerHTML="Well done! Ready for the next lesson?";
		if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("welldone",300);
		if(typeof(playDelayedSfx)!="undefined")playDelayedSfx("voiceComplete",2000);
		// GOTO: next_lesson_url
		comment.appendChild(nextButton);
		nextButton.addEventListener("click", gotoNextLesson);
	}
	function gotoNextLesson()
	{
		location.href=next_lesson_url;
	}

}