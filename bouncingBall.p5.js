let x, y; // ball x and y position
let xDir, yDir; // ball x and y direction
let size; // ball size
let ballColor; // ball color

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  xDir = 5;
  yDir = 3;
  size = 50;
  ballColor = color(128, 0, 128); // Initial purple color
}

function draw() {
  background(220);

  // Draw ball
  fill(ballColor);
  noStroke();
  ellipse(x, y, size);

  // If the ball touches the left or right wall
  if (x >= width - size / 2 || x <= size / 2) {
    xDir = xDir * -1;
    changeColor(); // Change ball color
  }

  // If the ball touches the ceiling or floor
  if (y >= height - size / 2 || y <= size / 2) {
    yDir = yDir * -1;
    changeColor(); // Change ball color
  }

  // Update the position of the ball for the next loop
  x = x + xDir;
  y = y + yDir;
}

// Function to change the ball color
function changeColor() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  ballColor = color(r, g, b);
}


