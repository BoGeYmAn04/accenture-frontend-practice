const form = document.getElementById('signup');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('fullname').value.trim();
  document.getElementById('result').textContent =
    `Thanks, ${name}! Your account was created.`;
});
