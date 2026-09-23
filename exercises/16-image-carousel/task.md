# Exercise 16 — Image Carousel

**Difficulty:** Medium · **Track:** JS Logic & Data · **Focus:** index state, wrap-around, dots + arrows

## Scenario
Build an image carousel. Only one slide is visible at a time; navigate with
**Prev**, **Next** and the **dots**. Navigation wraps around at both ends.

## Requirements
1. `.slide` is hidden by default; `.slide.active` is shown (exactly one).
2. `#next` advances, `#prev` goes back.
3. Clicking a `.dot` jumps to that slide and marks it active.
4. Advancing past the last slide wraps to the first (and vice versa).

## Tasks
- **Task 1 — Update `style.css`:** slide show/hide + dots.
- **Task 2 — Update `script.js`:** implement the carousel logic.

## How to check
```bash
npm test -- exercises/16-image-carousel
npm run test:solutions -- exercises/16-image-carousel
```
Open `solution/` if you get stuck.
