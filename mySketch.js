// Interactive Psychoanalytic Art Project
// Through the Mirror
// "Kendi aynadaki yansımanı görmek, kim olduğunu anlamanın başlangıcıdır." - Jacques Lacan

var stage = 0; // Tracks the current stage of the experience
var questions = [];
var currentQuestionIndex = 0;
var yesButton, noButton, restartButton;
var noButtonX, noButtonY;
var showCamera = false;
var noButtonDodging = false;
var soundMysterious, buttonClickSound, cameraSound;

// camera h and w for 16:9
var h, w;

var cam;
var curCamAlpha = 0;
var font;

let tickTime = 40; // Unvisible for 40 seconds
let initTime = 0;

function preload() {
// Load the font
font = loadFont('Chalkboard-Regular.ttf');
// Load background music and button click sound
soundMysterious = loadSound('aphex.mp3');
buttonClickSound = loadSound('audiomass-output.mp3');
// Camera open sound
cameraSound = loadSound('camera-open.mp3'); // Ses dosyasını yükleyin
}

function setup() {
createCanvas(windowWidth, windowHeight);
textAlign(CENTER, CENTER);
textSize(32);
textFont(font);

	
// Play background music in a loop
soundMysterious.loop();

// Initialize questions
questions = shuffle([
	"Do you often dream vividly?",
	"Do you really know what you want \nin life, or do you sometimes feel indecisive?",
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
	"Do you prefer to stay in a place \nwhere you don’t feel entirely safe?",
	"Do you often feel misunderstood?",
	"Do you prefer structure over spontaneity?",
	"Do you believe people can change?"
]).slice(0, 10);

// Button setup
yesButton = createButton("YES");
yesButton.position(width / 2 - 65, height / 2 + 50);
yesButton.mousePressed(handleYes);
yesButton.addClass("btnyes");

noButton = createButton("NO");
noButtonX = width / 2 + 20;
noButtonY = height / 2 + 50;
noButton.position(noButtonX, noButtonY);
noButton.mousePressed(handleNo);
noButton.addClass("btnyes");

restartButton = createButton("RESTART");
restartButton.position(width / 2 - 50, height / 2 + 150);
restartButton.mousePressed(restart);
restartButton.addClass("btnyes");
restartButton.hide();

initTime = millis(); // Returns how long milliseconds passed since we hit the run button.
}

function draw() {
background(0);

// Frame
stroke(255);
strokeWeight(4);
noFill();
rect(50, 50, width - 100, height - 100);

// Headers
fill(255);
noStroke();
textSize(20);
textAlign(CENTER, BOTTOM);



// Main Stages
fill(255);
textAlign(CENTER, CENTER);
textSize(32);

if (restartButton.style('display') === 'block') {
	if (cam && showCamera) {
		cam.stop();
		cam.remove();
		showCamera = false; // Kamera bir daha çalışmasın
	}
}

if (stage === 0) {
	// Opening screen
	var txtboxw = width - 100;
	fill("#FF0000");
	textSize(20); // THROUGH THE MIRROR textsize
	text("THROUGH THE MIRROR by IRIS ERYILMAZ", width / 2 - txtboxw / 2, height / 1 - 120, txtboxw);

	fill(255);
	textSize(32); 
	text("WELCOME TO THE EXPERIENCE", width / 2 - txtboxw / 2, height / 2 - 120, txtboxw);
	text("Get ready to meet someone. This is your first impression.", width / 2 - txtboxw / 2, height / 2 - 80, txtboxw);
	text("You will answer some questions to get to know him/her.", width / 2 - txtboxw / 2, height / 2 - 40, txtboxw);
	text("Press 'YES' to start the experience.", width / 2 - txtboxw / 2, height / 2, txtboxw);
	yesButton.show();
	noButton.hide(); // Hide "NO" button during opening
}
else if (stage === 1) {
	// Question sequence
	yesButton.position(width / 2 - 120, height / 2 + 50);
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
	if (dist(mouseX, mouseY, noButtonX + 50, noButtonY + 25) < 120) {
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

		if (cameraSound) {
			soundMysterious.stop();

			if (cameraSound.isPlaying() == false) {
				cameraSound.play();
			} 
		}
		w = window.innerWidth;
		h = (w * 9) / 16;

		cam = createCapture(VIDEO).size(w, h).position(0, 0);
		cam.hide();
		initTime = millis();
 
	} else {
		curCamAlpha = curCamAlpha + 0.2;
		if (curCamAlpha >= 255) {
			curCamAlpha = 255;
			if (millis() - initTime > tickTime * 1000) {
				restartButton.show();
			}
		}
	}

	tint(255, curCamAlpha);
	image(cam, 0, 0);

	fill(255);
	textSize (35);
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
}
}

function restart() {
stage = 0;
currentQuestionIndex = 0;
noButtonX = width / 2 + 20;
noButtonY = height / 2 + 50;
restartButton.hide();
showCamera = false;
curCamAlpha = 0;
initTime = millis();
yesButton.position(width / 2 - 120, height / 2 + 50);
yesButton.show();

// check the cam
if (cam) {
	cam.stop();
	cam.remove();
	cam = null; // cam reference 0

}
}
