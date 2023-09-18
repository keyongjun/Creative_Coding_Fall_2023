function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // Top background
  fill("#78929F");
  rect(0, 0, 400, 150);
  
  // Bottom background
  fill("#7E653B");
  rect(0, 150, 400, 250);
  
  // Horizon line
  stroke("#200B09");
  strokeWeight(1);
  line(0, 150, 400, 150);
  
  // Pear
  fill("#5A6C52");
  ellipse(105, 175, 80, 120);
  
  // Pear stem
  fill("#07080C");
  ellipse(125, 160, 10, 20);

  // Plate
  fill("#D2CCC5");
  ellipse(230, 300, 240, 100);
  
  // Left apple
  fill("#CBAC3E");
  ellipse(200, 250, 100, 100);
  
  // Right apple
  fill("#A03A19");
  ellipse(300, 250, 100, 100);
  
  // Top apple
  fill("#CB9838");
  ellipse(260, 140, 125, 125);
  
  // Top apple stem
  fill("#07080C");
  ellipse(283, 125, 20, 20);
}
