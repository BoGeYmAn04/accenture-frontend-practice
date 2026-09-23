const input = document.getElementById('password');
const toggle = document.getElementById('toggle-password');

toggle.addEventListener('click', () => {
  const isMasked = input.type === 'password';
  input.type = isMasked ? 'text' : 'password';
  toggle.textContent = isMasked ? 'Hide' : 'Show';
  toggle.setAttribute('aria-pressed', String(isMasked));
});
