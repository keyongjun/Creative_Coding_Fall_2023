class Ball {
  constructor() {
    this.size = random(50, 100);
    this.position = createVector(random(this.size, width - this.size), random(this.size, height - this.size));
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.squash = 1;
    this.stretch = 1;
  }

  move() {
    this.position.add(this.velocity);

    this.squash += (1 - this.squash) * 0.1;
    this.stretch += (1 - this.stretch) * 0.1;
  }

  checkEdges() {
    if (this.position.x >= width - this.size / 2 || this.position.x <= this.size / 2) {
      this.velocity.x *= -1; // reverse the velocity's x component
      this.squash = 1.3;
      this.stretch = 0.7;
    }

    if (this.position.y >= height - this.size / 2 || this.position.y <= this.size / 2) {
      this.velocity.y *= -1; // reverse the velocity's y component
      this.squash = 0.7;
      this.stretch = 1.3;
    }
  }

  display() {
    ellipse(this.position.x, this.position.y, this.size * this.squash, this.size * this.stretch);
  }
}

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  noStroke();
  fill(160, 20, 220);
}

function draw() {
  background(255, 50);

  ball.move();
  ball.checkEdges();
  ball.display();
}