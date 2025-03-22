/* -------------------------------------------------------
----------------------------------------------------------
1. SETTING UP THE CANVAS OBJECT 
-----------------------------------------------------------
--------------------------------------------------------- */

function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return ctx;
}

var my_canvas = document.getElementById('canvas');
var ctx = setupCanvas(my_canvas);

const CANVAS_HEIGHT = my_canvas.height = '150';
const CANVAS_WIDTH = my_canvas.width = '150';

/* -------------------------------------------------------
----------------------------------------------------------
2. THE ANIMATION LOOP
-----------------------------------------------------------
--------------------------------------------------------- */

const playerWalk = new Image();
playerWalk.src = 'spritesheets/walk.png';

const spriteHeight = 80;
const spriteWidth = 80;

let frameX = 0;
let frameY = 0;

const scaleX = 400;
const scaleY = 400;

const startingPosX = -120;
const startingPosY = -125;

let gameFrame = 0;
const staggerFrames = 15;

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //set the number of frames per animation
    let numberOfFrames = 7;
    //create a variable that only cycles between 0 and the frameNumber
    let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;
    //set frameX in relation to the position in the animation
    frameX = spriteWidth * position;

    ctx.drawImage(playerWalk, frameX , frameY , spriteWidth, spriteHeight, startingPosX, startingPosY, scaleX, scaleY);

    if (gameFrame % staggerFrames == 0) {
        if (frameX < 7) {
            frameX++;
        } else {
            frameX = 0;
        }
    }
    gameFrame++;

    requestAnimationFrame(animate);
};

animate();