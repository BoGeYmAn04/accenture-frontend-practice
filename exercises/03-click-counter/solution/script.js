const countEl = document.getElementById('count');
const incrementBtn = document.getElementById('increment');
const resetBtn = document.getElementById('reset');

let count = 0;

function render() {
  countEl.textContent = String(count);
}

incrementBtn.addEventListener('click', () => {
  count += 1;
  render();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  render();
});
