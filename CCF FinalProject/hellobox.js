function hellobox() {
  background(255);
  stroke(0);
  strokeWeight(1);
  fill(0);
  if (scene == 0) {
    let tx = 100;
    let ty = 150;
    textStyle(BOLD);
    textSize(20);
    push();
    textAlign(CENTER);
    if (textShow == 7) {
      bP.x = width/2-25;
      bP.y = height-75;
      stroke(0);
      fill(255);
      rect(310,757,181,30);
      fill(0);
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

    push();
    noFill();
    rect(30,30,720,40);
    rect(650,30,100,40);
    rect(30,30,720,500);
    pop();
    
    push();
    noStroke();
    if (textShow > 0) {
      text("22cg",tx-50,ty);
      text("| Hello everyone! Let's use a p5.js ",tx,ty);
    }
    if (textShow > 1) {
      text("| and let's do a fun graphic class.",tx,ty+25);
    }
    if (textShow > 2) {
      text("| Let's start with the circle",tx,ty+50);
    }
    if (textShow > 3) {
      text("| To create a circle with size 50 in the center of the screen using square",tx,ty+75);
    }
    if (textShow > 4) {
      text("| you can write ellipse(width/2,height/2,50,50);",tx,ty+100);
    }
    if (textShow > 5) {
      text("| Everyone, please repeat after me",tx,ty+125);
    }
    if (textShow > 6) {
      text("| Me",674,326);
      push();
      textAlign(CENTER);
      for(let i=0; i<textIndex+1 && i<textArr[0].length; i++) {
        if (i == textIndex) {
          fill(255,0,0);
        } else {
          fill(0);
        }
        text(textArr[0][i],310+i*11+10,176+150);
        if (key == textArr[0][textIndex]) {
          s_type.play();
          textIndex++;
        } else if (textArr[0][textIndex] == ' ') {
          textIndex++;
        }
      }
      pop();
      if (textIndex == textArr[0].length) {
        if (textShow == 7) {
          s_pop.play();
          textShow++;
        }
      }
    }
    if (textShow > 7) {
      text("22cg",tx-50,ty+232);
      text("| Good job!",tx,ty+232);
      push();
      stroke(0);
      fill(255);
      ellipse(ellipseX,ellipseY,50,50);
      pop();
      if (ellipseY - 50 > height) {
        ellipseY = -50;
        textIndex = 0;
        scene = 1;
      }
    }
    if (textShow > 8) {
      text("| This time, let's make this ball",tx,ty+257);
    }
    if (textShow > 9) {
      text("| move",tx,ty+283);
    }
    if (textShow > 10) {
      text("| You can change the y-coordinate.",tx,ty+308);
      ellipseY += 7;
    }
    pop();
  } 
  else if (scene == 1) {
    bP.display();
    push();
    noStroke();
    fill(227);
    rect(0, height-25, width, 25);
    pop();
    push();
    textStyle(BOLD);
    textSize(20);
    textAlign(CENTER);
    noStroke();
    if (ellipseX > -25) {
      push();
      stroke(0);
      fill(255);
      ellipse(ellipseX,ellipseY,50,50);
      pop();
      if (ellipseY + 25 >= height-75 && ellcoll == false) {
        ellcoll = true;
        s_punch.play();
        bP.y += 10;
        push();
        image(i_hit,366,711,70,50);
        pop();
      } else if (ellcoll == true) {
        ellipseX -= 8;
        ellipseY -= 3;
      } else {
        ellipseY += 7;
      }
    } else if (textShow >= 11 && textShow <= 12) {
      text("Ouch!", width/2, height-90);
      bP.y = height-75;
      if (textShow == 11) {
        textShow++;
      }
    } else if (textShow == 13) {
      text("Who is it?!", width/2, height-90);
    } else if (textShow == 14) {
      text("!!", width/2, height-90);
    } else if (textShow == 15) {
      bP.eye = 15;
      text("Ah, it was you!", width/2, height-90);
    } else if (textShow == 16) {
      text("I have to go back home", width/2, height-90);
    } else if (textShow == 17) {
      text("but I can't move...", width/2, height-90);
      if (bP.eye > 10) {
        bP.eye--;
        bP.x += random(-1, 1);
        bP.y += random(-1, 1);
      }
    } else if (textShow == 18) {
      text("Please help me..", bP.x+30, bP.y-25);
      if (bP.x+50 >= 482) {
        s_pop.play();
        textShow++;
      } else {
        push();
        noStroke();
        fill(0,255,0);
        rect(432,776,50,10);
        pop();
      }
    } else if (textShow == 19) {
      text("Wow, that's amazing!!", bP.x+30, bP.y-25);
    } else if (textShow == 20) {
      text("Let's go to the right!", bP.x+30, bP.y-25);
      if (bP.x+50 >= width) {
        s_pop.play();
        textShow++;
      } else {
        push();
        noStroke();
        fill(0,255,0);
        rect(width-50,776,50,10);
        pop();
      }
    } else if (textShow == 21) {
      bP.x = 0;
      scene++;
    }
    if (textShow > 11) {
      push();
      fill(255);
      stroke(0);
      rect(323,27,156,30);
      pop();
      if (textShow > 11 && textShow < 18 || textShow > 18) {
        push();
        fill(0);
        text("Proceed with the SPACE key",width/2,50);
        pop();
      }
      if (textShow == 18) {
        push();
        fill(0);
        text("Proceed with A / D key",width/2,50);
        pop();
      }
      if (bP.eye < 15 && textShow == 14) {
        bP.eye++;
      }
      if (bP.eye < 15 && textShow == 19) {
        bP.eye++;
      }
      if (textShow > 17) {
        bP.move();
      }
    }
    pop();
  }
  else if (scene == 2) {
    if (textShow < 31) {
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      noStroke();
      bP.display();
      push();
      noStroke();
      fill(227);
      rect(0, height-25, width, 25);
      pop();
      sign();
    }
    if (textShow == 21) {
      if (bP.x < 100) {
        bP.x++;
      } else {
        textShow++;
      }
      eyemove = false;
      bP.Leye = bP.x+40;
      bP.Reye = bP.x+40;
      text("I'm sure it was around here..", bP.x+30, bP.y-25);
    } else if (textShow == 22) {
      eyemove = true;
      bP.x = 100;
      text("Oh, that's right!", bP.x+30, bP.y-25);
    } else if (textShow == 23) {
      text("I can't see the way home but", bP.x+30, bP.y-25);
    } else if (textShow == 24) {
      text("I see the sign!", bP.x+30, bP.y-25);
    } else if (textShow == 25) {
      text("Let's go closer!", bP.x+30, bP.y-25);
      bP.move();
      push();
      noStroke();
      fill(0,255,0);
      rect(width/2-25,height-25,50,10);
      pop();
      if (bP.x + 50 >= width/2+25) {
        textShow++;
      }
    } else if (textShow == 26) {
      text("Well, I guess this is the problem we need to solve.", bP.x+30, bP.y-25);
    } else if (textShow == 27) {
      text("I have no idea..", bP.x+30, bP.y-25);
    } else if (textShow == 28) {
      text("Please help!", bP.x+30, bP.y-25);
    } else if (textShow == 30) {
      text("Is this the answer?", bP.x+30, bP.y-25);
    } else if (textShow == 31) {
      background(0);
      i_lightoff.play();
      textShow++;
    } else if (textShow == 32) {
      background(0);
      push();
      fill(255);
      text("Yes, it is!", bP.x+30, bP.y-25);
      pop();
    } else if (textShow == 33) {
      gamestop = true;
      if (stage[nowStage + 1].a == 0) {
        stageclear(nowStage+1);
      }
    }
    if (textShow > 20 && textShow < 31) {

      
      if (textShow > 25) {
        signPlate();
        push();
        textSize(30);
        fill(150);
        text("[Red light, green light]",width/2,200);
        pop();
        text("The system variable that detects the key is being pressed and returns is ?",width/2,250);
        text("Answer: ",290,373);
      }
      if (textShow > 28 && textShow < 31) {
        push();
        for(let i=0; i<textIndex+1 && i<textArr[1].length; i++) {
          if (i == textIndex) {
            fill(255,0,0);
          } else {
            fill(0);
          }
          text(textArr[1][i],310+i*11+30,373);
          if (key == textArr[1][textIndex]) {
            s_type.play();
            textIndex++;
          } else if (textArr[1][textIndex] == ' ') {
            textIndex++;
          }
        }
        pop();
        if (textIndex > 0 && textShow == 29) {
            text("Wow, I'm getting letters!", bP.x+30, bP.y-25);
          }
        if (textIndex == textArr[1].length) {
          if (textShow == 29) {
            s_pop.play();
            textShow++;
          }
        }
      }
    }
  }
}

function sign() {
  push();
  stroke(0);
  strokeWeight(1);
  fill('rgb(243,238,211)');
  rect(width/2-25,height-75,50,25);
  rect(width/2-5,height-50,10,25);
  pop();
}

function signPlate() {
  push();
  stroke(0);
  strokeWeight(1);
  fill('rgb(243,238,211)');
  rect(50,110,700,350);
  pop();
}

class boxPlayer {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.eye = 0;
    this.Leye = this.x+14;
    this.Reye = this.x+50-14;
  }
  
  move() {
    this.x += ((keyIsDown(68)|keyIsDown(39)) - (keyIsDown(65)|keyIsDown(37)))*4;
    this.x = constrain(this.x, 0, width - 50);
  }
  
  display() {
    if (nowStage != 1 && eyemove == true) {
      if (((keyIsDown(68)|keyIsDown(39)) - (keyIsDown(65)|keyIsDown(37))) == 0) {
        this.Leye = this.x+14;
        this.Reye = this.x+36;
      } else if (keyIsDown(68)|keyIsDown(39)) {
        this.Leye = this.x+40;
        this.Reye = this.x+40;
      } else if (keyIsDown(65)|keyIsDown(37)) {
        this.Leye = this.x+10;
        this.Reye = this.x+10;
      }
    } else if (eyemove == true) {
      if (keyIsPressed && textShow == 3) {
        this.Leye = this.x+10;
        this.Reye = this.x+10;
      } else {
        this.Leye = this.x+14;
        this.Reye = this.x+36;
      }
    }
    
    push();
    fill(255);
    stroke(0);
    rect(this.x,this.y,50,50);
    fill(0);
    ellipse(this.Leye,this.y+21,5,this.eye);
    ellipse(this.Reye,this.y+21,5,this.eye);
    pop();
  }
}