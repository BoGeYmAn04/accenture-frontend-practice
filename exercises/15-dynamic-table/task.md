# Exercise 15 — Dynamic Table

**Difficulty:** Medium–Hard · **Track:** JS Logic & Data · **Focus:** array methods (`map`/`filter`/`sort`), rendering, templating

## Scenario
Render a table of employees from the provided data array, then filter and sort it.

## Requirements
1. On load, render every employee as a `<tr>` with three `<td>` cells.
2. Typing in `#filter` keeps rows whose **name or city** contains the query
   (case-insensitive).
3. **Sort by name** sorts A-Z; **Sort by age** sorts ascending.
4. `#row-count` reflects the number of visible rows (e.g. `6 employees`).

## Tasks
- **Task 1 — Update `style.css`:** style `th` and `td`.
- **Task 2 — Update `script.js`:** render, filter and sort.

## How to check
```bash
npm test -- exercises/15-dynamic-table
npm run test:solutions -- exercises/15-dynamic-table
```
Open `solution/` if you get stuck.
