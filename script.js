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

//add spritesheets
const playerWalk = new Image();
playerWalk.src = 'spritesheets/walk.png';

const playerDeath = new Image();
playerDeath.src = 'spritesheets/death.png';

//necessary variables
const spriteHeight = 80;
const spriteWidth = 80;
const scaleX = 400;
const scaleY = 400;
const startingPosX = -120;
const startingPosY = -125;

let gameFrame = 0;
let staggerFrames = 15;
let playerState = 'walk right'

//Create arrays to store the maps for each spritesheet
const spriteAnimationsWalk = [];
const spriteAnimationsDeath = [];

//Create variables that can change the spritesheet and array map
let spriteAnimation = spriteAnimationsWalk;
let playerMove = playerWalk;

//create an object array for each sheet with the animation names and frames
const animationStatesWalk = [
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
const animationStatesDeath = [
    {
        name: 'death right',
        frames: 6,
    },
    {
        name: 'death down',
        frames: 6,
    },
    {
        name: 'death up',
        frames: 6,
    }
]

//map out each animation frame's position on the spritesheet into an array (do this for each spritesheet)
animationStatesWalk.forEach(function (singleAnimation, i) {
    let frames = {
        location: [],
    }
    for (let j = 0; j < singleAnimation.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = i * spriteHeight;
        frames.location.push({ x: positionX, y: positionY });
    }
    spriteAnimationsWalk[singleAnimation.name] = frames;
});

animationStatesDeath.forEach(function (singleAnimation, i) {
    let frames = {
        location: [],
    }
    for (let j = 0; j < singleAnimation.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = i * spriteHeight;
        frames.location.push({ x: positionX, y: positionY });
    }
    spriteAnimationsDeath[singleAnimation.name] = frames;
});

//animation function
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let numberOfFrames = spriteAnimation[playerState].location.length;

    let position = Math.floor(gameFrame / staggerFrames) % numberOfFrames;

    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].location[position].y;

    ctx.drawImage(playerMove, frameX, frameY, spriteWidth, spriteHeight, startingPosX, startingPosY, scaleX, scaleY);

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

/* -------------------------------------------------------
----------------------------------------------------------
3. TRIGGERING THE ANIMATION
-----------------------------------------------------------
--------------------------------------------------------- */

//add functions to set the sprite map, spritesheet, and animation name
function walkDown() {
    spriteAnimation = spriteAnimationsWalk;
    playerMove = playerWalk;
    playerState = 'walk down';
}
function walkUp() {
    spriteAnimation = spriteAnimationsWalk;
    playerMove = playerWalk;
    playerState = 'walk up';
}
function walkRight() {
    spriteAnimation = spriteAnimationsWalk;
    playerMove = playerWalk;
    playerState = 'walk right';
}

function deathDown() {
    spriteAnimation = spriteAnimationsDeath;
    playerMove = playerDeath;
    playerState = 'death down';
}
function deathUp() {
    spriteAnimation = spriteAnimationsDeath;
    playerMove = playerDeath;
    playerState = 'death up';
}
function deathRight() {
    spriteAnimation = spriteAnimationsDeath;
    playerMove = playerDeath;
    playerState = 'death right';
}

/* -------------------------------------------------------
----------------------------------------------------------
4. SPEED CONTROL
-----------------------------------------------------------
--------------------------------------------------------- */
const sliderInput = document.getElementById('sliderSpeed');

sliderInput.addEventListener('change', function () {
    staggerFrames = this.value;
});