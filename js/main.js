let mute = false;

function pointOutBtn(contrast, opacity) {
    document.getElementById('start-end_background').style.filter = `contrast(${contrast})`;
    document.getElementById('introOutroBtn').style.filter = `opacity(${opacity})`;
}

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');

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