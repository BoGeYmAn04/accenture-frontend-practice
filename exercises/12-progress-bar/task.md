# Exercise 12 — Progress Bar + Spinner

**Difficulty:** Medium · **Track:** CSS Layout · **Focus:** `@keyframes`, transitions, JS-triggered animation

## Scenario
Build an upload progress bar that animates to 100% when started, plus a
continuously spinning loader.

## Requirements
1. `.progress-bar` fills the track (`height: 100%`), has a colour, and a width
   `transition` so it animates smoothly.
2. Clicking `#start` sets the bar to 100%, updates `#progress-label` to `100%`
   and the track's `aria-valuenow` to `100`.
3. `.spinner` spins continuously via `@keyframes` + `animation`.

## Tasks
- **Task 1 — Update `style.css`:** the `.progress-bar` rule.
- **Task 2 — Update `style.css`:** the spinner animation + `@keyframes`.
- **Task 3 — Update `script.js`:** trigger the progress on click.

## How to check
```bash
npm test -- exercises/12-progress-bar
npm run test:solutions -- exercises/12-progress-bar
```
Open `solution/` if you get stuck.
