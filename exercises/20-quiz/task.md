# Exercise 20 — Quiz

**Difficulty:** Medium–Hard · **Track:** Advanced · **Focus:** state management, conditional rendering, scoring

## Scenario
Build a 3-question quiz. The user picks an answer, moves to the next question,
and sees a final score.

## Requirements
1. `#progress` shows `Question N of 3`.
2. Each question renders its options as `<button class="option">`; the chosen
   one gets the `selected` class and enables `#next`.
3. `#next` records whether the answer was correct and advances (or finishes).
4. At the end, hide `#quiz` and show `#score` with `You scored X / 3`.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids).
- **Task 2 — Update `style.css`:** style `.option`, `.option.selected`, `.next`.
- **Task 3 — Update `script.js`:** implement the quiz.

## How to check
```bash
npm test -- exercises/20-quiz
npm run test:solutions -- exercises/20-quiz
```
Open `solution/` if you get stuck.
