/***********************************************************************************
	Timer_Clickable
  	by Mary

	Overview:
	A time bomb with clickable button game. The timer of bomb will countdown and boom.

------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

	 <script src="p5.cliackable.js"></script>
 	 <script src="p5.timer.js"></script>
***********************************************************************************/

//global varible
var scissor = [];
var simpleTimer;
var waitForClick = true;
var buttonYellow;
var buttonGreen;
var buttonRed;
var buttonInvisible = false;
var buttonXY = 40; 
var drawFunction;

function preload(){
	closedscissor = loadImage('asserts/scissor1.png');
	openscissor = loadImage('asserts/scissor2.png');
	bomb = loadImage('asserts/bomb.png');
	Yellowimg = loadImage('asserts/yellow.png');
	Greenimg = loadImage('asserts/green.png');
	Redimg = loadImage('asserts/red.png');
	boom = loadImage('asserts/boom.png');
}

// Setup code goes here
function setup() {
    createCanvas(600, 600);

    textSize(30);
  	textAlign(CENTER);

    simpleTimer = new Timer(10000);

    //default page as bomb
    drawFunction = drawBomb;

    makeBombButton();
}


// Draw code goes here
function draw() {
	background(255);
	drawFunction();
	updateTimer();

	//show button
    if (buttonInvisible === false){
    	buttonYellow.draw();
    	buttonGreen.draw();
    	buttonRed.draw();
    }

    //scissor mouse
    noCursor();
    image(openscissor, mouseX, mouseY, 60, 60 ); 
}
    

//no work as I though
function mousePressed(){
	noCursor();
    image(closedscissor, mouseX, mouseY, 60, 60 ); 
}

function makeBombButton(){
    //buttonYellow
    buttonYellow = new Clickable();
    buttonGreen = new Clickable();
    buttonRed = new Clickable();

    //set button image
    buttonYellow.image = Yellowimg ;
    buttonGreen.image = Greenimg ;
    buttonRed.image = Redimg ;

    //location of the button
  	buttonYellow.locate(227, 270);
  	buttonGreen.locate(272, 302);
  	buttonRed.locate(360, 317);

    //no text on button
    buttonYellow.text = "";
    buttonGreen.text = "";
    buttonRed.text = "";

    //no stroke
    buttonYellow.strokeWeight = 0;
    buttonGreen.strokeWeight = 0;
    buttonRed.strokeWeight = 0;

    //button transpancy
    buttonYellow.color = "#00000000";
    buttonGreen.color = "#00000000";
    buttonRed.color = "#00000000";

    //button size
    buttonYellow.width = buttonXY;
    buttonYellow.height = buttonXY;
    buttonGreen.width = buttonXY;
    buttonGreen.height = buttonXY;
    buttonRed.width = buttonXY;
    buttonRed.height = buttonXY;

    //button are pressed
    buttonYellow.onPress = buttonYellowPressed;
    buttonGreen.onPress = buttonGreenPressed;
    buttonRed.onPress = buttonRedPressed;
}

//to boom page
buttonYellowPressed = function(){
    drawFunction = drawBoom;
    buttonInvisible = true; 
}

//to boom page
buttonGreenPressed = function(){
    drawFunction = drawBoom;
    buttonInvisible = true;    
}

//to boom page
buttonRedPressed = function(){
    drawFunction = drawBoom;
    buttonInvisible = true;   
}

//time rundown 
function updateTimer() {
    if( simpleTimer.expired() ) {
    	drawFunction = drawBoom;
    	buttonInvisible = true;
    }
}


//bomb page
drawBomb = function(){
	image(bomb, 0, 200);

    fill(255, 0, 0);
    text( "chosse one wire to cut", width/2, 100); 

    //time countdown
	fill(255, 0, 0);
    text( Math.round(simpleTimer.getRemainingTime()/1000), width/2, 150);

}

//boom page
drawBoom = function(){
	image(boom, 0, 0);
	text('HAHA, All the wire are false choices', width/2, 130);
}