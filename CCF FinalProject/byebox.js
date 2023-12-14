function byebox() {
    if (textShow < 15) {
      if (textShow >= 0) {
        push();
        sign();
        background('rgb(15,232,248)');
        bP4.display();
        sign();
        noStroke();
        fill('green');
        rect(0, height-25, width, 25);
        pop();
      }
      if (textShow >= 5 && textShow < 12) {
        signPlate();
        push();
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(30);
        fill(150);
        text("/*[memo]*/",width/2,200);
        textSize(20);
        fill(0);
        text("//I'm going to change my image, I've deleted it now.",width/2,250);
        pop();
      }
      if (textShow >= 12) {
          image(i_house,400,335);
      }
      push();
      fill(0);
      noStroke();
      textStyle(BOLD);
      textSize(20);
      textAlign(CENTER);
      if (textShow == 0) {
        textShow ++;
        s_pop.play();
      } else if (textShow == 1) {
        eyemove = false;
        bP4.Leye = bP4.x+40;
        bP4.Reye = bP4.x+40;
        text("Here is my house!", bP4.x+30, bP4.y-25);
        if (bP4.x < 200) {
          bP4.x += 2;
        }
      } else if (textShow == 2) {
        eyemove = true;
        bP4.x = 200;
        text("...but what is this?", bP4.x+30, bP4.y-25);
      } else if (textShow == 3) {
        text("There is only one sign here, too.", bP4.x+30, bP4.y-25);
      } else if (textShow == 4) {
        text("Can we take a look at it?", bP4.x+30, bP4.y-25);
        bP4.move();
        push();
        noStroke();
        fill(0,255,0);
        rect(width/2-25,height-25,50,10);
        pop();
        if (bP4.x + 50 >= width/2+25) {
          textShow++;
        }
      } else if (textShow == 5) {
        text("Nothing is written here...?", bP4.x+30, bP4.y-25);
      } else if (textShow == 6) {
        text("So there's nothing I can do here...?", bP4.x+30, bP4.y-25);
      } else if (textShow == 7) {
        push();
        textSize(30);
        text("Why did my house disappear?!?!", bP4.x+30, bP4.y-25);
        pop();
      } else if (textShow == 8) {
        text("Where is my nice house?", bP4.x+30, bP4.y-25);
      } else if (textShow == 9) {
        text("The roof was marked with 'i_house...' and...", bP4.x+30, bP4.y-25);
      } else if (textShow == 10) {
        text("When someone told me the location of my house,\n the guy called it in a very unique way...", bP4.x+30, bP4.y-25);
      } else if (textShow == 11) {
        push();
        for(let i=0; i<textIndex+1 && i<textArr[5].length; i++) {
          if (i == textIndex) {
            fill(255,0,0);
          } else {
            fill(0);
          }
          text(textArr[5][i],310+i*11-20,373);
          if (key == textArr[5][textIndex]) {
            s_type.play();
            textIndex++;
          } else if (textArr[5][textIndex] == ' ') {
            textIndex++;
          }
        }
        pop();
        if (textIndex > 0) {
          text("Are we supposed to write on a blank sign...?", bP3.x+30, bP3.y-25);
        } else if (textIndex == 0) {
          text("It is marked with 400, 335... is this some kind of code..?", bP4.x+30, bP4.y-25);
        }
        if (textIndex == textArr[5].length) {
          if (textShow == 11) {
            s_pop.play();
            textShow++;
          }
        }
      } else if (textShow == 12) {
        text("Wow, that is my house!!", bP4.x+30, bP4.y-25);
        eyemove = false;
        bP4.Leye = bP4.x+40;
        bP4.Reye = bP4.x+40;
        if (bP4.x + 50 < width/2+50) {
           bP4.x += 2;
        }
      } else if (textShow == 13) {
        eyemove = true;
        if (bP4.x + 50 < width/2+150) {
           bP4.x += 2;
        } else {
          textShow ++;
        }
        text("Thank you!!", bP4.x+30, bP4.y-25);
      } else if (textShow == 14) {
        bP4.x = width/2 + 100;
        push();
        textSize(50);
        text("Meanwhile", width/2, height/2);
        pop();
      }
    } else {
      if (textShow == 15) {
        image(i_end1,0,0);
      } else if (textShow == 16) {
        image(i_end2,0,0);
      } else if (textShow == 17) {
        image(i_end3,0,0);
      } else if (textShow == 18) {
        push();
        textSize(100);
        text("THE END",width/2,height/2);
        pop();
      } else if (textShow == 19) {
        image(i_credit,0,0,800,800);
      }
    }
  }