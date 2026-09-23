const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

function show(i) {
  index = (i + slides.length) % slides.length;

  slides.forEach((slide, si) => slide.classList.toggle('active', si === index));
  dots.forEach((dot, di) => dot.classList.toggle('active', di === index));
}

next.addEventListener('click', () => show(index + 1));
prev.addEventListener('click', () => show(index - 1));

dots.forEach((dot) => {
  dot.addEventListener('click', () => show(Number(dot.dataset.index)));
});

show(0);
