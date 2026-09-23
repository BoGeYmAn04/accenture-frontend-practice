const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
});
