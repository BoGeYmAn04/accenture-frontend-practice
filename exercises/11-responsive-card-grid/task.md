# Exercise 11 — Responsive Card Grid

**Difficulty:** Medium · **Track:** CSS Layout · **Focus:** CSS Grid `auto-fill`/`minmax`, hover transitions

## Scenario
Six team cards must flow in a responsive grid that automatically changes the
number of columns as the viewport width changes.

## Requirements
1. `.grid` is a CSS Grid using `repeat(auto-fill, minmax(220px, 1fr))` with a gap.
2. `.card` has padding, rounded corners, a soft shadow and a transition.
3. `.card:hover` lifts the card (e.g. `transform: translateY(-4px)`).
4. On a narrow screen the grid collapses to a single column.

## Tasks
- **Task 1 — Update `style.css`:** the `.grid` rule.
- **Task 2 — Update `style.css`:** `.card` and `.card:hover`.

## How to check
```bash
npm test -- exercises/11-responsive-card-grid
npm run test:solutions -- exercises/11-responsive-card-grid
```
Open `solution/` if you get stuck.
