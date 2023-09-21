let x, y
let xDir, yDir;
let size;
let squash, stretch; // squash and stretch variables

function setup() {
  createCanvas(windowWidth, windowHeight);

  // directions random
  xDir = random(-5, 5);
  yDir = random(-5, 5);

  // random size
  size = random(50, 100);

  // starting point randomly given within a border
  x = random(size, width - size);
  y = random(size, height - size);
  
  // initial values for squash and stretch
  squash = 100;
  stretch = 100;

  noStroke();
  fill(160, 20, 220);
}

function draw() {
  background(255, 50);

  // if the ball touches the left or right side, reverse direction
  if (x >= width - size / 2 || x <= size / 2) {
    xDir = xDir * -1; // reverse direction
    squash = 1.3; // squash
    stretch = 0.7; // stretch
  }

  // if the ball touches the top or bottom, reverse direction
  if (y >= height - size / 2 || y <= size / 2) {
    yDir = yDir * -1; // reverse direction
    squash = 0.7; // squash
    stretch = 1.3; // stretch
  }

  //resetting squash and stretch over time (Follow Through)
  squash = squash + (1 - squash) * 0.1;
  stretch = stretch + (1 - stretch) * 0.1;

  // the position of the ball for the next frame updates
  x = x + xDir;
  y = y + yDir;

  //the squashed and stretched ball 
  ellipse(x, y, size * squash, size * stretch);
}
