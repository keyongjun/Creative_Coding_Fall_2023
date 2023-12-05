function display_state() {
  if (state==0) {
    if (mouseX > 185 && mouseX < 185 + 434 && mouseY > 99 + 175 && mouseY < 99 + 333 + 175) {
      state = 1;
    } else {
      if (mouseX > 125 && mouseX < 125 + 434 + 120 && mouseY > 66  + 175&& mouseY < 66 + 333 + 66 + 175) {
        image(lt2,0,175,800,450);
      } else if (mouseX > 65 && mouseX < 65 + 434 + 240 && mouseY > 33 + 175 && mouseY < 33 + 333 + 132 + 175) {
        image(lt3,0,175,800,450);
      } else {
        image(lt4,0,175,800,450);
      }
    }
  }
  
  if (state==1) {
    image(lt1,0,175,800,450);
    lapIn = lapIn + 1;
    p = "Graphics";
    text_display();
    if (lapIn > 240) {
      push();
      let ps = 50;
      let bx = 303;
      let by = 338;
      translate(bx, by+20);
      angleMode(DEGREES);
      rotate(354);
      if (mouseX > 300 && mouseX < 357 && mouseY > 353 && mouseY < 407) {
        fill(100);
        stroke(50);
        if (menu_sound == false) {
          menu_sound = true;
        }
      } else {
        fill(227);
        stroke(255);
        menu_sound = false;
      }
      square(0,0,ps);
      triangle(ps/3,ps/3,ps/3,ps*2/3,ps*2/3,ps/2);
      pop();
      
    }
  }
  
  if (state==2 && game == false) {
    //drawing button
    push();
    fill(0);
    textSize(60);
    textStyle(BOLD);
    text("Stage", 400, 200);
    pop(); 
    strokeWeight(2);
    for(let i=0;i<stage.length;i++) { //draws button
      stage[i].b_draw();
    }  
  }
  
  if (nowStage == 0 && game == true) {
    if (gamestop == false) {
      hellobox();
    } else {
      if (clearS == false) {
        s_clear.play();
        clearS = true;
      }
      drawStageBox();
    }
  } else if (nowStage == 1 && game == true) {
    background(212,200,150);
    line(180,0,180,800);
    if (gamestop == false) {
      bP2.display();
      man001s();
      if (textShow == 0) {
        s_pop.play();
        textShow++;
      } else if (textShow == 1) {
        push();
        fill(0);
        noStroke();
        textStyle(BOLD);
        textSize(20);
        textAlign(RIGHT);
        text("The lights are back on!", bP2.x+30, bP2.y-25);
        pop();
      } else if (textShow == 2) {
        push();
        fill(0);
        noStroke();
        textStyle(BOLD);
        textSize(20);
        textAlign(RIGHT);
        text("By the way, who is the sir next to you?", bP2.x+30, bP2.y-25);
        pop();
      } else if (textShow == 3) {
        if (bP2.x > 700) {
          push();
          fill(0);
          noStroke();
          textStyle(BOLD);
          textSize(20);
          textAlign(RIGHT);
          text("Let's go!", bP2.x+30, bP2.y-25);
          pop();
        }
        time0(); //timer display and time related
        count += 1;
        timer += 1;
      }
    } else {
      s_moo1.stop();
      s_moo2.stop();
      s_moo3.stop();
      if (clearS == false) {
        s_clear.play();
        clearS = true;
      }
      drawStageBox();
    }
  } else if (nowStage == 2 && game == true) {
    if (gamestop == false) {
      if (textShow >= 0 && textShow <= 3) {
        background(100);
        bP3.display();
        sign();
        signPlate();
        push();
        noStroke();
        fill(0);
        rect(0, height-25, width, 25);
        pop();
        push();
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(30);
        fill(150);
        text("[Dodge game]",width/2,200);
        textSize(20);
        fill(0);
        text("How to create an object named avoidRect?",width/2,250);
        text("Answer: ",290,373);
        pop();
      }
      push();
      fill(0);
      noStroke();
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      if (textShow == 0) {
        s_pop.play();
        textShow++;
      } else if (textShow == 1) {
        text("Here you are!", bP3.x+30, bP3.y-25);
      } else if (textShow == 3) {
        text("Is this correct again?", bP3.x+30, bP3.y-25);
      } else if (textShow == 4) {
        background(0);
        textShow++;
      } else if (textShow == 5) {
        background(0);
        fill(255);
        textSize(30);
        text("It's too dark!!", bP3.x+30, bP3.y-25);
      }
      pop();
      if (textShow >= 2 && textShow < 4) {
        if (textShow > 1) {
          push();
          fill(0);
          noStroke();
          textStyle(BOLD);
          textSize(20);
          textAlign(CENTER);
          for(let i=0; i<textIndex+1 && i<textArr[2].length; i++) {
            if (i == textIndex) {
              fill(255,0,0);
            } else {
              fill(0);
            }
            text(textArr[2][i],310+i*11+30,373);
            if (key == textArr[2][textIndex]) {
              s_type.play();
              textIndex++;
            } else if (textArr[2][textIndex] == ' ') {
              textIndex++;
            }
          }
          fill(0);
          if (textIndex > 0 && textShow == 2) {
            text("It's fascinating to watch it again!!", bP3.x+30, bP3.y-25);
          } else if (textIndex == 0 && textShow == 2) {
            text("No matter how much I look at it, I don't know what this is!!!", bP3.x+30, bP3.y-25);
          }
          pop();
          if (textIndex == textArr[2].length) {
            if (textShow == 2) {
              s_pop.play();
              textShow++;
            }
          }
        }
      }
      if (textShow == 6) {
        gameOn();
      }
    } else {
      background(0);
      if (clearS == false) {
        s_clear.play();
        clearS = true;
      }
      drawStageBox();
    }
  }
}