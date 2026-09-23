// The quiz data is fixed — do not change it.
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

// TODO (Task 3): build the quiz.
//
// 1. Select #quiz, #score, #progress, #question-text, #options and #next.
// 2. Keep track of the current question index, the score and the selected option.
// 3. Write renderQuestion() that:
//    - shows "Question N of 3" in #progress
//    - writes the question text
//    - renders each option as a <button class="option">
//    - marks the clicked option as "selected" and enables #next
//    - disables #next until an option is chosen
// 4. On #next click:
//    - add 1 to the score if the selected option is correct
//    - move to the next question, or show the final score
// 5. showScore() hides #quiz and shows #score with "You scored X / 3".
// 6. Call renderQuestion() on load.
