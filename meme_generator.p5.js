// array to hold the meme image templates
let memes = [];
// variable to keep track of the currently displayed meme template
let currentMeme = 0;
// input box where users will type the meme text
let inputBox;

function preload() {

    for (let i = 0; i < 3; i++) {
        // load each image and add to the memes array. The template string uses the loop's index to generate the filename.
        memes.push(loadImage(`meme${i}.jpeg`));
    }
}

function setup() {
    createCanvas(500, 500);

    // create an input text box for users to type in their meme text
    inputBox = createInput();
    // position the input box just below the canvas
    inputBox.position(10, height + 10);

    // create a button that lets users change to the next meme image
    let nextButton = createButton('Next Image');
    // position the button to the right of the input box
    nextButton.position(inputBox.x + inputBox.width + 10, height + 10);
    // attach a function (nextImage) to be called when the button is pressed
    nextButton.mousePressed(nextImage);
}

function draw() {
    background(220);

    // display the current meme template image on the canvas
    image(memes[currentMeme], 0, 0, width, height);

    fill(0);
    // set the text size to 24 pixels
    textSize(24);

    // get the text from the input box and display it at the top center of the image
    text(inputBox.value(), width/2 - textWidth(inputBox.value())/2, 40);

    // display the same text at the bottom center of the image
    text(inputBox.value(), width/2 - textWidth(inputBox.value())/2, height - 10);
}

function nextImage() {

    // increment the current meme index. If it reaches the end of the array, wrap it back to 0.
    currentMeme = (currentMeme + 1) % memes.length;
}
