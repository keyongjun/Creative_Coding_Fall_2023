// a list to store all the memory bubbles
let bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // set the background color to black for each frame
  background(0);

  // every 60 frames (which is roughly every second), create a new memory bubble
  if (frameCount % 60 == 0) {
    let b = new Bubble(random(20, 40)); // random size for the memory bubble
    bubbles.push(b);  // add the new bubble to our list
  }

  // for each bubble in our list
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();  // update the bubble's position
    bubbles[i].show();    // draw the bubble

    // remove the bubble if it's reached the top of the canvas or if it decides to pop
    if (bubbles[i].reachedTop() || bubbles[i].wantToPop()) {
      bubbles.splice(i, 1);
    }
  }
}

class Bubble {
  constructor(size) {
    this.x = random(width);  // random horizontal starting position
    this.y = height;         // start at the bottom of the canvas
    this.size = size;        // size of the bubble, passed in when the bubble is created
    this.speed = random(1, 3);  // random upward speed
    this.life = random(200, 500);  // a random lifespan for the bubble
    this.color = this.getColorForTime();  // set color based on the current time
  }

  // determine the bubble color based on the current hour
  getColorForTime() {
    let now = new Date();
    if (now.getHours() < 12) {
      return color(255, 204, random(50, 100));  // orange/yellow -morning colors before 12 p.m.
    } else if (now.getHours() < 18) {
      return color(random(50, 150), 204, 255);  // light blue - afternoon colors between 12p.m. and 6p.m.
    } else {
      return color(50, 50, random(150, 200));   // dark blue - evening colors after 6p.m.
    }
  }

  // move the bubble upwards
  update() {
    this.y -= this.speed;
    this.life--;
  }

  // check if the bubble has reached the top of the canvas
  reachedTop() {
    return this.y < 0;
  }

  // determine if the bubble wants to pop (based on its remaining life)
  wantToPop() {
    return this.life <= 0;
  }

  // draw the bubble on the canvas
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
