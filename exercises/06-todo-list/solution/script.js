const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyEl = document.getElementById('empty');

function refreshEmpty() {
  emptyEl.hidden = list.children.length > 0;
}

function createTodo(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'todo-toggle';
  toggle.textContent = 'Done';
  toggle.addEventListener('click', () => li.classList.toggle('completed'));

  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'todo-delete';
  del.textContent = 'Delete';
  del.addEventListener('click', () => {
    li.remove();
    refreshEmpty();
  });

  li.append(span, toggle, del);
  return li;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  list.appendChild(createTodo(text));
  input.value = '';
  input.focus();
  refreshEmpty();
});

refreshEmpty();
