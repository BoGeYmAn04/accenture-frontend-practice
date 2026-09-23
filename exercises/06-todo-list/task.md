# Exercise 06 — To-Do List

**Difficulty:** Easy–Medium · **Track:** Interactive DOM · **Focus:** `createElement`, `appendChild`, `remove`, `classList`

## Scenario
Build a working to-do list: add tasks, mark them complete, and delete them.

## Requirements
1. Submitting the form adds the task (ignore empty/whitespace input) and clears the input.
2. Each task is an `<li class="todo-item">` containing:
   - a `<span class="todo-text">` with the task text,
   - a `<button class="todo-toggle">` that toggles a `completed` class on the `<li>`,
   - a `<button class="todo-delete">` that removes the `<li>`.
3. `#empty` is visible only while the list has no tasks.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids/classes).
- **Task 2 — Update `style.css`:** style `.todo-item`, `.completed`, `.todo-toggle`, `.todo-delete`.
- **Task 3 — Update `script.js`:** implement the logic.

## How to check
```bash
npm test -- exercises/06-todo-list
npm run test:solutions -- exercises/06-todo-list
```
Open `solution/` if you get stuck.
