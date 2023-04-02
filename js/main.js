let mute = false;
let click_sound = new Audio('audio/button.mp3');
let won = false;

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

    init();
}

function showCloseInfos() {
    document.getElementById('startScreen').classList.toggle('d-none');
    document.getElementById('infoContainer').classList.toggle('d-none');
    document.getElementById('audio').classList.toggle('invert');
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

function endScreeenWinLose() {
    let img = document.getElementById('win-loseImg');
    if(won) {
        img.src = 'img/9_intro_outro_screens/game_over/game over!_01.png';
    } else {
        img.src = 'img/9_intro_outro_screens/game_over/you lost_01.png';
    }
}