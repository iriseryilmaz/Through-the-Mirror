// Interactive Psychoanalytic Art Project
// Through the Mirror
//"Kendi aynadaki yansımanı görmek, kim olduğunu anlamanın başlangıcıdır." - Jacques Lacan

var stage = 0; // Tracks the current stage of the experience
var questions = [];
var currentQuestionIndex = 0;
var yesButton, noButton;
var noButtonX, noButtonY;
var showCamera = false;
var noButtonDodging = false;
var soundMysterious, buttonClickSound;

var cam;
var curCamAlpha = 0;


let tickTime = 2; // unvisible for 2 seconds
let visibleTime = 3; // Make it visible for 3 seconds
let initTime = 0;

function preload() {
  // Load background music and button click sound
  soundMysterious = loadSound('mysterious.mp3');
  buttonClickSound = loadSound('audiomass-output.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont("monospace");
	
	// Create cam
	cam = createCapture(VIDEO).size(width, height).position(0, 0);
	cam.hide();
	
  // Play background music in a loop
  soundMysterious.loop();

  // Initialize questions
  questions = shuffle([
    "Do you often dream vividly?",
    "Do you trust people easily?",
    "Are you afraid of being alone?",
    "Do you feel the need to control situations?",
    "Do you often reflect on past experiences?",
    "Is change something you embrace or fear?",
    "Do you feel connected to your emotions?",
    "Do you believe in destiny?",
    "Do you value logic over emotions?",
    "Are you comfortable with uncertainty?",
    "Do you consider yourself an empathetic person?",
    "Do you enjoy deep conversations?",
    "Do you often seek approval from others?",
    "Are you content with who you are?",
    "Do you find it easy to forgive others?",
    "Do you believe in true love?",
    "Do you feel a strong connection to nature?",
    "Do you often feel misunderstood?",
    "Do you prefer structure over spontaneity?",
    "Do you believe people can change?"
  ]).slice(0, 10);

  // Button setup
  yesButton = createButton("YES");
  yesButton.position(width / 2 - 120, height / 2 + 50);
  yesButton.mousePressed(handleYes);
	yesButton.addClass("btnyes");
  //styleButton(yesButton, "#000", "#ccc", "#444", "#fff");

  noButton = createButton("NO");
  noButtonX = width / 2 + 20;
  noButtonY = height / 2 + 50;
  noButton.position(noButtonX, noButtonY);
  noButton.mousePressed(handleNo);
	noButton.addClass("btnyes");
	//noButton.addClass("btnNoStyle");

  //styleButton(noButton, "#000", "#ccc", "#444", "#fff");
	
		initTime = millis(); // returns the how long milliseconds passed since we hit run button.

}

function draw() {
  // Screen background
  background(40);
  fill(220);
  stroke(255);
  strokeWeight(4);
  rect(50, 50, width - 100, height - 100);
  noStroke();

  fill(255);
  textSize(18);

  if (stage === 0) {
    // Opening screen
    text("WELCOME TO THE EXPERIENCE\n", width / 2, height / 2 - 120);
    text("Get ready to meet someone. This is your first date.\n", width / 2, height / 2 - 80);
    text("You will answer some questions to get to know him/her.\n", width / 2, height / 2 - 40);
    text("Press 'YES' to start or 'NO' to exit.", width / 2, height / 2);
    yesButton.show();
    noButton.show();
  } else if (stage === 1) {
    // Question sequence
    yesButton.show();
    noButton.show();

    if (currentQuestionIndex < questions.length) {
      text(questions[currentQuestionIndex], width / 2, height / 2);
    } else {
      // Transition to final stage
      stage = 2;
      yesButton.hide();
      noButton.hide();
    }
  } else if (stage === 2) {
    // Final decision stage
    text("Would you like to meet this person?", width / 2, height / 2 - 50);
    yesButton.show();
    noButton.show();
    yesButton.position(width / 2 - 100, height / 2 + 50);
    noButton.position(noButtonX, noButtonY);

    // Move the "No" button if mouse is near
    if (dist(mouseX, mouseY, noButtonX + 50, noButtonY + 25) < 75) {
      noButtonDodging = true;
      noButtonX = constrain(random(noButtonX - 100, noButtonX + 100), 50, width - 100);
      noButtonY = constrain(random(noButtonY - 100, noButtonY + 100), 50, height - 100);
      noButton.position(noButtonX, noButtonY);
    } else {
      noButtonDodging = false;
    }
  } else if (stage === 3) {
    // Camera reveal
    yesButton.hide();
    noButton.hide();

    if (!showCamera) {
      showCamera = true;
    } else {
			curCamAlpha = curCamAlpha + 0.1;
			if(curCamAlpha > 255) {
				curCamAlpha = 255;
			}
		}
		
		tint(255, curCamAlpha);
		image(cam, 0, 0);

    fill(0);
    text("This is the person you just met.", width / 2, height - 80);
  }
}

function handleYes() {
  buttonClickSound.play();
  if (stage === 0) {
    stage = 1;
  } else if (stage === 1) {
    currentQuestionIndex++;
  } else if (stage === 2) {
    stage = 3;
  }
}

function handleNo() {
  buttonClickSound.play();
  if (stage === 1) {
    currentQuestionIndex++;
  } else if (stage === 2 && !noButtonDodging) {
    // "No" button dodges, nothing happens
  }
}

function styleButton(button, textColor, bgColor, hoverColor, borderColor) {
  button.style("color", textColor);
  button.style("background-color", bgColor);
  button.style("font-size", "16px");
  button.style("padding", "10px 20px");
  button.style("border", "2px solid " + borderColor);
  button.style("border-radius", "2px");
  button.style("font-family", "Courier, monospace");
  button.style("cursor", "pointer");
  button.mouseOver(() => button.style("background-color", hoverColor));
  button.mouseOut(() => button.style("background-color", bgColor));
}



