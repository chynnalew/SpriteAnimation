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
//set the initial staggerFrames speed (changes with a slider input)
let staggerFrames = 15;
//set the initial player state (changes with click functions)
let playerState = 'walk right'

const spriteAnimations = [];

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

//map out each animation frame's position on the spritesheet into an array
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

//animation function
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let numberOfFrames = spriteAnimations[playerState].location.length;

    let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;

    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].location[position].y;

    ctx.drawImage(playerWalk, frameX , frameY , spriteWidth, spriteHeight, startingPosX, startingPosY, scaleX, scaleY);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

/* -------------------------------------------------------
----------------------------------------------------------
3. TRIGGERING THE ANIMATION
-----------------------------------------------------------
--------------------------------------------------------- */

function walkDown() {
    playerState = 'walk down';
}
function walkUp() {
    playerState = 'walk up';
}
function walkRight() {
    playerState = 'walk right';
}

/* -------------------------------------------------------
----------------------------------------------------------
4. SPEED CONTROL
-----------------------------------------------------------
--------------------------------------------------------- */
const sliderInput = document.getElementById('sliderSpeed');

sliderInput.addEventListener('change', function () {
    staggerFrames = this.value;
    console.log(staggerFrames);
});