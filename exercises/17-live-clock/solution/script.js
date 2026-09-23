const clock = document.getElementById('clock');

function pad(value) {
  return String(value).padStart(2, '0');
}

function tick() {
  const now = new Date();
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  clock.textContent = `${hh}:${mm}:${ss}`;
}

tick();
setInterval(tick, 1000);
