class Ball {
  constructor() {
    this.size = random(50, 100);
    this.x = random(this.size, width - this.size);
    this.y = random(this.size, height - this.size);
    this.xDir = random(-5, 5);
    this.yDir = random(-5, 5);
    this.squash = 1;
    this.stretch = 1;
  }

  move() {
    this.x += this.xDir;
    this.y += this.yDir;

    this.squash += (1 - this.squash) * 0.1;
    this.stretch += (1 - this.stretch) * 0.1;
  }

  checkEdges() {
    if (this.x >= width - this.size / 2 || this.x <= this.size / 2) {
      this.xDir *= -1;
      this.squash = 1.3;
      this.stretch = 0.7;
    }

    if (this.y >= height - this.size / 2 || this.y <= this.size / 2) {
      this.yDir *= -1;
      this.squash = 0.7;
      this.stretch = 1.3;
    }
  }

  display() {
    ellipse(this.x, this.y, this.size * this.squash, this.size * this.stretch);
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
