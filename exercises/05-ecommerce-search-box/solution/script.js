const products = [
  'Apple iPhone',
  'Apple MacBook',
  'Apple Watch',
  'Samsung Galaxy',
  'Sony Headphones',
  'Dell XPS Laptop',
  'Google Pixel',
  'Xiaomi Redmi',
];

const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');
const countEl = document.getElementById('count');
const emptyEl = document.getElementById('empty');

function render(query) {
  const q = query.trim().toLowerCase();
  const matches = q === '' ? products : products.filter((p) => p.toLowerCase().includes(q));

  resultsList.innerHTML = '';
  for (const name of matches) {
    const li = document.createElement('li');
    li.className = 'result-item';
    li.textContent = name;
    resultsList.appendChild(li);
  }

  countEl.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'}`;

  const noMatch = q !== '' && matches.length === 0;
  emptyEl.hidden = !noMatch;
  resultsList.hidden = noMatch;
}

searchInput.addEventListener('input', (event) => render(event.target.value));

render('');
