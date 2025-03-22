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
const scaleX = 400;
const scaleY = 400;
const startingPosX = -120;
const startingPosY = -125;
let gameFrame = 0;
const staggerFrames = 15;

// create an empty array to hold the data for all the different animations
const spriteAnimations = [];

//create a variable that stores the names and number of frames for each animation
const animationStates = [
    {
        name: 'walk right',
        frames: 8,
    },
    {
        name: 'walk down',
        frames: 8,
    },
    {
        name: 'walk up',
        frames: 8,
    }
]

//create a function that maps out each animation frame's position on the spritesheet into an array
animationStates.forEach(function (singleAnimation, index) {
    let frames = {
        location: [],
    }
    for (let j = 0; j < singleAnimation.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.location.push({ x: positionX, y: positionY });
    }
    spriteAnimations[singleAnimation.name] = frames;
});

//add a variable to the animate function that can be used to trigger each animation by name
function animate(animationName) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //use the array map to find the number of frames for the chosen animation
    let numberOfFrames = spriteAnimations[animationName].location.length;

    let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;

    // create variables that will change based on the animation's height and frame number position
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[animationName].location[position].y;

    ctx.drawImage(playerWalk, frameX , frameY , spriteWidth, spriteHeight, startingPosX, startingPosY, scaleX, scaleY);

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();