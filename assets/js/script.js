const audio = new Audio();
const trackCards = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__icon_pause');

const playMusic = url => {
    audio.src = url;
    audio.play();
}

for (let i = 0; i < trackCards.length; i++) {
    trackCards[i].addEventListener('click', playMusic)
} 

pauseBtn.addEventListener('click', () => {
    playMusic('assets/audio/09Two Feet - Grey.mp3')
})
