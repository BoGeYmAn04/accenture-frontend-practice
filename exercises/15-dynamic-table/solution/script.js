const employees = [
  { name: 'Grace Hopper', age: 45, city: 'New York' },
  { name: 'Ada Lovelace', age: 36, city: 'London' },
  { name: 'Alan Turing', age: 41, city: 'Manchester' },
  { name: 'Linus Torvalds', age: 54, city: 'Helsinki' },
  { name: 'Margaret Hamilton', age: 33, city: 'Boston' },
  { name: 'Dennis Ritchie', age: 62, city: 'Murray Hill' },
];

const filterInput = document.getElementById('filter');
const sortNameBtn = document.getElementById('sort-name');
const sortAgeBtn = document.getElementById('sort-age');
const tbody = document.getElementById('table-body');
const rowCount = document.getElementById('row-count');

const state = { query: '', sort: null };

function getView() {
  const q = state.query.trim().toLowerCase();

  let rows = employees.filter((emp) => {
    if (q === '') return true;
    return emp.name.toLowerCase().includes(q) || emp.city.toLowerCase().includes(q);
  });

  if (state.sort === 'name') {
    rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === 'age') {
    rows = [...rows].sort((a, b) => a.age - b.age);
  }

  return rows;
}

function render() {
  const rows = getView();

  tbody.innerHTML = '';
  for (const emp of rows) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${emp.name}</td><td>${emp.age}</td><td>${emp.city}</td>`;
    tbody.appendChild(tr);
  }

  rowCount.textContent = `${rows.length} ${rows.length === 1 ? 'employee' : 'employees'}`;
}

filterInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  render();
});

sortNameBtn.addEventListener('click', () => {
  state.sort = 'name';
  render();
});

sortAgeBtn.addEventListener('click', () => {
  state.sort = 'age';
  render();
});

render();
