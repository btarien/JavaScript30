const video = document.querySelector('.viewer');
const playBtn = document.querySelector('.toggle');
const skipBtns = document.querySelectorAll('[data-skip]');
const sliders = document.querySelectorAll('.player__slider');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const fullscreen = document.querySelector('.fullscreen');


function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateToggleBtn(e) {
  playBtn.innerText = video.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

function adjustRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  video.currentTime = video.duration * (e.offsetX / progress.offsetWidth);
}

function toggleFullscreen() {
  video.requestFullscreen();
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleBtn);
video.addEventListener('pause', updateToggleBtn);
video.addEventListener('timeupdate', handleProgress);
skipBtns.forEach(skipBtn => {
  skipBtn.addEventListener('click', skip);
})
sliders.forEach(slider => {
  slider.addEventListener('change', adjustRange)
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', toggleFullscreen);
