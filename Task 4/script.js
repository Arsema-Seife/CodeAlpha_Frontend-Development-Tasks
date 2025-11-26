const audio = document.createElement('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const coverContainer = document.querySelector('.cover-container');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const playlistDiv = document.getElementById('playlist');
const fileInput = document.getElementById('fileInput');

let songs = [];
let currentSong = 0;

// Cover images
const coverImages = [
  "images/image1.jpg",
  "images/image2.jpg",
  "images/image3.jpg",
  "images/image4.jpg",
  "images/image5.jpg",
  "images/image6.jpg"
];

let coverIndex = 0;

// Create img elements for slideshow
coverImages.forEach((src, index) => {
  const img = document.createElement('img');
  img.src = src;
  if(index === 0) img.classList.add('active');
  coverContainer.appendChild(img);
});

const coverImgs = coverContainer.querySelectorAll('img');

// Start slideshow
setInterval(() => {
  coverImgs.forEach(img => img.classList.remove('active'));
  coverImgs[coverIndex].classList.add('active');
  coverIndex = (coverIndex + 1) % coverImgs.length;
}, 2000); // every 2 seconds

// Upload songs
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    const song = {
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Unknown Artist",
      src: url
    };
    songs.push(song);

    const btn = document.createElement('button');
    btn.textContent = song.title;
    btn.onclick = () => {
      currentSong = songs.indexOf(song);
      loadSong(currentSong);
      audio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      highlightPlaying();
    };
    playlistDiv.appendChild(btn);
  });

  if (songs.length === files.length) {
    loadSong(0);
    highlightPlaying();
  }
});

// Load song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

// Highlight currently playing
function highlightPlaying() {
  const buttons = playlistDiv.querySelectorAll('button');
  buttons.forEach((btn, idx) => {
    btn.style.background = idx === currentSong ? "#ff3399" : "#ff66b3";
  });
}

// Controls
function playPause() {
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i> Play';
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  highlightPlaying();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  highlightPlaying();
}

// Event listeners
playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

audio.addEventListener('ended', nextSong);
