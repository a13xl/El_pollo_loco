let mute = false;
let click_sound = new Audio('audio/button.mp3');
let gameStarted = false;
let gameOver = false;

function pointOutBtn(contrast, opacity) {
    document.getElementById('startBackground').style.filter = `contrast(${contrast})`;
    document.getElementById('introBtn').style.filter = `opacity(${opacity})`;
}

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');

    if(!mute) {
        click_sound.play();
    }

    gameStarted = true;
    init();
}

function restartGame() {
    world = undefined;

    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('canvas').classList.remove('canvasEndscreen');
    document.getElementById('endScreen').classList.add('d-none');

    if(!mute) {
        click_sound.play();
    }

    gameStarted = false;
}

function showCloseInfos() {
    document.getElementById('startScreen').classList.toggle('d-none');
    document.getElementById('infoContainer').classList.toggle('d-none');
    document.getElementById('audio').classList.toggle('invert');

    document.getElementById('mobileControl').classList.toggle('d-none');
}

function toggleAudio() {
    let img = document.getElementById('audio');

    if(!mute) {
        img.src = 'img/icons/audio-off.png';
        mute = true;
    } else {
        img.src = 'img/icons/audio.png';
        mute = false;
    }
}

function finishGame(won) {
    let audio;
    let img = document.getElementById('win-loseImg');
    document.getElementById('canvas').classList.add('canvasEndscreen');
    document.getElementById('endScreen').classList.remove('d-none');

    if(won) {
        img.src = "img/9_intro_outro_screens/game_over/game over!_01.png";
        audio = new Audio('audio/win.mp3');
    } else {
        img.src = "img/9_intro_outro_screens/game_over/you lost_01.png";
        audio = new Audio('audio/lose.mp3');
    }

    playFinishSound(audio);
}

function playFinishSound(audio) {
    if(!mute) {
        audio.play();
        audio.volume = 0.2;
    }
}