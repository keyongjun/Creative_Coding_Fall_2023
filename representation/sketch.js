let video;
let ball;
let ballSpeed = 5;
let ballSize = 20;
let colorBar;
let currentDirection;
let trail = []; // array to store the trail positions
let maxTrailLength = Infinity; // maximum length of the trail
let backgroundColor;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  ball = createVector(width / 2, height / 2);

  // initialize the color bar and background color
  colorBar = createColorBar();
  backgroundColor = color(255); // default white background
}

function draw() {
  // display the video with an overlay of the selected background color
  image(video, 0, 0, width, height);
  fill(backgroundColor);
  rect(0, 0, width, height);

  // update and draw the ball's trail
  updateTrail();
  drawTrail();

  // move the ball based on the current direction
  updateBallPosition();

  // draw the ball
  fill(0);
  ellipse(ball.x, ball.y, ballSize, ballSize);

  // draw the color bar
  drawColorBar(colorBar);
}

function updateBallPosition() {
  if (currentDirection == 'left' && ball.x > 0 + ballSize / 2) {
    ball.x -= ballSpeed;
  } else if (currentDirection == 'right' && ball.x < width - ballSize / 2) {
    ball.x += ballSpeed;
  } else if (currentDirection == 'up' && ball.y > 0 + ballSize / 2) {
    ball.y -= ballSpeed;
  } else if (currentDirection == 'down' && ball.y < height - ballSize / 2) {
    ball.y += ballSpeed;
  }
}

function updateTrail() {
  // add the current position to the trail
  trail.push({ x: ball.x, y: ball.y });

  // keep the trail at the maximum length
  if (trail.length > maxTrailLength) {
    trail.shift();
  }
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    // calculate the opacity based on the position in the trail
    let opacity = map(i, 0, trail.length, 50, 255);
    fill(0, opacity);

    // draw each position in the trail
    let pos = trail[i];
    ellipse(pos.x, pos.y, ballSize, ballSize);
  }
}

function createColorBar() {
  let colors = [color('red'), color('green'), color('blue'), color('yellow')];
  let bar = { x: 10, y: height - 50, w: width - 20, h: 40, colors: colors };
  return bar;
}

function drawColorBar(bar) {
  for (let i = 0; i < bar.colors.length; i++) {
    let x = bar.x + (i * bar.w) / bar.colors.length;
    let w = bar.w / bar.colors.length;
    fill(bar.colors[i]);
    rect(x, bar.y, w, bar.h);
  }
}

function mousePressed() {
  // check if the mouse is inside the color bar
  if (mouseY >= colorBar.y && mouseY <= colorBar.y + colorBar.h) {
    let index = Math.floor((mouseX - colorBar.x) / (colorBar.w / colorBar.colors.length));
    let selectedColor = colorBar.colors[index];

    // update the direction and background color based on the selected color
    if (selectedColor === colorBar.colors[0]) { // red
      currentDirection = 'left';
      backgroundColor = color(255, 0, 0, 100); // semi-transparent red
    } else if (selectedColor === colorBar.colors[1]) { // green
      currentDirection = 'up';
      backgroundColor = color(0, 255, 0, 100); // semi-transparent green
    } else if (selectedColor === colorBar.colors[2]) { // blue
      currentDirection = 'down';
      backgroundColor = color(0, 0, 255, 100); // semi-transparent blue
    } else if (selectedColor === colorBar.colors[3]) { // yellow
      currentDirection = 'right';
      backgroundColor = color(255, 255, 0, 100); // semi-transparent yellow
    }
  }
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    resetGame();
  }
}

function resetGame() {
  // reset ball position to the center
  ball.set(width / 2, height / 2);

  // clear the trail
  trail = [];

  // reset the background color to default
  backgroundColor = color(255);

  // reset the current direction
  currentDirection = '';
}
