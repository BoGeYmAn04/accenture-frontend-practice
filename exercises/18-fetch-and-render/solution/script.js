const loadBtn = document.getElementById('load');
const statusEl = document.getElementById('status');
const usersEl = document.getElementById('users');

async function loadUsers() {
  statusEl.textContent = 'Loading...';
  statusEl.classList.remove('error');
  usersEl.innerHTML = '';

  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const users = await response.json();

    for (const user of users) {
      const li = document.createElement('li');
      li.className = 'user';
      li.innerHTML = `<strong>${user.name}</strong><span>${user.email}</span>`;
      usersEl.appendChild(li);
    }

    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = 'Something went wrong while loading users.';
    statusEl.classList.add('error');
  }
}

loadBtn.addEventListener('click', loadUsers);
