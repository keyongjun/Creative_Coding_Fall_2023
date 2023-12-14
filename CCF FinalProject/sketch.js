let gamestop = false;

//initial screen
let lapIn = 0;
let x = -160;
let n = 0;
let p = [];
let arrowArr = [];
let state = 0;
let i = 0;
let dragging = false;
let nowStage = 0;

let menu_sound = false; //menu sound

//stage screen
let overBox = []; //variables that indicates if the mouse is on the button
let game = false; //variable that indicates game is played
let stage = [];
let b_size = 100; //buttonSize

//stage Box
let cB = [];
let clearS = false;

//1st stage
let textArr = [];
let textIndex = 0;
let textShow = 0;
let ellipseX = 800/2, ellipseY = 800/2;
let scene = 0;
let ellcoll = false;
let eyemove = true;

//red light green light
let played_moo1 = false;
let played_moo2 = false;
let played_moo3 = false;
let bP2;

//dodge game
let aP;
let aR = [];

//maze game
let cols, rows;
let m_s = 50;
let grid = [];
let gameEnd = false;

let current;
let player;
let next_p;
let stack = [];

let m_startgame = false;

let goMove = false;
let ones = true;

//shooting game
let bullets = [];
let enemies = [];
let score = 0;
let sP;
let highscore = 0;



function preload(){
  soundFormats('mp3');
  //reset
  s_reset = loadSound('audios/reset.mp3');
  //menu select
  s_menusel = loadSound('audios/menu_sel.mp3');
  s_start = loadSound('audios/start.mp3');
  s_startfast = loadSound('audios/start_fast.mp3');
  //laptop image - laptop is opened
  lt1= loadImage('images/laptop1.jpg');
  lt2= loadImage('images/laptop2.jpg');
  lt3= loadImage('images/laptop3.jpg');
  lt4= loadImage('images/laptop4.jpg');
  //green light, red light
  moo1 = loadImage('images/FirstMoo.png');
  moo2 = loadImage('images/SecondMoo.png');
  moo3 = loadImage('images/ThirdMoo.png');
  man001 = loadImage('images/001.png');
  s_moo1 = loadSound('audios/moo1.mp3');
  s_moo2 = loadSound('audios/moo2.mp3');
  s_moo3 = loadSound('audios/moo3.mp3');
  s_moo1.playMode('restart');
  s_moo2.playMode('restart');
  s_moo3.playMode('restart');
  //stageBox
  s_clear = loadSound("audios/clear.mp3");
  i_reA = loadImage("images/reArrow.png");
  i_stage = loadImage("images/stage.png");
  i_neB = loadImage("images/nextButton.png");
  //1st stage
  s_type = loadSound('audios/typing.mp3');
  s_pop = loadSound('audios/textpop.mp3');
  s_punch = loadSound('audios/punch.mp3');
  i_lightoff = loadSound('audios/lightoff.mp3');
  i_hit = loadImage('images/hit.png');
  //maze game
  s_mazemove = loadSound('audios/maze_move.mp3');
  //shooting game
  s_shoot = loadSound('audios/shoot.mp3');
  //final
  i_house = loadImage('images/house.png');
  i_end1 = loadImage('images/end1.png');
  i_end2 = loadImage('images/end2.png');
  i_end3 = loadImage('images/end3.png');
  i_credit = loadImage('images/credit.png');
}

function setup() {
  createCanvas(800, 800);
  //creates arrow arrays
  arrowArr[0] = new Arrow(200, 200); //x coordinate, y-coordinate
  arrowArr[1] = new Arrow(50, 50);
  arrowArr[2] = new Arrow(702, 62);
  arrowArr[3] = new Arrow(100, 500);
  arrowArr[4] = new Arrow(700, 650);
  arrowArr[5] = new Arrow(600, 300);
  arrowArr[6] = new Arrow(430, 100);
  arrowArr[7] = new Arrow(300, 700);
  //create button arrays and inserts them into the stage
  stage.push(new stage_c(1,150,300,1));  // stage, x-coordinate,y-coordinate,active status(1=active)
  stage.push(new stage_c(2,300,300,0));
  stage.push(new stage_c(3,450,300,0));
  stage.push(new stage_c(4,300,500,0));
  stage.push(new stage_c(5,450,500,0));
  stage.push(new stage_c(6,600,500,0));
  for(let i=0; i<stage.length;i++){
    overBox.push(false); //created when the mouse is not within the range
  }
  //stageBox
  cB[0] = new clearBox(210, 405, 1);
  cB[1] = new clearBox(360, 405, 2);
  cB[2] = new clearBox(510, 405, 3);
 
  //1st stage
  bP = new boxPlayer(width/2-25, height-75);
  textArr[0] = "ellipse(width/2,height/2,50,50);";
  textArr[1] = "keyIsPressed";
  textArr[2] = "class avoidRect {}";
  textArr[3] = "grid[0]";
  textArr[4] = "dist(e.x, e.y, b.x, b.y);";
  textArr[5] = "image(i_house,400,335);";

  //red light, green light
  nowStage = 1;
  bP2 = new boxPlayer(770,random(0,height-50));
  bP2.eye = 15;
  reset();
  nowStage = 0;

  //dodge game
  bP3 = new boxPlayer(width/2-25,height-75);
  bP3.eye = 15;
  aP = new avoidPlayer(width/2, height-30);
  for(let i = 0; i < 7; i++) {
    aR[i] = new avoidRect(0,(i+1)*100,1,0);
    aR[i+7] = new avoidRect(width,(i+1)*100+50,-1,0);
  }
  
  //maze game
  cols = floor(width / m_s);
  rows = floor(height / m_s);
  for (let j = 0; j <rows; j++){
    for(let i = 0 ; i < cols; i++){
      let cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  
  current = grid[0];
  player = grid[0];
  
  //shooting game
  for (let p = 0; p < 100; p++) {
    let enemy = {
      x: random(0, width),
      y: random(-850, 0),
    };
    enemies.push(enemy);
  }
  sP = new shootP();
  
  //final
  bP4 = new boxPlayer(-50, height-75);
  bP4.eye = 15;
}

function draw() {
  //open the laptop on the first start screen
  background(255);
  display_state();
  if (state < 2) {
    for(let i=0; i<8; i++) {
    arrowArr[i].display();
    }
  }
}

function text_display() {
  let t = createP(p[i]);
  t.style('font-weight', '700');
  t.style('font-size', '30px');
  t.style('color', 'white');
  t.position(n+214, 258);
  if (lapIn%30==0 && i<7) {
    i++;
    n += 30;
  }
}

class stage_c { 
  constructor(n,x,y,a) {
    this.n = n; //stage level
    this.x = x; //stage button x-loc
    this.y = y; //stage button y-loc
    this.a = a; //stage activation (if 1=activated)
    this.sound = false;
  }
  
  b_draw() { //draws button
    textAlign(CENTER);
    textSize(40);
    if(this.a == 1) { //when on activation
      stroke(0);
      fill(255);
      push();
      mouseLocation(this.x, this.y,this.n); //changes when the mouse in on the box
      square(this.x, this.y, b_size); //draws square
      pop();
      fill(0);//letter color - black
      text(this.n,this.x+b_size/2, this.y+b_size/2+14); //draws number
    } else { //when on inactivation
      stroke(0,0,0,25);// grey
      fill(0,0,0,25);
      square(this.x, this.y, b_size); //draws button
      text(this.n,this.x+b_size/2, this.y+b_size/2+14); //draws number
    }
    this.t_draw(); //draws triangle
  }
  
  t_draw() { //draws triangle 
    let t_size = 14; //size of the triangle
    let h = (t_size*2)*sqrt(3)/2; //calculate the height of a triangle for an equilateral triangle
    let a, b;
    //Because I need to enable the triangle of the previous stage, 
    // save the coordinates considering the coordinates of the previous button in a,b.
    if(this.n > 1 && this.n < 7){
      a = stage[this.n-2].x+b_size+13;
      b = stage[this.n-2].y+b_size/2;
      triangle(a, b-t_size, a, b+t_size, a+h, b); // Draw progress marks (triangles)
    }
  }
}

//change the shape of the mouse on the button & notify that it is on top with overBox
function mouseLocation(bx, by, n){
  if (//when the mouse is within the range
    mouseX > bx &&
    mouseX < bx + b_size &&
    mouseY > by &&
    mouseY < by + b_size) {
    overBox[n] = true; //when the mouse is on the button
    stroke(0,255,0); //label is green-colored.
    push();
    fill(0);
    stroke(0);
    strokeWeight(1);
    textSize(25);
    textAlign(CENTER);
    let b_text;
    if (n > 0 & n < 7) {
      if (n == 1) {
        b_text = "start";
      } else if (n == 2) {
        b_text = "Red light, green light";
      } else if (n == 3) {
        b_text = "Dodge game";
      } else if (n == 4) {
        b_text = "Maze game";
      } else if (n == 5) {
        b_text = "Shooting game";
      } else if (n == 6) {
        b_text = "The end";
      }
      text(b_text, (bx*2+b_size)/2, by+b_size+30);
    }
    if (stage[n-1].sound == false) {
      s_menusel.play();
      stage[n-1].sound = true;
    }
    if (n == 5) {
      stroke('rgb(6,177,27)');
      fill('rgb(6,177,27)');
      textSize(20);
      text("Highest score: "+ highscore,  (bx*2+b_size)/2, by+b_size+60);
    }
    pop();
  } else {
    if (stage[n-1].sound == true) {
      stage[n-1].sound = false;
    }
    overBox[n] = false; //when the mouse is not on the button
  }
}

function mousePressed() {
  if (state == 1) {
    dragging = true;
  } else if (state == 2) {  
    if(game) { //when playing the game 
        
      //game = false; //ends the game
    } else { //when game is not played
      for(i=0; i<=stage.length; i++) {
        if (overBox[i]) { //when the mouse is on the button
          nowStage = i-1;
          s_startfast.play();
          gamef(); // play the game
        } 
      }
    }
  }
}

function mouseReleased() {
  if (state == 1 && lapIn > 240 && mouseX > 300 && mouseX < 357 && mouseY > 353 && mouseY < 407) {
    dragging = false;
    s_start.play();
    removeElements();
    state = 2;
  }
}

function gamef(){//play the game
  game = true; //changes to the game execution status
}

function stageclear(i){ // runs when you clear your stage
  stage[i].a = 1; //stage 
}

function keyPressed() {
  //1st stage
  if (game == true) {
    if (nowStage == 0 && keyIsDown(32) && textShow != 7 && textShow < 11 || keyIsDown(32) && textShow > 11 && textShow != 18 && textShow != 20 && textShow != 21 && textShow != 25 && textShow != 29 && textShow != 31 && nowStage == 0) {
    s_pop.play();
    textShow++;
    if (textShow == 18) {
      bP.x = width/2-25;
      bP.y = height-75;
    }
  } else if (nowStage == 1 && keyIsDown(32) && textShow < 3) {
    s_pop.play();
    textShow++;
  } else if (nowStage == 2 && keyIsDown(32) && textShow != 2 && textShow != 4 && textShow < 6) {
    s_pop.play();
    textShow++;
  } else if (nowStage == 3 && keyIsDown(32) && textShow == 1) {
    s_pop.play();
    textShow++;
  } else if (nowStage == 4 && keyIsDown(32) && textShow >= 1 && textShow <= 2) {
    s_pop.play();
    textShow++;
  } else if (nowStage == 5 && keyIsDown(32) && textShow >= 1 && textShow != 4 && textShow != 11 && textShow != 13 && textShow != 19) {
    s_pop.play();
    textShow++;
  }
  }
  //shooting game
  if (keyCode == 32 && nowStage == 4 && textShow == 4) {
    let bullet = {
      x: sP.x,
      y: height - 50,
    };
    bullets.push(bullet);
    s_shoot.play();
  }  
}