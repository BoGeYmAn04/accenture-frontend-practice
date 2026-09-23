# Exercise 05 — E-commerce Search Box ⭐

**Difficulty:** Easy · **Track:** Interactive DOM · **Focus:** input events, filtering, dynamic rendering

> This is a **real Accenture machine-coding question** (reported verbatim by a
> candidate). Treat it as the closest thing to the actual frontend round.

## Scenario
Implement a search box for an e-commerce application. The product list is
provided at the top of `script.js` — do not change it.

## Requirements
1. Render a text input and a list of items below it.
2. As the user types, show only the items that match (case-insensitive).
3. Show a result count (e.g. `3 results`).
4. Show `No results found` when nothing matches a non-empty query.
5. When the input is empty, show all items again.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — read it and note the ids).
- **Task 2 — Update `style.css`:** style `.result-item` and `.empty`.
- **Task 3 — Update `script.js`:** implement the filter + render logic.

## How to check
```bash
npm test -- exercises/05-ecommerce-search-box
npm run test:solutions -- exercises/05-ecommerce-search-box
```
Open `solution/` if you get stuck.
