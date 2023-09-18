let noseWidth = 40;
let noseHeight = 60;

function setup() {
  createCanvas(400, 400);
  background(100, 100, 100);
}

function draw() {
  stroke(0);
  //face 
  fill(255, 221, 169);
  ellipse(200, 200, 175, 225);
  
  //eyes and pupils
  fill(255);
  ellipse(160, 150, 25, 15);  
  ellipse(240, 150, 25, 15);  
  fill(139, 69, 19);
  ellipse(160, 150, 10, 10);
  ellipse(240, 150, 10, 10); 

  // Draw the bridge of the nose
  line(width / 2, height / 2 - noseHeight / 2, width / 2, height / 2 + noseHeight / 2);
  // Draw nostrils
  fill(0);
  ellipse(width / 2 - noseWidth / 4, height / 2 + noseHeight / 2, 5, 5);
  ellipse(width / 2 + noseWidth / 4, height / 2 + noseHeight / 2, 5, 5);
  //mouth
  fill(255,215,215);
  arc(200, 230, 50, 40, 0, PI);
  line(250, 230, 150, 230);
  
  //shirt
  fill(255, 105, 180); // Pink color
  rect(120, 282, 160, 160); // Draw square

  //hair
  stroke(110, 70, 45);
  fill(0, 0, 0);
  ellipse(200, 110, 120, 60);

}

