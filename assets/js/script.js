import playList from "./playList.js";
const audio = new Audio();
const trackCards = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__icon_pause');
const player = document.querySelector('.player');
const stopBtn = document.querySelector('.player__icon_stop');
const prevBtn = document.querySelector('.player__icon_prev');
const nextBtn = document.querySelector('.player__icon_next');
const catalogContainer = document.querySelector('.catalog__container');
const playerProgressInput = document.querySelector('.player__progress-input');
const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');
const muteBtn = document.querySelector('.player__icon_mute');
const playerVolumeInput = document.querySelector('.player__volume-input');

const created = (data) => {
    const buttonItem = document.createElement('button');
    buttonItem.classList.add('catalog__item', 'track');
    buttonItem.setAttribute('data-track', data.src);
    catalogContainer.append(buttonItem);

    buttonItem.dataset.idTrack = data.id;

    const trackImg = document.createElement('div');
    trackImg.classList.add('track__img-wrap');
    buttonItem.append(trackImg);

    const trackPoster = document.createElement('img');
    trackPoster.classList.add('track__poster');
    trackPoster.setAttribute('src', data.img)
    trackPoster.width = 180;
    trackPoster.height = 180;
    trackPoster.alt = `${data.artist} - ${data.title}`
    trackImg.append(trackPoster);

    const trackInfo = document.createElement('div');
    trackInfo.classList.add('track__info');
    buttonItem.append(trackInfo);

    const trackTitle = document.createElement('p');
    trackTitle.classList.add('track__title');
    trackTitle.innerText = data.title;
    trackInfo.append(trackTitle);

    const trackArtist = document.createElement('p');
    trackArtist.classList.add('track__artist');
    trackArtist.innerText = data.artist;
    trackInfo.append(trackArtist);
}

const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');
    if (audio.paused) {
        audio.play();
        pauseBtn.classList.remove('player__icon_play');
        trackActive.classList.remove('track_pause');

    } else {
        audio.pause();
        pauseBtn.classList.add('player__icon_play')
        trackActive.classList.add('track_pause')
    }
}

const playMusic = event => {
    const trackActive = event.currentTarget;

    if (trackActive.classList.contains('track_active')) {
        pausePlayer();
        return;
    }
    let i;
    const id = trackActive.dataset.idTrack;
    const track = playList.find((item, index) => {
        i = index;
        return id === item.id;
    });
    audio.src = track.src;

    audio.play();

    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');

    const prevTrack = i === 0 ? playList.length - 1 : i - 1;
    const nextTrack =  i + 1 === playList.length ? 0 : i + 1;

    prevBtn.dataset.idTrack = playList[prevTrack].id;
    nextBtn.dataset.idTrack = playList[nextTrack].id;

    for (let i = 0; i < trackCards.length; i++) {
        if (id === trackCards[i].dataset.idTrack) {
            trackCards[i].classList.add('track_active');
        } else {
            trackCards[i].classList.remove('track_active');
        }
    }

}

const addHandlerTrack = () => {
    for (let i = 0; i < trackCards.length; i++) {
        trackCards[i].addEventListener(('click'), playMusic);
    }
}

for (let i = 0; i < trackCards.length; i++) {
    trackCards[i].addEventListener(('click'), playMusic);
}

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
    audio.src = '';
    player.classList.remove('player_active');
    document.querySelector('.track_active').classList.remove('track_active');
})

const updateTime = () => {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progress = (currentTime / duration) * 100;
    playerProgressInput.value = progress ? progress : 0;

    const minutesPasset = Math.floor(currentTime / 60 ) || '0';
    const secondssPasset = Math.floor(currentTime % 60 ) || '0';

    const minutesDuration = Math.floor(duration / 60 ) || '0';
    const secondssDuration = Math.floor(duration % 60 ) || '0';

    playerTimePassed.textContent = `${minutesPasset}:${secondssPasset < 10 ? '0' + secondssPasset : secondssPasset}`;
    playerTimeTotal.textContent = `${minutesDuration}:${secondssDuration < 10 ? '0' + secondssDuration : secondssDuration}`;


}

const renderCatalog = (dataList) => {
    catalogContainer.textContent = '';
    const listCards = dataList.map(created);
    addHandlerTrack();
}
let defaultVolume;
const init = () => {
    renderCatalog(playList);
    prevBtn.addEventListener(('click'), playMusic);
    nextBtn.addEventListener(('click'), playMusic);

    audio.addEventListener('ended', () => {
        nextBtn.dispatchEvent(new Event('click', {bubbles: true}));
    })

    audio.addEventListener('timeupdate', updateTime);

    playerProgressInput.addEventListener('change', () => {
        const progress = playerProgressInput.value;
        audio.currentTime = (progress / 100) * audio.duration;
    })
    playerVolumeInput.addEventListener('input', () => {
        const value = playerVolumeInput.value;
        audio.volume = value / 100;
    })
    muteBtn.addEventListener('click', () => {
        if (audio.volume) {
            defaultVolume = audio.volume;
            audio.volume = 0;
            muteBtn.classList.add('player__icon_mute-off');
            playerVolumeInput.value = 0;
        } else {
            audio.volume = defaultVolume;
            muteBtn.classList.remove('player__icon_mute-off');
            playerVolumeInput.value = audio.volume * 100;
        }
    })
};

init()


