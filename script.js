const songs = [
    { title: "Monica", artist: "Sublahshini, Anirudh Ravichander", file: "song1.mp3", cover: "https://img.youtube.com/vi/K3nRKezdDIM/maxresdefault.jpg" },
    { title: "Vibe Undi", artist: "Armaan Malik", file: "song2.mp3", cover: "https://img.youtube.com/vi/sUuLY8-LjKM/maxresdefault.jpg" },
    { title: "Om Namo Bhagavate Vasudevaya", artist: " Vijay Prakash", file: "song3.mp3", cover: "https://img.youtube.com/vi/Hn9VoVh0vvM/maxresdefault.jpg" },
    { title: "Kannala Kannala", artist: "Kaushik Krish & Padmalatha", file: "song4.mp3", cover: "https://img.youtube.com/vi/iHagLitT-nI/maxresdefault.jpg" }
];

const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const seek = document.getElementById('seek');
const currentTimeEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const volumeEl = document.getElementById('volume');


let current = 0;
let isShuffle = false;
let isRepeat = false;
let wasPlayingWhenLoadRequested = false;

function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    seconds = Math.floor(seconds);
    const m = Math.floor(seconds / 60);
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((s, i) => {
        const card = document.createElement('article');
        card.className = 'song-card';
        card.innerHTML = `
          <div class="thumbnail">${s.cover ? `<img src="${s.cover}" alt="cover" style="width:100%;height:100%;object-fit:cover;border-radius:8px">` : 'Cover'}</div>
          <div class="song-title">${s.title}</div>
          <div class="artist">${s.artist}</div>
        `;
        card.addEventListener('click', () => {
            current = i;
            loadCurrent(true);
        });
        playlistEl.appendChild(card);
    });
}


function loadCurrent(autoPlay = false) {
    // set source first
    audio.src = songs[current].file;
    titleEl.textContent = songs[current].title;
    artistEl.textContent = songs[current].artist;
    coverEl.src = songs[current].cover || '';

    seek.value = 0;
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';


    if (isFinite(audio.duration)) {
        durationEl.textContent = formatTime(audio.duration);
    }


    wasPlayingWhenLoadRequested = !!autoPlay;
}


function safeSetCurrentTimeFromSeek() {
    if (!isFinite(audio.duration)) return;
    const pct = Number(seek.value) / 100;
    audio.currentTime = pct * audio.duration;
}


audio.addEventListener('loadedmetadata', () => {
    if (isFinite(audio.duration)) {
        durationEl.textContent = formatTime(audio.duration);
    }
});


audio.addEventListener('canplaythrough', () => {
    if (isFinite(audio.duration)) {
        durationEl.textContent = formatTime(audio.duration);
    }

    if (wasPlayingWhenLoadRequested) {
        play();
        wasPlayingWhenLoadRequested = false;
    }
});


audio.addEventListener('timeupdate', () => {
    if (!isFinite(audio.duration)) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    seek.value = pct;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
    if (isRepeat) {
        play();
    } else {
        next();
    }
});

let seeking = false;
seek.addEventListener('input', () => {
    if (isFinite(audio.duration)) {
        const preview = (Number(seek.value) / 100) * audio.duration;
        currentTimeEl.textContent = formatTime(preview);
    }
});

seek.addEventListener('change', () => {
    safeSetCurrentTimeFromSeek();
});

function play() {
    const p = audio.play();
    if (p !== undefined) {
        p.then(() => { playBtn.textContent = '⏸'; }).catch(() => { playBtn.textContent = '▶'; });
    } else {
        playBtn.textContent = '⏸';
    }
}

function pause() {
    audio.pause();
    playBtn.textContent = '▶';
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audio.src || !isFinite(audio.duration)) {

            wasPlayingWhenLoadRequested = true;

            if (!audio.src) loadCurrent(true);
        }
        play();
    } else {
        pause();
    }
});

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', () => {
    if (audio.currentTime > 3) { audio.currentTime = 0; } else { prev(); }
});

function next() {
    if (isShuffle) current = Math.floor(Math.random() * songs.length);
    else current = (current + 1) % songs.length;
    loadCurrent(true);
}

function prev() {
    current = (current - 1 + songs.length) % songs.length;
    loadCurrent(true);
}

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('toggled', isShuffle);
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('toggled', isRepeat);
});

// volume
volumeEl.addEventListener('input', () => {
    const v = Number(volumeEl.value);
    audio.volume = isFinite(v) ? v : 1;
});

// keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); playBtn.click(); }
    if (e.code === 'ArrowRight') { audio.currentTime = Math.min((isFinite(audio.duration) ? audio.duration : Infinity), (audio.currentTime || 0) + 5); }
    if (e.code === 'ArrowLeft') { audio.currentTime = Math.max(0, (audio.currentTime || 0) - 5); }
});

// initialize
renderPlaylist();
loadCurrent(false);

// Expose some helpers for debugging in console
window._player = { audio, loadCurrent, play, pause, next, prev };
