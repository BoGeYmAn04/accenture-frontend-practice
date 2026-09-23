# Exercise 13 — Accordion

**Difficulty:** Medium · **Track:** JS Logic & Data · **Focus:** DOM traversal, class toggling, single-open state

## Scenario
Build a FAQ accordion. Clicking a header opens its panel and closes any other
open panel.

## Requirements
1. `.accordion-body` is hidden by default and shown when its `.accordion-item`
   has the class `open`.
2. Clicking a `.accordion-header` opens its panel and closes all others.
3. Clicking an already-open header closes it.
4. `aria-expanded` stays in sync; the `.icon` shows `+` / `-`.

## Tasks
- **Task 1 — Update `style.css`:** hide/reveal `.accordion-body`.
- **Task 2 — Update `script.js`:** implement the single-open behaviour.

## How to check
```bash
npm test -- exercises/13-accordion
npm run test:solutions -- exercises/13-accordion
```
Open `solution/` if you get stuck.
