let r;
let b;
let g;
// variables for circle properties
var circleX;
var circleY;
var circleSize;
var circleColor;

// sliders for RGB values
var rSlide, gSlide, bSlide;

// variable to check if the program should draw or not
var shouldDraw = true;

function setup() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  
  // create sliders for RGB
  rSlide = createSlider(0, 255, r);  // set initial value of the slider to 'r'
  rSlide.position(30, 20);
  gSlide = createSlider(0, 255, g);  // set initial value of the slider to 'g'
  gSlide.position(30, 40);
  bSlide = createSlider(0, 255, b);  // set initial value of the slider to 'b'
  bSlide.position(30, 60);
  
  createCanvas(600, 400);
  background(220); // setting a gray background
}

function draw() {
  // if shouldDraw is true, then make circles
  if (shouldDraw) {
    circleX = random(width); // random X position
    circleY = random(height); // random Y position
    circleSize = random(10, 50); // random size
    
    // random color for the circle
    if (!circleColor) { // If the color has not been set by user
      var redColor = random(255);
      var greenColor = random(255);
      var blueColor = random(255);
      circleColor = color(redColor, greenColor, blueColor);
    }
    
    fill(circleColor); // fill the circle with the chosen or random color
    ellipse(circleX, circleY, circleSize); // draw the circle
  }
}

function mouseClicked() {
  // change the value of shouldDraw when the mouse is clicked
  shouldDraw = !shouldDraw;
}

function keyPressed() {
  // reset everything when 'r' key is pressed
  if (key == 'R' || key == 'r') {
    background(220); // clear the canvas
    shouldDraw = true; // start drawing again
    circleColor = null; // reset circle color so new circles get random colors
  }
  
  // change the color when 'c' key is pressed
  if (key == 'C' || key == 'c') {
    circleColor = color(rSlide.value(), gSlide.value(), bSlide.value());
  }
}
