/* ---------------------------
------------------------------
1. SETTING UP THE CANVAS OBJECT 
-------------------------------
----------------------------- */

/* --
Function to create the canvas object and keep lines sharp when the image is scaled up (ex: when the browser is zoomed in)
-- */
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

/* --
Target the canvas element from index.html and set up the canvas object using our above function
-- */
var canvas1 = document.getElementById('canvas');
var ctx = setupCanvas(canvas1);

/* --
You can view the canvas properties in the console with the function:
console.log(ctx);
-- */

/* ---------------------------
------------------------------
2. THE ANIMATION LOOP
-------------------------------
----------------------------- */