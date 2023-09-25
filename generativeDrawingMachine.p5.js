// The program generates a drawing machine that creates random circles.
// The drawing machine stops drawing when a user clicks the mouse.
// The drawing machine resets everything and starts drawing again when the user presses the 'r' key.

// variables for circle properties
var circleX;
var circleY;
var circleSize;
var circleColor;

// variable to check if the program should draw or not
var shouldDraw = true;

function setup() {
  createCanvas(600, 400);
  background(220); // setting a gray background
}

function draw() {
  // if shouldDraw is true, then make circles
  if (shouldDraw == true) {
    circleX = random(width); // random X position
    circleY = random(height); // random Y position
    circleSize = random(10, 50); // random size
    
    // random color for the circle
    var redColor = random(255);
    var greenColor = random(255);
    var blueColor = random(255);
    circleColor = color(redColor, greenColor, blueColor);
    
    ellipse(circleX, circleY, circleSize); // draw the circle
    fill(circleColor); // fill the circle with the random color
  }
}

function mouseClicked() {
  // change the value of shouldDraw when the mouse is clicked
  if (shouldDraw == true) {
    shouldDraw = false;
  } else {
    shouldDraw = true;
  }
}

function keyPressed() {
  // reset everything when 'r' key is pressed
  if (key == 'R' || key == 'r') {
    background(220); // clear the canvas
    shouldDraw = true; // start drawing again
  }
}
