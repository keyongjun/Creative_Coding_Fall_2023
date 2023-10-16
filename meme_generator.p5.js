// array to store meme image templates
let memes = [];
// variable to keep track of the currently displayed meme template
let currentMeme = 0;
// input box where users will type the meme text
let inputBox;

function preload() {
    // loop to preload meme templates into the memes array
    for (let i = 0; i < 3; i++) {
        // load each image and add to the memes array. The string template uses the loop's index to generate the filename.
        memes.push(loadImage(`meme${i}.jpeg`));
    }
}

function setup() {
    createCanvas(500, 500);
    
    // create an input text box for users to type in their meme text
    inputBox = createInput();
    // position the input box just below the canvas
    inputBox.position(10, height + 10);
    
    // create a button that will change the meme image
    let nextButton = createButton('Next Image');
    // position the button to the right of the input box
    nextButton.position(inputBox.x + inputBox.width + 10, height + 10);
    // attach a function (nextImage) that will be called when the button is pressed
    nextButton.mousePressed(nextImage);
}

function draw() {
    // This function is called repeatedly and is used to update the display.

    // Set a light gray background color
    background(220);
    
    // Display the currently selected meme template image
    image(memes[currentMeme], 0, 0, width, height);
    
    // Set the fill color for the text to black
    fill(0);
    // Set the text size to 24 pixels
    textSize(24);
    
    // Display the meme text typed by the user at the top center of the image
    text(inputBox.value(), width/2 - textWidth(inputBox.value())/2, 40);
    
    // Display the meme text typed by the user at the bottom center of the image
    text(inputBox.value(), width/2 - textWidth(inputBox.value())/2, height - 10);
}

function nextImage() {
    // Function to cycle through the meme templates.

    // Increment the currentMeme value, but use modulo to wrap around if we reach the end of the memes array
    currentMeme = (currentMeme + 1) % memes.length;
}
