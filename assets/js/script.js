const audio = new Audio();
const trackCards = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__icon_pause');
const player = document.querySelector('.player');
const stopBtn = document.querySelector('.player__icon_stop');

const playMusic = event => {
    const trackActive = event.currentTarget;

    audio.src = trackActive.dataset.track;
    player.classList.add('player_active')
    audio.play();
    pauseBtn.classList.remove('player__icon_play');

    for (let i = 0; i < trackCards.length; i++) {
        trackCards[i].classList.remove('track_active');
    }
    trackActive.classList.add('track_active');
}

for (let i = 0; i < trackCards.length; i++) {
    trackCards[i].addEventListener(('click'), playMusic);
}

pauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        pauseBtn.classList.remove('player__icon_play');
        pauseBtn.classList.add('player__icon_pause');
    } else {
        audio.pause();
        pauseBtn.classList.remove('player__icon_pause');
        pauseBtn.classList.add('player__icon_play');
    }
});

stopBtn.addEventListener('click', () => {
    if (audio.played) {
        audio.pause();
        audio.currentTime = 0;
        pauseBtn.classList.remove('player__icon_pause');
        pauseBtn.classList.add('player__icon_play');
        player.classList.remove('player_active');
    }
})