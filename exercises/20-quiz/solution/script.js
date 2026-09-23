const questions = [
  {
    question: 'Which HTML tag creates a hyperlink?',
    options: ['<a>', '<link>', '<href>'],
    answer: 0,
  },
  {
    question: 'Which CSS property changes the text colour?',
    options: ['font', 'color', 'text-style'],
    answer: 1,
  },
  {
    question: 'Which keyword declares a block-scoped variable?',
    options: ['var', 'let', 'function'],
    answer: 1,
  },
];

const quizEl = document.getElementById('quiz');
const scoreEl = document.getElementById('score');
const progressEl = document.getElementById('progress');
const questionTextEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');

let current = 0;
let score = 0;
let selected = null;

function renderQuestion() {
  const item = questions[current];
  selected = null;
  nextBtn.disabled = true;

  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionTextEl.textContent = item.question;
  optionsEl.innerHTML = '';

  item.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = option;

    btn.addEventListener('click', () => {
      selected = index;
      Array.from(optionsEl.children).forEach((child, childIndex) => {
        child.classList.toggle('selected', childIndex === index);
      });
      nextBtn.disabled = false;
    });

    optionsEl.appendChild(btn);
  });
}

function showScore() {
  quizEl.hidden = true;
  scoreEl.hidden = false;
  scoreEl.textContent = `You scored ${score} / ${questions.length}`;
}

nextBtn.addEventListener('click', () => {
  if (selected === null) return;
  if (selected === questions[current].answer) score += 1;

  current += 1;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showScore();
  }
});

renderQuestion();
