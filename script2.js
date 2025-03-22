/* -------------------------------------------------------
----------------------------------------------------------
1. SETTING UP THE CANVAS OBJECT 
-----------------------------------------------------------
--------------------------------------------------------- */

/* ---------------------------
Function to create the canvas object and keep lines sharp when the image is scaled up (ex: when the browser is zoomed in)
--------------------------- */
function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

/* ---------------------------
Target the canvas element from index.html and set up the canvas object using our above function
--------------------------- */
var my_canvas = document.getElementById('canvas');
var ctx = setupCanvas(my_canvas);

/* ---------------------------
Set the height and width of the canvas as global variables. (use the same values set in the canvas element in index.html)
These will be used in our animation function.
--------------------------- */
const CANVAS_HEIGHT = my_canvas.height = '150';
const CANVAS_WIDTH = my_canvas.width = '150';

/* -------------------------------------------------------
----------------------------------------------------------
2. THE ANIMATION LOOP
-----------------------------------------------------------
--------------------------------------------------------- */

/* ---------------------------
Create the image constructor variable and set it to the desired spritesheet
--------------------------- */
const playerWalk = new Image();
playerWalk.src = 'spritesheets/walk.png';

/* ---------------------------
Set the necessary variables
--------------------------- */

// Set the width and height of a single sprite frame
// height = (spritesheet pixel height) / (number of rows)
// width = (spritesheet pixel width) / (number of columns)
const spriteHeight = 80;
const spriteWidth = 80;

//Create variables that will be used to move from frame to frame. Set these to start at 0
let frameX = 0;
let frameY = 0;

//Set variables to scale the sprite to the correct size for the canvas (set these to spriteWidth and spriteHeight if you want to maintain the original size)
const scaleX = 400;
const scaleY = 400;

// Set variables to set the starting position on the spritesheet
const startingPosX = -120;
const startingPosY = -125;

// Create variables to control animation speed
let gameFrame = 0;
const staggerFrames = 15;

/* ---------------------------
Create the animation function
--------------------------- */
function animate() {
    //start by clearing out the whole canvas rectangle between each animation frame
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //pull in and scale the spritesheet with drawImage. Now's the time to use all those variables!
    ctx.drawImage(playerWalk, frameX * spriteWidth, frameY * spriteWidth, spriteWidth, spriteHeight, startingPosX, startingPosY, scaleX, scaleY);

    //create a parent conditional to control the animation speed - the staggerFrames number controls how much time passes between each image change
    if (gameFrame % staggerFrames == 0) {
        //create a conditional to loop through only the specific frames you need for the animation
        if (frameX < 7) {
            frameX++;
        } else {
            frameX = 0;
        }
    }
    gameFrame++;

    //call the parent function to form an animation loop
    requestAnimationFrame(animate);
};

/* ---------------------------
Call the animation function
--------------------------- */
animate();