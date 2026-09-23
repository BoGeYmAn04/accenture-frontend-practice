const bar = document.getElementById('progress-bar');
const label = document.getElementById('progress-label');
const track = document.querySelector('.progress');
const start = document.getElementById('start');

start.addEventListener('click', () => {
  bar.style.width = '100%';
  label.textContent = '100%';
  track.setAttribute('aria-valuenow', '100');
});
