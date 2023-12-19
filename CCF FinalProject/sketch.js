let stop_game = false;

//initial screen
let laptop_in = 0;
let x = -160;
let n = 0;
let p = [];
let arrow_array = [];
let state = 0;
let i = 0;
let drag = false;
let current_stage = 0;

let sound_menu = false;

//stage screen
let overBox = []; //variable that indicates if the mouse is on the button
let game = false; //variable that indicates game is played
let stage = [];
let button_size = 100; 

//stage Box
let clear_box = [];
let clear_stage = false;

//1st stage
let text_array = [];
let text_index = 0;
let text_show = 0;
let ellipse_x = 800/2, ellipse_y = 800/2;
let scene = 0;
let ellipse_collide = false;
let eye_movement = true;

//red light green light
let moo1_played = false;
let moo2_played = false;
let moo3_played = false;
let play2;

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
let next_player;
let stack = [];

let maze_game_start = false;

let move = false;
let ones = true;

//shooting game
let bullets = [];
let enemies = [];
let score = 0;
let score_point;
let highest_score = 0;



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
  arrow_array[0] = new Arrow(200, 200); //x coordinate, y-coordinate
  arrow_array[1] = new Arrow(50, 50);
  arrow_array[2] = new Arrow(702, 62);
  arrow_array[3] = new Arrow(100, 500);
  arrow_array[4] = new Arrow(700, 650);
  arrow_array[5] = new Arrow(600, 300);
  arrow_array[6] = new Arrow(430, 100);
  arrow_array[7] = new Arrow(300, 700);
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
  clear_box[0] = new clearBox(210, 405, 1);
  clear_box[1] = new clearBox(360, 405, 2);
  clear_box[2] = new clearBox(510, 405, 3);
 
  //1st stage
  bP = new boxPlayer(width/2-25, height-75);
  text_array[0] = "ellipse(width/2,height/2,50,50);";
  text_array[1] = "keyIsPressed";
  text_array[2] = "class avoidRect {}";
  text_array[3] = "grid[0]";
  text_array[4] = "dist(e.x, e.y, b.x, b.y);";
  text_array[5] = "image(i_house,400,335);";

  //red light, green light
  current_stage = 1;
  play2 = new boxPlayer(770,random(0,height-50));
  play2.eye = 15;
  reset();
  current_stage = 0;

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
  score_point = new shootP();
  
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
    arrow_array[i].display();
    }
  }
}

function text_display() {
  let t = createP(p[i]);
  t.style('font-weight', '700');
  t.style('font-size', '30px');
  t.style('color', 'white');
  t.position(n+214, 258);
  if (laptop_in%30==0 && i<7) {
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
      square(this.x, this.y, button_size); //draws square
      pop();
      fill(0);//letter color - black
      text(this.n,this.x+button_size/2, this.y+button_size/2+14); //draws number
    } else { //when on inactivation
      stroke(0,0,0,25);// grey
      fill(0,0,0,25);
      square(this.x, this.y, button_size); //draws button
      text(this.n,this.x+button_size/2, this.y+button_size/2+14); //draws number
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
      a = stage[this.n-2].x+button_size+13;
      b = stage[this.n-2].y+button_size/2;
      triangle(a, b-t_size, a, b+t_size, a+h, b); // Draw progress marks (triangles)
    }
  }
}

//change the shape of the mouse on the button & notify that it is on top with overBox
function mouseLocation(bx, by, n){
  if (//when the mouse is within the range
    mouseX > bx &&
    mouseX < bx + button_size &&
    mouseY > by &&
    mouseY < by + button_size) {
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
      text(b_text, (bx*2+button_size)/2, by+button_size+30);
    }
    if (stage[n-1].sound == false) {
      s_menusel.play();
      stage[n-1].sound = true;
    }
    if (n == 5) {
      stroke('rgb(6,177,27)');
      fill('rgb(6,177,27)');
      textSize(20);
      text("Highest score: "+ highest_score,  (bx*2+button_size)/2, by+button_size+60);
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
    drag = true;
  } else if (state == 2) {  
    if(game) { //when playing the game 
        
      //game = false; //ends the game
    } else { //when game is not played
      for(i=0; i<=stage.length; i++) {
        if (overBox[i]) { //when the mouse is on the button
          current_stage = i-1;
          s_startfast.play();
          gamef(); // play the game
        } 
      }
    }
  }
}

function mouseReleased() {
  if (state == 1 && laptop_in > 240 && mouseX > 300 && mouseX < 357 && mouseY > 353 && mouseY < 407) {
    drag = false;
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
    if (current_stage == 0 && keyIsDown(32) && text_show != 7 && text_show < 11 || keyIsDown(32) && text_show > 11 && text_show != 18 && text_show != 20 && text_show != 21 && text_show != 25 && text_show != 29 && text_show != 31 && current_stage == 0) {
    s_pop.play();
    text_show++;
    if (text_show == 18) {
      bP.x = width/2-25;
      bP.y = height-75;
    }
  } else if (current_stage == 1 && keyIsDown(32) && text_show < 3) {
    s_pop.play();
    text_show++;
  } else if (current_stage == 2 && keyIsDown(32) && text_show != 2 && text_show != 4 && text_show < 6) {
    s_pop.play();
    text_show++;
  } else if (current_stage == 3 && keyIsDown(32) && text_show == 1) {
    s_pop.play();
    text_show++;
  } else if (current_stage == 4 && keyIsDown(32) && text_show >= 1 && text_show <= 2) {
    s_pop.play();
    text_show++;
  } else if (current_stage == 5 && keyIsDown(32) && text_show >= 1 && text_show != 4 && text_show != 11 && text_show != 13 && text_show != 19) {
    s_pop.play();
    text_show++;
  }
  }
  //shooting game
  if (keyCode == 32 && current_stage == 4 && text_show == 4) {
    let bullet = {
      x: score_point.x,
      y: height - 50,
    };
    bullets.push(bullet);
    s_shoot.play();
  }  
}

/*
initial screen
*/
// define a class named 'Arrow'
class Arrow {
  constructor(x, y) {
    // set the initial x and y positions of the arrow
    this.x = x;
    this.y = y;

    // randomly generate RGB color components for the arrow
    // each component ranges between 100 and 255
    this.cR = random(100,255); // Red component
    this.cG = random(100,255); // Green component
    this.cB = random(100,255); // Blue component
  }
  
  display() {
    // calculate the scale of the arrow based on its distance from the mouse pointer
    // the arrow gets larger as it gets closer to the mouse
    this.sA = dist(this.x, this.y, mouseX, mouseY) / 50 + 2;

    // determine the angle of the arrow pointing towards the mouse cursor
    // this uses the arc tangent of the difference in y and x coordinates
    this.angleA = atan2(mouseY - this.y, mouseX - this.x);

    // save the current drawing state
    push();

    // set the fill color for the arrow using the previously generated RGB values
    fill(this.cR, this.cG, this.cB);

    // move the origin of the canvas to the arrow's position
    translate(this.x, this.y);

    // rotate the canvas to align the arrow with the calculated angle
    rotate(this.angleA);

    // begin drawing a custom shape for the arrow
    beginShape();
    // define vertices for the arrow shape
    vertex(-2 * this.sA, -this.sA);
    vertex(2 * this.sA, -this.sA);
    vertex(2 * this.sA, -2 * this.sA);
    vertex(4 * this.sA, 0);
    vertex(2 * this.sA, 2 * this.sA);
    vertex(2 * this.sA, this.sA);
    vertex(-2 * this.sA, this.sA);
    // close and render the shape
    endShape(CLOSE);

    // restore the original drawing state
    pop();
  }
}
/*
Red Light, Green Light game functions
*/

// function for managing the character's behavior
function man001s(){
  // check if the current time is less than a certain threshold
  if (count < a + b) {
    // move the player character left if certain conditions are met
    if (keyX >= 80 && text_show == 3) {
      keyX = keyX - 1;
    }
  }
  // move another character left if a key is pressed and a condition is met
  if (keyIsPressed == true && text_show == 3) {
    play2.x -= 1;
  }
  // reset the game if a key is pressed and another condition is met
  if (keyIsPressed === true && out == 1) {
    reset();
  } else {
    // display the character.
    image(man001, keyX, yY, 30, 70);
  }
}

// function for the Younghee-doll's behavior
function womoo() {
  // change the doll's image when 'count' reaches a certain value
  if(count >= a) {
    image(moo2, 0, height/2-50, 150, 100);
    // play a sound once when the image changes
    if (moo2_played == false) {
      s_moo2.play();
      moo2_played = true;
    }
    // change the doll's image again after a different time period
    if (count >= b + a) {
      image(moo3, 0, height/2-50, 150, 100);
      // play another sound once when the image changes
      if (moo3_played == false) {
        s_moo3.play();
        moo1_played = false;
        moo3_played = true;
      }
      out = 1; // mark a game state
    }
    // reset variables after a time period
    if (count >= a + b + c) {
      count = 0;
      a = floor(random(50,100));
      b = floor(random(50,100));
      c = floor(random(50,70));
      out = 0;
    }
  } else {
    // display the initial image of the doll and play a sound once
    image(moo1, 0, height/2-50, 150, 100);
    if (moo1_played == false) {
      s_moo1.play();
      moo1_played = true;
      moo2_played = false;
      moo3_played = false;
    }
  }
}

// function for displaying the timer and managing time-related events
function time0() {
  // set up the display for the timer
  push();
  stroke(0);
  strokeWeight(1);
  fill(200);
  rect(height/2-50, 20, 110, 50);
  rect(height/2, 0, 8, 20);
  fill(0);
  rect(height/2-45, 23, 100, 44);
  fill(230);
  rect(height/2-30, 10, 70, 20);
  fill(255,172,183);
  textSize(13);
  textAlign(CENTER);
  stroke(255,172,183);
  text("○△□", width/2+4, 23);
  pop();

  // decrease the timer every second
  if (timer % 60 == 0){
    time = time - 1;
  }

  // reset the game if the timer runs out and a condition is met
  if (time <= 0 && play2.x > 180) {
    reset();
  } else if (play2.x < 180) {
    // stop the game and check for stage completion
    stop_game = true;
    if (stage[current_stage + 1].a == 0) {
      stageclear(current_stage+1);
    }
  } else {
    // display the remaining time
    push();
    noStroke();
    fill(255,0,0);
    textSize(30);
    textAlign(LEFT);
    textStyle(NORMAL);
    if (time >= 10) {
      text("00:" + time, height/2-32, 56);
    } else {
      text("00:0" + time, height/2-32, 56);
    }
    pop();
  }
}

/*
code for creating and managing stage completion interface elements
*/
// function to draw the stage completion box and manage clearBox objects
function drawStageBox() {
  // set up the visual properties for the stage box
  push();
  fill(230);
  textStyle(BOLD);
  rect(150, 250, 500, 300); // draw a rectangle for the stage box
  textAlign(CENTER);
  textSize(40);
  fill(0);
  noStroke();
  // display the stage completion text
  text((current_stage + 1) + " Stage complete!", width / 2, height / 2 - 70);
  pop();

  // iterate through clearBox objects and manage their display and hover behavior
  for (let i = 0; i < 3; i++) {
    clear_box[i].mouseHover();
    clear_box[i].display();
  }
}

// class representing a clickable box used in the stage completion interface
class clearBox {
  constructor(x, y, t) {
    this.x = x; // x-coordinate of the box
    this.y = y; // y-coordinate of the box
    this.scl = 80; // size of the box
    this.type = t; // type of box (determines its function and image)
    this.mH = false; // tracks if the mouse is hovering over the box.
    this.sound = false; // tracks if a sound has been played.
  }
  
  // method to manage mouse hover behavior and box interaction
  mouseHover() {
    // check if the mouse is over the box
    if (mouseX > this.x && mouseX < this.x + this.scl &&
        mouseY > this.y && mouseY < this.y + this.scl) {
      this.mH = true; // indicate that the mouse is hovering
      push();
      noStroke();
      textStyle(BOLD);
      textSize(20);
      fill(0);
      // display text based on the type of the box
      if (this.type == 1) {
        text("Stage", (this.x * 2 + this.scl) / 2, this.y + this.scl + 40);
      } else if (this.type == 2) {
        text("Re-do", (this.x * 2 + this.scl) / 2, this.y + this.scl + 40);
      } else if (this.type == 3 && current_stage != 5) {
        text("Next stage", (this.x * 2 + this.scl) / 2, this.y + this.scl + 40);
      }
      pop();

      // handle box click actions
      if (mouseIsPressed) {
        s_startfast.play(); // play a sound effect
        // perform actions based on the box type
        if (this.type == 1 || this.type == 2) {
          // reset various game settings
          text_index = 0;
          text_show = 0;
          reset();
          stop_game = false;
          clear_stage = false;
        } else if (this.type == 3) {
          if (current_stage != 5) {
            // advance to the next stage and reset settings
            text_index = 0;
            text_show = 0;
            reset();
            current_stage++;
            stop_game = false;
            clear_stage = false;
          }
        }
      }

      // play a menu selection sound if not already played
      if (this.sound == false) {
        s_menusel.play();
        this.sound = true;
      }
    } else {
      // reset hover and sound states if the mouse is not over the box
      this.mH = false;
      this.sound = false;
    }
  }
  
  // method to display the clearBox
  display() {
    push();
    // change the box's visual style when hovered over
    if (this.mH == true) {
      stroke(127);
      tint(255, 127);
    } else {
      stroke(0);
      noTint();
    }
    fill(255);
    strokeWeight(3);
    square(this.x - 10, this.y - 10, 100, 20); // draw the box

    // display an image based on the box's type
    if (this.type == 1) { // stage button
      image(i_stage, this.x, this.y - 2, this.scl, this.scl);
    } else if (this.type == 2) { // re-do button.
      image(i_reA, this.x, this.y, this.scl, this.scl);
    } else if (this.type == 3) { // next stage button.
      image(i_neB, this.x, this.y, this.scl, this.scl);
    }
    pop();
  }
}

/*
Function to control and display different states in the game.
*/

function display_state() {
  // State 0: Initial Menu or Decision Screen
  if (state == 0) {
    // check if mouse is over a specific area to change to state 1.
    if (mouseX > 185 && mouseX < 185 + 434 && mouseY > 99 + 175 && mouseY < 99 + 333 + 175) {
      state = 1;
    } else {
      // display different images based on mouse position.
      if (mouseX > 125 && mouseX < 125 + 434 + 120 && mouseY > 66 + 175 && mouseY < 66 + 333 + 66 + 175) {
        image(lt2, 0, 175, 800, 450);
      } else if (mouseX > 65 && mouseX < 65 + 434 + 240 && mouseY > 33 + 175 && mouseY < 33 + 333 + 132 + 175) {
        image(lt3, 0, 175, 800, 450);
      } else {
        image(lt4, 0, 175, 800, 450);
      }
    }
  }
  
  // state 1: Transition or Loading Screen
  if (state == 1) {
    image(lt1, 0, 175, 800, 450); // display a specific image
    laptop_in += 1; // increment a counter
    p = "Graphics"; // set a string variable (possibly for display)
    text_display(); // call a function to display text

    // after a certain period, display an interactive element
    if (laptop_in > 240) {
      push(); // save current drawing settings
      // define size and position for an interactive element
      let ps = 50;
      let bx = 303;
      let by = 338;
      translate(bx, by + 20);
      angleMode(DEGREES);
      rotate(354);

      // change style based on mouse position and play sound
      if (mouseX > 300 && mouseX < 357 && mouseY > 353 && mouseY < 407) {
        fill(100);
        stroke(50);
        if (!sound_menu) {
          s_menusel.play(); // play a sound once when hovered
          sound_menu = true;
        }
      } else {
        fill(227);
        stroke(255);
        sound_menu = false;
      }
      square(0, 0, ps); // draw a square
      triangle(ps / 3, ps / 3, ps / 3, ps * 2 / 3, ps * 2 / 3, ps / 2); // draw a triangle
      pop(); // restore original drawing settings
    }
  }
  
  // state 2: Game Setup or Selection Screen
  if (state == 2 && !game) {
    push(); // save current drawing settings
    fill(0);
    textSize(60);
    textStyle(BOLD);
    text("Stage", 400, 200); // display the text "Stage"
    pop(); // restore original drawing settings
    strokeWeight(2);
    // loop through an array 'stage' and call a draw method for each element
    for (let i = 0; i < stage.length; i++) {
      stage[i].b_draw();
    }
  }
  
  // check if the current stage is 0 and the game is active
  if (current_stage == 0 && game == true) {
      // check if the game is not in a stopped state
    if (stop_game == false) {
      hellobox();// call the hellobox function 
    } else {    
      // check if a 'clear' state has not been set
      if (clear_stage == false) {
        s_clear.play(); // play a sound designated for clearing
        clear_stage = true; // set the clear state to true
      }
      drawStageBox();// call a function to draw the stage completion box
    }
    // check if the current stage is 1 and the game is active
  } else if (current_stage == 1 && game == true) {
    // set up the background and a dividing line for this stage
    background(212,200,150);
    line(180,0,180,800);
      // if the game is not stopped, continue with game logic
    if (stop_game == false) {
      play2.display();  // display a character (bP2)
      man001s(); // call the man001s function

    // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.

      if (text_show == 0) {
        s_pop.play();
        text_show++;
      } else if (text_show == 1) {
        push();
        fill(0);
        noStroke();
        textStyle(BOLD);
        textSize(20);
        textAlign(RIGHT);
        text("The lights are back on!", play2.x+30, play2.y-25);
        pop();
      } else if (text_show == 2) {
        push();
        fill(0);
        noStroke();
        textStyle(BOLD);
        textSize(20);
        textAlign(RIGHT);
        text("By the way, who is the sir next to us?", play2.x+30, play2.y-25);
        pop();
      } else if (text_show == 3) {
        if (play2.x > 700) {
          push();
          fill(0);
          noStroke();
          textStyle(BOLD);
          textSize(20);
          textAlign(RIGHT);
          text("Let's go!", play2.x+30, play2.y-25);
          pop();
        }
         // additional game logic for this stage.
        womoo(); // call the womoo function
        time0();// call the time0 function 
        count += 1; // increment a count variable
        timer += 1; // increment a timer variable
      }
    } else {
      // stop certain sounds and set up the stage for completion
      s_moo1.stop();
      s_moo2.stop();
      s_moo3.stop();
      if (clear_stage == false) {
        s_clear.play();
        clear_stage = true;
      }
      drawStageBox(); // draw the stage completion box
    }
  } // check if the game is in stage 2 and active.
else if (current_stage == 2 && game == true) {
  // if the game is not in a paused or stopped state.
  if (stop_game == false) {
    // check if textShow is within a certain range to control the game flow.
    if (text_show >= 0 && text_show <= 3) {
      background(100); // set a dark background.
      bP3.display(); // display an object or character (bP3).
      sign(); // call the sign function
      signPlate(); // call the signPlate function

      // display a black rectangle at the bottom of the screen.
      push();
      noStroke();
      fill(0);
      rect(0, height - 25, width, 25);
      pop();

      // display text related to the current game stage, such as instructions or story.
      push();
      noStroke();
      textStyle(BOLD);
      textAlign(CENTER);
      textSize(30);
      fill(150);
      text("[Dodge game]", width / 2, 200); // Title of the current stage or section.
      textSize(20);
      fill(0);
      text("How to create an object named avoidRect?", width / 2, 250); // Instruction or question.
      text("Answer: ", 290, 373); // Prompt for an answer.
      pop();
    }

    /*
    // More code to manage the text display and player interactions.
    // This includes playing sounds, displaying dialogue and instructions,
    // and advancing the textShow variable to control the flow of the game.
    */
      push();
      fill(0);
      noStroke();
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      if (text_show == 0) {
        s_pop.play();
        text_show++;
      } else if (text_show == 1) {
        text("Here you are!", bP3.x+30, bP3.y-25);
      } else if (text_show == 3) {
        text("Is this correct again?", bP3.x+30, bP3.y-25);
      } else if (text_show == 4) {
        background(0);
        i_lightoff.play();
        text_show++;
      } else if (text_show == 5) {
        background(0);
        fill(255);
        textSize(30);
        text("It's too dark!!", bP3.x+30, bP3.y-25);
      }
      pop();
      // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
      if (text_show >= 2 && text_show < 4) {
        if (text_show > 1) {
          push();
          fill(0);
          noStroke();
          textStyle(BOLD);
          textSize(20);
          textAlign(CENTER);
          for(let i=0; i<text_index+1 && i<text_array[2].length; i++) {
            if (i == text_index) {
              fill(255,0,0);
            } else {
              fill(0);
            }
            text(text_array[2][i],310+i*11+30,373);
            if (key == text_array[2][text_index]) {
              s_type.play();
              text_index++;
            } else if (text_array[2][text_index] == ' ') {
              text_index++;
            }
          }
          fill(0);
          // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
          if (text_index > 0 && text_show == 2) {
            text("It's fascinating to watch it again!!", bP3.x+30, bP3.y-25);
          } else if (text_index == 0 && text_show == 2) {
            text("No matter how much I look at it, I don't know what this is!!!", bP3.x+30, bP3.y-25);
          }
          pop();
          if (text_index == text_array[2].length) {
            if (text_show == 2) {
              s_pop.play();
              text_show++;
            }
          }
        }
      }
      if (text_show == 6) {
        gameOn();
      }
    } else {
      background(0);
      if (clear_stage == false) {
        s_clear.play();
        clear_stage = true;
      }
      drawStageBox();
    }
    // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
  } else if (current_stage == 3 && game == true) {
    if (stop_game == false) {
      if (text_show >= 0) {
        background('rgb(0,255,173)');
        bP3.display();
        sign();
        signPlate();
        push();
        noStroke();
        fill('green');
        rect(0, height-25, width, 25);
        pop();
        push();
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(30);
        fill(150);
        text("[Maze game]",width/2,200);
        textSize(20);
        fill(0);
        text("How do you print out the first of an array named 'grid'?",width/2,250);
        text("Answer: ",290,373);
        pop();
      }
      push();
      fill(0);
      noStroke();
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      if (text_show == 0) {
        text_show++;
        s_pop.play();
      } else if (text_show == 1) {
        text("There's a forest in the front, and it looks like a maze!", bP3.x+30, bP3.y-25);
      } else if (text_show == 2) {
        push();
        for(let i=0; i<text_index+1 && i<text_array[3].length; i++) {
          if (i == text_index) {
            fill(255,0,0);
          } else {
            fill(0);
          }
          text(text_array[3][i],310+i*11+60,373);
          if (key == text_array[3][text_index]) {
            s_type.play();
            text_index++;
          } else if (text_array[3][text_index] == ' ') {
            text_index++;
          }
        }
        pop();
        // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
        if (text_index > 0 && text_show == 2) {
          text("(Interesting)", bP3.x+30, bP3.y-25);
        } else if (text_index == 0 && text_show == 2) {
          text("By the way, do you know what this is?", bP3.x+30, bP3.y-25);
        }
        if (text_index == text_array[3].length) {
          if (text_show == 2) {
            s_pop.play();
            text_show++;
          }
        }
      }
      pop();
      if (text_show == 3) {
        push();
        m_draw();
        pop();
      }
    } else {
      background('rgb(0,255,173)');
      if (clear_stage == false) {
        s_clear.play();
        clear_stage = true;
      }
      drawStageBox();
    }
    // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
  } else if (current_stage == 4 && game == true) {
    if (stop_game == false) {
      if (text_show >= 0) {
        background(255);
        bP3.display();
        sign();
        signPlate();
        push();
        noStroke();
        fill('green');
        rect(0, height-25, width, 25);
        pop();
        push();
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(30);
        fill(150);
        text("[Maze game]",width/2,200);
        textSize(20);
        fill(0);
        text("What function calculates the distance between the values of x and y\n of the enemy object and the values of x and y of the bullet object?",width/2,250);
        text("Answer: ",130,373);
        pop();
      }
      push();
      fill(0);
      noStroke();
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      if (text_show == 0) {
        text_show ++;
        s_pop.play();
      } else if (text_show == 1) {
        text("I think I'm getting closer to home", bP3.x+30, bP3.y-25);
      } else if (text_show == 2) {
        text("I see a lot of little disruptors.", bP3.x+30, bP3.y-25);
      } else if (text_show == 3) {
        push();
        for(let i=0; i<text_index+1 && i<text_array[4].length; i++) {
          if (i == text_index) {
            fill(255,0,0);
          } else {
            fill(0);
          }
          text(text_array[4][i],310+i*11-130,373);
          if (key == text_array[4][text_index]) {
            s_type.play();
            text_index++;
          } else if (text_array[4][text_index] == ' ') {
            text_index++;
          }
        }
        pop();
        // display text based on the value of textShow, advancing through different dialogue or instructions.
    // each block checks the value of textShow and performs actions accordingly, like playing sounds and displaying text.
    // this part controls dialogue and narrative elements for this stage.
        if (text_index > 0) {
            text("(I'm excited to go home)", bP3.x+30, bP3.y-25);
          } else if (text_index == 0) {
            text("Anyway, do you know this?", bP3.x+30, bP3.y-25);
          }
        if (text_index == text_array[4].length) {
          if (text_show == 3) {
            s_pop.play();
            text_show++;
          }
        }
      }
      pop();
      if (text_show == 4) {
        push();
        shooting_game();
        pop();
      }
    } else {
      if (clear_stage == false) {
        s_clear.play();
        clear_stage = true;
      }
      drawStageBox();
      push();
      textSize(25);
      textStyle('bold');
      textAlign(CENTER);
      noStroke();
      fill('rgb(6,177,27)');
      text("Highest score: " + highest_score, width/2, height/2-25);
      pop();
    }
  } else if (current_stage == 5 && game == true) {
    if (stop_game == false) {
      byebox();
    }
  }
}
/*dodge game */
// function to handle the main game loop
function gameOn() {
  background(0); // set the background to black
  
  // draw static elements on the screen
  push();
  noStroke();
  fill(127);
  // draw vertical rectangles as boundaries or obstacles
  rect(200, 0, 20, 800);
  rect(580, 0, 20, 800);
  // draw a horizontal rectangle at the top
  fill(0, 255, 0);
  rect(220, 0, 360, 20);
  pop();

  aP.move(); // call the move method of the player object

  // display a text if the player reaches a certain position
  if (aP.y > 750) {
    push();
    fill(255);
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    text("It's dizzy!", aP.x + 30, aP.y - 25);
    pop();
  }

  // loop to manage multiple obstacle objects
  for (let i = 0; i < 14; i++) {
    aR[i].display(); // display each obstacle
    aR[i].move(); // move each obstacle
    aR[i].coll(); // check for collisions with the player
  }
  
  // check if the player reaches a certain position to stop the game and progress
  if (aP.y == 0) {
    stop_game = true; // set the game to a stopped state
    if (stage[current_stage + 1].a == 0) {
      stageclear(current_stage + 1); // Clear the stage if certain conditions are met
    }
  }
}

// Class representing the obstacle rectangles.
class avoidRect {
  constructor(x, y, d, v) {
    // initialize the object with direction, velocity, size, and position.
    this.direct = d;
    this.v = v;
    // set width and height based on velocity
    if (this.v == 0) {
      this.w = random(50, 300);
      this.h = random(10, 30);
    } else {
      this.w = random(10, 30);
      this.h = random(50, 300);
    }
    this.x = x - this.w;
    this.y = y - this.h;
    this.speed = 2; // set a movement speed.
  }
  
  // method to move the obstacle
  move() {
    // move horizontally or vertically based on velocity
    if (this.v == 0) {
      // horizontal movement
      if (this.direct == 1 && this.x > width) {
        this.x = -this.w;
      } else if (this.direct == -1 && this.x + this.w < 0) {
        this.x = width + this.w;
      }
      this.x += this.speed * this.direct;
    } else if (this.v == 1) {
      // vertical movement
      if (this.y > height)
        this.y = -this.h;
      this.y += this.speed * this.direct;
    }
  }
  
  // method to check for collisions with the player.
  coll() {
    if (this.x + this.w > aP.x &&
        this.x < aP.x + aP.scl &&
        this.y + this.h > aP.y &&
        this.y < aP.y + aP.scl) {
      reset(); // reset the game if a collision occurs
    }
  }
  
  // method to display the obstacle
  display() {
    push();
    noStroke();
    fill(200, 0, 0); // red color for the obstacle
    rect(this.x, this.y, this.w, this.h); // draw the obstacle as a rectangle
    pop();
  }
}

// class representing the player
class avoidPlayer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scl = 30; // size of the player
    this.speed = 3; // movement speed of the player
  }
  
  // method to move the player based on key inputs
  move() {
    push();
    noStroke();
    fill(255); // white color for the player
    square(this.x, this.y, this.scl); // draw the player as a square
    pop();
    // change the player's position based on key presses (WASD keys)
    this.x += (keyIsDown(68) - keyIsDown(65)) * this.speed;
    this.y += (keyIsDown(83) - keyIsDown(87)) * this.speed;
    // constrain the player's movement within the screen boundaries
    this.x = constrain(this.x, 220, 580 - this.scl);
    this.y = constrain(this.y, 0, height - this.scl);
  }
}
/*reset*/
// function to reset game elements based on the current stage
function reset() {
  // play a reset sound if the game is active and a certain condition is met
  if (game == true && text_show > 1) {
    s_reset.play();
  }

  // resetting parameters for stage 0
  if (current_stage == 0) {
    // set positions for ellipse and other elements
    ellipse_x = 400;
    ellipse_y = 400;
    scene = 0;
    ellipse_collide = false; // reset collision state
    bP.x = width / 2 - 25; // reset x position of bP
    bP.y = height - 75; // reset y position of bP
    bP.eye = 0; // reset eye state of bP
    bP.Leye = this.x + 14; // reset left eye position
    bP.Reye = this.x + 50 - 14; // reset right eye position
  } 
  // resetting parameters for stage 1
  else if (current_stage == 1) {
    green0 = 255; // reset a color parameter
    // randomize values for a, b, c
    a = floor(random(20, 150));
    b = floor(random(20, 80));
    c = floor(random(20, 150));
    yY = random(200, height - 50); // randomize y position
    keyX = 770; // reset x position
    // reset counters and timers
    count = 0;
    timer = 0;
    time = 30;
    out = 0;
    // reset state of played sounds
    moo1_played = false;
    moo2_played = false;
    moo3_played = false;
    // reset position of bP2
    play2.x = 770;
    play2.y = random(200, height - 50);
  } 
  // resetting parameters for stage 2
  else if (current_stage == 2) {
    // loop through the aR array and reset positions and speeds
    for (let i = 0; i < 7; i++) {
      aR[i].x = -aR[i].w;
      aR[i + 7].x = width;
      aR[i].speed = random(5, 12);
      aR[i + 7].speed = random(5, 12);
      // conditionally reset width and height
      if (aR[i].v == 0) {
        aR[i].w = random(50, 300);
        aR[i].h = random(10, 30);
      } else {
        aR[i].w = random(10, 30);
        aR[i].h = random(50, 300);
      }
    }
    // reset position of aP
    aP.x = width / 2;
    aP.y = height - 30;
  } 
  // resetting parameters for stage 3
  else if (current_stage == 3) {
    current = grid[0];
    player = grid[0];
  } 
  // resetting parameters for stage 4
  else if (current_stage == 4) {
    this.x = width / 2 - 12;
    score = 0; // reset score
    // loop through enemies and reset their positions
    for (let enemy of enemies) {
      enemy.y = random(-850, 0);
    }
    // loop through bullets and reset their positions
    for (let bullet of bullets) {
      bullet.y = -900;
    }
  } 
  // resetting parameters for stage 5
  else if (current_stage == 5) {
    bP.x = -50; // reset x position of bP
    bP.y = height - 75; // reset y position of bP
  }
}

/*maze*/
/*
References:
https://rosettacode.org/wiki/Maze_generation#JavaScript
https://thecodingtrain.com/challenges/10-dfs-maze-generator
*/

function m_draw(){
  for(let i = 0 ; i < grid.length; i++){
    grid[i].show();
   }
 
 current.visited = true;
 if(!maze_game_start){
   current.highlight();
 }
 let next = current.checkNeighbors();
 if (next) {
   next.visited = true;
   stack.push(current);
   removeWalls(current, next);
   current = next;
 } else if (stack.length > 0) {
   current = stack.pop();
 } else{
   maze_game_start = true;
   move_p();
   goal();
 }
}

function index(i,j){
 if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
   return -1;
 }
 return i+j*cols;
}

function Cell(i,j) {
 this.i = i;
 this.j = j;
 this.walls=[true,true,true,true] // top,right,bottom, left
 this.visited = false;
 
 this.checkNeighbors = function(){
   let neighbors = [];
   
   let top = grid[index(i,j-1)];
   let right = grid[index(i+1,j)];
   let bottom = grid[index(i,j+1)];
   let left = grid[index(i-1,j)];
   
   if (top && !top.visited){
     neighbors.push(top);
   }
   if (right && !right.visited){
     neighbors.push(right);
   }
   if (bottom && !bottom.visited){
     neighbors.push(bottom);
   }
   if (left && !left.visited){
     neighbors.push(left);
   }
   
   if(neighbors.length > 0){
     let r = floor(random(0, neighbors.length));
     return neighbors[r];
   } else{
     return undefined;
   }
   
 }
 
 this.highlight = function(){
   let x = this.i*m_s;
   let y = this.j*m_s;
   noStroke();
   fill(255,255,0);
   rect(x, y, m_s, m_s);
 }
 
 this.show = function(){
   let x = this.i*m_s;
   let y = this.j*m_s;
   push();
   strokeWeight(4);
   stroke(230);
   if(this.walls[0]){
     line(x, y, x+m_s, y);
   }
   if(this.walls[1]){
     line(x+m_s, y, x+m_s, y+m_s);
   }
   if(this.walls[2]){
     line(x+m_s, y+m_s, x, y+m_s);
   }
   if(this.walls[3]){
     line(x, y+m_s, x, y);
   }
   pop();
   if(this.visited){
     noStroke();
     fill('rgb(0,255,173)');
     rect(x,y,m_s,m_s);
   }
 }
 
}

function removeWalls(a, b) {
 let x = a.i - b.i;
 if (x === 1) {
   a.walls[3] = false;
   b.walls[1] = false;
 } else if (x === -1) {
   a.walls[1] = false;
   b.walls[3] = false;
 }
 let y = a.j - b.j;
 if (y === 1) {
   a.walls[0] = false;
   b.walls[2] = false;
 } else if (y === -1) {
   a.walls[2] = false;
   b.walls[0] = false;
 }
}
// what I added as the character moves
// function to handle player movement
function move_p() {
  let moveTo;
  
  // check if UP arrow or 'W' is pressed
  if (keyIsDown(UP_ARROW) || keyIsDown(87) == 1) {
    // move up if no wall and if 'ones' flag is true
    if (!player.walls[0] && ones) {
      moveTo = grid[index(player.i, player.j - 1)];
      move = true;
      ones = false;
    }
  }
  // check if RIGHT arrow or 'D' is pressed
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) == 1) {
    // move right if no wall and if 'ones' flag is true
    if (!player.walls[1] && ones) {
      moveTo = grid[index(player.i + 1, player.j)];
      move = true;
      ones = false;
    }
  }
  // check if DOWN arrow or 'S' is pressed
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83) == 1) {
    // move down if no wall and if 'ones' flag is true
    if (!player.walls[2] && ones) {
      moveTo = grid[index(player.i, player.j + 1)];
      move = true;
      ones = false;
    }
  }
  // check if LEFT arrow or 'A' is pressed
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65) == 1) {
    // move left if no wall and if 'ones' flag is true
    if (!player.walls[3] && ones) {
      moveTo = grid[index(player.i - 1, player.j)];
      move = true;
      ones = false;
    }
  }
  // if move is allowed, update player position and play sound
  if (move) {
    move = false;
    player = moveTo;
    s_mazemove.play();
  }
  // draw player on the grid
  let p_size = m_s - 10;
  noStroke();
  fill(255);
  rect(player.i * m_s + 5, player.j * m_s + 5, p_size, p_size);
  // display text when player is at start position
  if (player == grid[0]) {
    push();
    fill(0);
    textSize(20);
    textStyle(BOLD);
    text("Vamos!", 27, 71);
    pop();
  }
} 

// function to reset 'ones' flag on key release for movement control
function keyReleased() {
  // check if any movement key is released
  if (keyCode === UP_ARROW || keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || key === 'w' || key === 'a' || key === 's' || key === 'd') {
    ones = true;
  }
}

// function to draw the goal area and check for completion
function goal() {
  // draw goal area in red
  push();
  noStroke();
  fill(255, 0, 0)
  rect((cols - 1) * m_s + 2, (rows - 1) * m_s + 2, m_s - 4, m_s - 4);
  pop();
  // check if player reaches goal to stop the game and clear stage
  if (player.i == cols - 1 && player.j == rows - 1) {
    stop_game = true;
    if (stage[current_stage + 1].a == 0) {
      stageclear(current_stage + 1);
    }
  }
}

/*shooting game*/
/* 
score indicator: https://editor.p5js.org/y43937672/sketches/3BBniQ4Bw 
Reference: https://www.youtube.com/watch?v=GusFmfBmJmc

*/
// function to run the shooting game
function shooting_game() {
  background(255); // set the background to white
  rectMode(CENTER); // set rectangle drawing mode to center
  score_point.display(); // display the shooting player
  score_point.move(); // update the shooting player's position

  // loop through each bullet to update and draw
  for (let bullet of bullets) {
    push();
    stroke(0); // set bullet color to black
    square(bullet.x, bullet.y, 10, 10); // draw bullet as a square
    pop();
    bullet.y -= 7; // move bullet upwards
  }

  // loop through each enemy to update and draw
  for (let enemy of enemies) {
    enemy.x += random(-1, 1); // randomly move enemy horizontally
    enemy.y += random(1, 10); // move enemy downwards
    circle(enemy.x, enemy.y, 10); // draw enemy as a circle
    fill(0); // set fill color to black for enemies
    // reset enemy position if it goes off screen
    if (enemy.y > height) {
      enemy.x = random(0, width);
      enemy.y = -2;
    }
  }

  // check for collisions between bullets and enemies
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      // remove bullet if it goes off screen
      if (bullet.y < -850) {
        bullets.splice(bullets.indexOf(bullet), 1);
      }
      // check for collision between enemy and bullet
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10) {
        // remove enemy and bullet upon collision
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        // create a new enemy near the mouse position
        let newEnemy = {
          x: random(mouseX - 50, mouseX + 50),
          y: random(-850, 0),
        };
        enemies.push(newEnemy);
        score += 1; // increase score
      }
    }
    // check for collision between enemy and player
    if (enemy.x - 5 < score_point.x + 24 && enemy.x + 5 > score_point.x &&
        enemy.y - 5 < height && enemy.y + 5 > height - 24) {
      // stop the game or reset based on score
      if (score >= 10) {
        stop_game = true;
        if (stage[current_stage + 1].a == 0) {
          stageclear(current_stage + 1);
        }
      } else {
        reset();
      }
    }
  }

  // display score and objective
  fill(230);
  stroke(0);
  rect(93, 25, 175, 40);
  fill(0);
  textAlign(CENTER);
  textSize(25);
  text("Objective: " + score + " / 10", 90, 35);

  // update and display high score
  if (score >= highest_score) {
    push();
    textAlign(RIGHT);
    fill('rgb(6,177,27)');
    text("Highest score!", width, 35);
    pop();
    highest_score = score;
  }
}

// class representing the shooting player
class shootP {
  constructor() {
    this.x = width / 2 - 12; // set initial x position
  }
  
  // method to move the player based on key inputs
  move() {
    this.x += ((keyIsDown(68) | keyIsDown(39)) - (keyIsDown(65) | keyIsDown(37))) * 4;
    this.x = constrain(this.x, 0, width - 24); // constrain movement within the canvas
  }
  
  // method to display the player
  display() {
    push();
    fill(0); // set player color to black
    square(this.x, height - 24, 24); // draw player as a square
    pop();
  }
}

/*hellobox*/
// function to handle the interactive narrative sequence
function hellobox() {
  background(255); // set background to white
  stroke(0); // set stroke color to black
  strokeWeight(1); // set stroke weight to 1
  fill(0); // set fill color to black

  // handle different scenes based on the value of 'scene'
  if (scene == 0) {
    // set text properties and position    
    let tx = 100;
    let ty = 150;
    textStyle(BOLD);
    textSize(20);
    // align text to center and draw instruction boxes and text
    push();
    textAlign(CENTER);
    // change the text and its background rectangle based on textShow value
    if (text_show == 7) {
      bP.x = width/2-25;
      bP.y = height-75;
      stroke(0);
      fill(255);// white color for text background
      rect(310,757,181,30);// rectangle for text background
      fill(0);// black color for text
      noStroke();
      text("Enter a key to proceed",width/2,height-20);  
    } else {
      stroke(0);
      fill(255);
      rect(323,757,156,30);
      fill(0);
      noStroke();
      text("Proceed with the SPACE key",width/2,height-20);
    }
    pop();
    textAlign(LEFT);

    // draw rectangles around the dialog area
    push();
    noFill();
    rect(30,30,720,40);
    rect(650,30,100,40);
    rect(30,30,720,500);
    pop();

    // display dialog text line by line based on textShow value
    push();
    noStroke();
    // display different lines of the dialog as textShow increases
    // the dialog appears to be instructional or story-based
    // various text strings are shown at different stages of textShow
    if (text_show > 0) {
      text("CCF",tx-50,ty);
      text("| Hello everyone! Let's use a p5.js ",tx,ty);
    }
    if (text_show > 1) {
      text("| and let's do a fun graphic class.",tx,ty+25);
    }
    if (text_show > 2) {
      text("| Let's start with the circle",tx,ty+50);
    }
    if (text_show > 3) {
      text("| To create a circle with size 50 in the center of the screen using square",tx,ty+75);
    }
    if (text_show > 4) {
      text("| you can write ellipse(width/2,height/2,50,50);",tx,ty+100);
    }
    if (text_show > 5) {
      text("| Everyone, please repeat after me",tx,ty+125);
    }
    if (text_show > 6) {
      text("| Me",674,326);
      push();
      textAlign(CENTER);
      for(let i=0; i<text_index+1 && i<text_array[0].length; i++) {
        if (i == text_index) {
          fill(255,0,0);
        } else {
          fill(0);
        }
        text(text_array[0][i],310+i*11+10,176+150);
        if (key == text_array[0][text_index]) {
          s_type.play();
          text_index++;
        } else if (text_array[0][text_index] == ' ') {
          text_index++;
        }
      }
      pop();
      if (text_index == text_array[0].length) {
        if (text_show == 7) {
          s_pop.play();
          text_show++;
        }
      }
    }
    if (text_show > 7) {
      text("CCF",tx-50,ty+232);
      text("| Good job!",tx,ty+232);
      push();
      stroke(0);
      fill(255);
      ellipse(ellipse_x,ellipse_y,50,50);
      pop();
      if (ellipse_y - 50 > height) {
        ellipse_y = -50;
        text_index = 0;
        scene = 1;
      }
    }
    if (text_show > 8) {
      text("| This time, let's make this ball",tx,ty+257);
    }
    if (text_show > 9) {
      text("| move",tx,ty+283);
    }
    if (text_show > 10) {
      text("| You can change the y-coordinate.",tx,ty+308);
      ellipse_y += 7;
    }
    pop();
  } 
  // handle scene 1 with different interactions and dialog
  else if (scene == 1) {
    bP.display(); // display the box player
    push();
    noStroke(); // disable stroke for the following shapes
    fill(227); // set a light grey fill color
    // draw a rectangle at the bottom of the screen
    rect(0, height-25, width, 25);
    pop();

    // set text styles for dialog
    push();
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    noStroke(); // disable stroke for the text
    // if the ellipse is visible on screen
    if (ellipse_x > -25) {
      push();
      stroke(0);// set stroke color to black for the ellipse
      fill(255);// set fill color to white for the ellipse
       // draw the ellipse
      ellipse(ellipse_x,ellipse_y,50,50);
      pop();
      // if the ellipse collides and hasn't collided before
      if (ellipse_y + 25 >= height-75 && ellipse_collide == false) {
        ellipse_collide = true; // mark as collided
        s_punch.play(); // play the punch sound
        bP.y += 10; // move the box player down
        // draw an image to indicate the hit
        push();
        image(i_hit,366,711,70,50);
        pop();
      } else if (ellipse_collide == true) {
        // move the ellipse away after collision
        ellipse_x -= 8;
        ellipse_y -= 3;
      } else {
        // move the ellipse down if no collision
        ellipse_y += 7;
      }
    // display various text dialogues based on the value of textShow
    // the dialogues are part of the narrative or game instructions

    // additional conditional blocks to handle different dialogues
    // and player reactions based on the game's narrative progression

    // handling player movement and display updates based on textShow
    // includes moving the player and showing instructions for interaction

    // conditional checks and updates for player movement and dialogue display
    } else if (text_show >= 11 && text_show <= 12) {
      text("Ouch!", width/2, height-90);
      bP.y = height-75;
      if (text_show == 11) {
        text_show++;
      }
    } else if (text_show == 13) {
      text("Who is it?!", width/2, height-90);
    } else if (text_show == 14) {
      text("!!", width/2, height-90);
    } else if (text_show == 15) {
      bP.eye = 15;
      text("Ah, it was you!", width/2, height-90);
    } else if (text_show == 16) {
      text("I have to go back home", width/2, height-90);
    } else if (text_show == 17) {
      text("but I can't move...", width/2, height-90);
      if (bP.eye > 10) {
        bP.eye--;
        bP.x += random(-1, 1);
        bP.y += random(-1, 1);
      }
    } else if (text_show == 18) {
      text("Please help me..", bP.x+30, bP.y-25);
      if (bP.x+50 >= 482) {
        s_pop.play();
        text_show++;
      } else {
        push();
        noStroke();
        fill(0,255,0);
        rect(432,776,50,10);
        pop();
      }
    } else if (text_show == 19) {
      text("Wow, that's amazing!!", bP.x+30, bP.y-25);
    } else if (text_show == 20) {
      text("Let's go to the right!", bP.x+30, bP.y-25);
      if (bP.x+50 >= width) {
        s_pop.play();
        text_show++;
      } else {
        push();
        noStroke();
        fill(0,255,0);
        rect(width-50,776,50,10);
        pop();
      }
    } else if (text_show == 21) {
      bP.x = 0;
      scene++;
    }
    if (text_show > 11) {
      push();
      fill(255);
      stroke(0);
      rect(323,27,156,30);
      pop();
      if (text_show > 11 && text_show < 18 || text_show > 18) {
        push();
        fill(0);
        text("Proceed with the SPACE key",width/2,50);
        pop();
      }
      if (text_show == 18) {
        push();
        fill(0);
        text("Proceed with A / D key",width/2,50);
        pop();
      }
      if (bP.eye < 15 && text_show == 14) {
        bP.eye++;
      }
      if (bP.eye < 15 && text_show == 19) {
        bP.eye++;
      }
      if (text_show > 17) {
        bP.move();
      }
    }
    pop();
  }
  // handle scene 2 with various interactions and dialogues
  else if (scene == 2) {
  // if textShow is less than 31, continue displaying and updating the scene
    if (text_show < 31) {
      textStyle(BOLD);  // set text style to bold
      textSize(20); // set text size
      textAlign(CENTER); // align text to the center
      noStroke(); // disable stroke for text
      bP.display(); // display the box player
      push();
      noStroke(); // disable stroke for the rectangle
      fill(227); // set a light grey fill color
      rect(0, height-25, width, 25); // draw a rectangle at the bottom of the screen
      pop();
      pop();
      sign(); // call the sign function to display a sign
    }
    // series of conditional checks to handle different stages of the narrative
    // based on the value of textShow
    // each condition displays different text dialogue and manages player position and actions

    // additional conditions to handle narrative progression
    // include displaying text based on textShow value and managing player interactions

    // conditional block to change the background and play sound effects
    // based on the narrative progression
    // also includes handling game state changes like stopping the game or clearing the stage

    // additional conditionals to display a sign plate and interactive text
    // related to a game challenge
    // include handling user input and displaying dynamic text based on player actions
    if (text_show == 21) {
      if (bP.x < 100) {
        bP.x++;
      } else {
        text_show++;
      }
      eye_movement = false;
      bP.Leye = bP.x+40;
      bP.Reye = bP.x+40;
      text("I'm sure it was around here..", bP.x+30, bP.y-25);
    } else if (text_show == 22) {
      eye_movement = true;
      bP.x = 100;
      text("Oh, that's right!", bP.x+30, bP.y-25);
    } else if (text_show == 23) {
      text("I can't see the way home but", bP.x+30, bP.y-25);
    } else if (text_show == 24) {
      text("I see the sign!", bP.x+30, bP.y-25);
    } else if (text_show == 25) {
      text("Let's go closer!", bP.x+30, bP.y-25);
      bP.move();
      push();
      noStroke();
      fill(0,255,0);
      rect(width/2-25,height-25,50,10);
      pop();
      if (bP.x + 50 >= width/2+25) {
        text_show++;
      }
    } else if (text_show == 26) {
      text("Well, I guess this is the problem we need to solve.", bP.x+30, bP.y-25);
    } else if (text_show == 27) {
      text("I have no idea..", bP.x+30, bP.y-25);
    } else if (text_show == 28) {
      text("Please help!", bP.x+30, bP.y-25);
    } else if (text_show == 30) {
      text("Is this the answer?", bP.x+30, bP.y-25);
    } else if (text_show == 31) {
      background(0);
      i_lightoff.play();
      text_show++;
    } else if (text_show == 32) {
      background(0);
      push();
      fill(255);
      text("Yes, it is!", bP.x+30, bP.y-25);
      pop();
    } else if (text_show == 33) {
      stop_game = true;
      if (stage[current_stage + 1].a == 0) {
        stageclear(current_stage+1);
      }
    }
    if (text_show > 20 && text_show < 31) {

      
      if (text_show > 25) {
        signPlate();
        push();
        textSize(30);
        fill(150);
        text("[Red light, green light]",width/2,200);
        pop();
        text("The system variable that detects the key is being pressed and returns is ?",width/2,250);
        text("Answer: ",290,373);
      }
      if (text_show > 28 && text_show < 31) {
        push();
        for(let i=0; i<text_index+1 && i<text_array[1].length; i++) {
          if (i == text_index) {
            fill(255,0,0);
          } else {
            fill(0);
          }
          text(text_array[1][i],310+i*11+30,373);
          if (key == text_array[1][text_index]) {
            s_type.play();
            text_index++;
          } else if (text_array[1][text_index] == ' ') {
            text_index++;
          }
        }
        pop();
        if (text_index > 0 && text_show == 29) {
            text("Wow, I'm getting letters!", bP.x+30, bP.y-25);
          }
        if (text_index == text_array[1].length) {
          if (text_show == 29) {
            s_pop.play();
            text_show++;
          }
        }
      }
    }
  }
}

// function to draw a sign post
function sign() {
  // save current drawing settings
  push();
  // set stroke properties for the sign
  stroke(0); // black color for stroke
  strokeWeight(1); // stroke weight set to 1
  // set fill color for the sign
  fill('rgb(243,238,211)'); // light beige color
  // draw the top part of the sign
  rect(width / 2 - 25, height - 75, 50, 25);
  // draw the pole of the sign
  rect(width / 2 - 5, height - 50, 10, 25);
  // restore previous drawing settings
  pop();
}

// function to draw a sign plate
function signPlate() {
  // save current drawing settings
  push();
  // set stroke properties for the sign plate
  stroke(0); // black color for stroke
  strokeWeight(1); // stroke weight set to 1
  // set fill color for the sign plate
  fill('rgb(243,238,211)'); // light beige color
  // draw the sign plate
  rect(50, 110, 700, 350);
  // restore previous drawing settings
  pop();
}


// class representing a box player character
class boxPlayer {
  constructor(x, y) {
    // initialize player position and eye attributes
    this.x = x;
    this.y = y;
    this.eye = 0; // initial state of the eyes
    this.Leye = this.x + 14; // left eye position
    this.Reye = this.x + 50 - 14; // right eye position
  }
  
  // method to move the player
  move() {
    // update x position based on key inputs (D or right arrow, and A or left arrow)
    this.x += ((keyIsDown(68) | keyIsDown(39)) - (keyIsDown(65) | keyIsDown(37))) * 4;
    // constrain the x position within the canvas boundaries
    this.x = constrain(this.x, 0, width - 50);
  }
  
  // method to display the player
  display() {
    // adjust eye movement based on stage and key inputs
    if (current_stage != 1 && eye_movement == true) {
      // check key inputs to adjust the eye positions
      if (((keyIsDown(68) | keyIsDown(39)) - (keyIsDown(65) | keyIsDown(37))) == 0) {
        this.Leye = this.x + 14;
        this.Reye = this.x + 36;
      } else if (keyIsDown(68) | keyIsDown(39)) {
        this.Leye = this.x + 40;
        this.Reye = this.x + 40;
      } else if (keyIsDown(65) | keyIsDown(37)) {
        this.Leye = this.x + 10;
        this.Reye = this.x + 10;
      }
    } else if (eye_movement == true) {
      // adjust eye position based on textShow for stage 1
      if (keyIsPressed && text_show == 3) {
        this.Leye = this.x + 10;
        this.Reye = this.x + 10;
      } else {
        this.Leye = this.x + 14;
        this.Reye = this.x + 36;
      }
    }
    
    // draw the player as a square with eyes
    push();
    fill(255); // set fill color for the player
    stroke(0); // set stroke color for the player
    rect(this.x, this.y, 50, 50); // draw player as a square
    fill(0); // set fill color for the eyes
    // draw the eyes as ellipses
    ellipse(this.Leye, this.y + 21, 5, this.eye);
    ellipse(this.Reye, this.y + 21, 5, this.eye);
    pop();
  }
}

/*byebox*/
// function to handle the narrative and interactions in the 'byebox' scene
function byebox() {
  // display different elements and dialogue based on the value of textShow
  if (text_show < 15) {
    // display the scene if textShow is in the initial stages
    if (text_show >= 0) {
      push();
      sign(); // display a sign
      background('rgb(15,232,248)'); // set a light blue background
      bP4.display(); // display the fourth box player
      sign(); // display the sign again
      noStroke(); // disable strokes for shapes
      fill('green');// set fill color to green
      rect(0, height-25, width, 25); // draw a green bar at the bottom
      pop();
    }
    // display a sign plate with text if textShow is within a specific range
    if (text_show >= 5 && text_show < 12) {
      signPlate(); // display the sign plate
      push();
      noStroke(); // disable strokes for text
      textStyle(BOLD); // set text style to bold
      textAlign(CENTER); // center align text
      textSize(30);// set text size to 30
      fill(150);// set fill color to a grey shade
      text("/*[memo]*/",width/2,200);// display a memo-like text
      textSize(20);// set text size to 20 for smaller text
      fill(0);// set fill color to black
      text("//I'm going to change my image, I've deleted it now.",width/2,250);  // display another line of text
      pop();
    }
    // display an image of a house if textShow has reached a specific value
    if (text_show >= 12) {
        image(i_house,400,335);// display the house image at specified coordinates
    }

    // handle various dialogue and text displays based on the value of textShow
    // includes conditionals to check the current stage of textShow and display appropriate text
    // also includes logic to control the movement of the box player (bP4) and change its eye movement
    // certain conditions trigger sound effects, change textShow, and update player position and appearance
    // dialogues appear to be part of the narrative or instructions to the player

    // additional conditions for displaying text and handling player interactions
    // includes displaying images at the end of the narrative sequence
    push();
    fill(0);
    noStroke();
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    if (text_show == 0) {
      text_show ++;
      s_pop.play();
    } else if (text_show == 1) {
      eye_movement = false;
      bP4.Leye = bP4.x+40;
      bP4.Reye = bP4.x+40;
      text("Here is my house!", bP4.x+30, bP4.y-25);
      if (bP4.x < 200) {
        bP4.x += 2;
      }
    } else if (text_show == 2) {
      eye_movement = true;
      bP4.x = 200;
      text("...but what is this?", bP4.x+30, bP4.y-25);
    } else if (text_show == 3) {
      text("There is only one sign here, too.", bP4.x+30, bP4.y-25);
    } else if (text_show == 4) {
      text("Can we take a look at it?", bP4.x+30, bP4.y-25);
      bP4.move();
      push();
      noStroke();
      fill(0,255,0);
      rect(width/2-25,height-25,50,10);
      pop();
      if (bP4.x + 50 >= width/2+25) {
        text_show++;
      }
    } else if (text_show == 5) {
      text("Nothing is written here...?", bP4.x+30, bP4.y-25);
    } else if (text_show == 6) {
      text("So there's nothing I can do here...?", bP4.x+30, bP4.y-25);
    } else if (text_show == 7) {
      push();
      textSize(30);
      text("Why did my house disappear?!?!", bP4.x+30, bP4.y-25);
      pop();
    } else if (text_show == 8) {
      text("Where is my nice house?", bP4.x+30, bP4.y-25);
    } else if (text_show == 9) {
      text("The roof was marked with 'i_house...' and...", bP4.x+30, bP4.y-25);
    } else if (text_show == 10) {
      text("When someone told me the location of my house,\n the guy called it in a very unique way...", bP4.x+30, bP4.y-25);
    } else if (text_show == 11) {
      push();
      for(let i=0; i<text_index+1 && i<text_array[5].length; i++) {
        if (i == text_index) {
          fill(255,0,0);
        } else {
          fill(0);
        }
        text(text_array[5][i],310+i*11-20,373);
        if (key == text_array[5][text_index]) {
          s_type.play();
          text_index++;
        } else if (text_array[5][text_index] == ' ') {
          text_index++;
        }
      }
      pop();
      if (text_index > 0) {
        text("Are we supposed to write on a blank sign...?", bP3.x+30, bP3.y-25);
      } else if (text_index == 0) {
        text("It is marked with 400, 335... is this some kind of code..?", bP4.x+30, bP4.y-25);
      }
      if (text_index == text_array[5].length) {
        if (text_show == 11) {
          s_pop.play();
          text_show++;
        }
      }
    } else if (text_show == 12) {
      text("Wow, that is my house!!", bP4.x+30, bP4.y-25);
      eye_movement = false;
      bP4.Leye = bP4.x+40;
      bP4.Reye = bP4.x+40;
      if (bP4.x + 50 < width/2+50) {
         bP4.x += 2;
      }
    } else if (text_show == 13) {
      eye_movement = true;
      if (bP4.x + 50 < width/2+150) {
         bP4.x += 2;
      } else {
        text_show ++;
      }
      text("Thank you!!", bP4.x+30, bP4.y-25);
    } else if (text_show == 14) {
      bP4.x = width/2 + 100;
      push();
      textSize(50);
      text("Meanwhile", width/2, height/2);
      pop();
    }
  } else {
    // display different images and text at the conclusion of the narrative
    // handle the end of the scene with images and a 'THE END' text
    // includes displaying credits image
    if (text_show == 15) {
      image(i_end1,0,0);
    } else if (text_show == 16) {
      image(i_end2,0,0);
    } else if (text_show == 17) {
      image(i_end3,0,0);
    } else if (text_show == 18) {
      push();
      textSize(100);
      text("THE END",width/2,height/2);
      pop();
    } else if (text_show == 19) {
      image(i_credit,0,0,800,800);
    }
  }
}