const form = document.getElementById('signup');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const formMsg = document.getElementById('form-msg');

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function validate() {
  const errors = {
    username: '',
    email: '',
    password: '',
  };

  if (username.value.trim() === '') {
    errors.username = 'Username is required.';
  }

  if (email.value.trim() === '') {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(email.value.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (password.value === '') {
    errors.password = 'Password is required.';
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  usernameError.textContent = errors.username;
  emailError.textContent = errors.email;
  passwordError.textContent = errors.password;

  return !errors.username && !errors.email && !errors.password;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validate()) {
    formMsg.textContent = 'Account created successfully.';
    form.reset();
  } else {
    formMsg.textContent = '';
  }
});
