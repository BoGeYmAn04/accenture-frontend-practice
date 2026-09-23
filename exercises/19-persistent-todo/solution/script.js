const STORAGE_KEY = 'accenture-notes';

const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes');
const emptyEl = document.getElementById('empty');
const clearBtn = document.getElementById('clear');

let notes = loadNotes();

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
  list.innerHTML = '';

  notes.forEach((note) => {
    const li = document.createElement('li');
    li.className = 'note';

    const span = document.createElement('span');
    span.textContent = note.text;

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'note-delete';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      notes = notes.filter((item) => item.id !== note.id);
      saveNotes();
      render();
    });

    li.append(span, del);
    list.appendChild(li);
  });

  emptyEl.hidden = notes.length > 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  notes.push({ id: `${Date.now()}-${Math.random()}`, text });
  input.value = '';
  saveNotes();
  render();
});

clearBtn.addEventListener('click', () => {
  notes = [];
  saveNotes();
  render();
});

render();
