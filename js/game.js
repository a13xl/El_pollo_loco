let canvas;
let world;
let keyboard = new Keyboard();

/**
 * set and load canvas and load mobile buttons
 */
function init() {
    canvas = document.getElementById('canvas');

    initLvl();
    world = new World(canvas, keyboard);
    mobileButtonsPressed();
    mobileButtonsReleased();
    //console.log('My Character is', world.character);
}

/**
 * action when button pressed
 */
window.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
        default:
            break;
    }
});

/**
 * action when button released
 */
window.addEventListener("keyup", (e) => {

    switch (e.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
        default:
            break;
    }
});

/**
 * action when touchbuttons pressed
 */
function mobileButtonsPressed() {
    document.getElementById('keypressLeft').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });
    
    document.getElementById('keypressRight').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });
     
    document.getElementById('keypressThrow').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.D = true;
    });
    
    document.getElementById('keypressUp').addEventListener('touchstart', (e) => {
      e.preventDefault();
      keyboard.UP = true;
    });
}

/**
 * action when touchbuttons released
 */
function mobileButtonsReleased() {
    document.getElementById('keypressUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('keypressThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

    document.getElementById('keypressRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('keypressLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}