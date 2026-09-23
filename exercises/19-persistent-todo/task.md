# Exercise 19 — Persistent Notes (localStorage)

**Difficulty:** Medium–Hard · **Track:** Advanced · **Focus:** `localStorage`, JSON, state persistence

## Scenario
Build a notes list that survives a page reload by saving to `localStorage`.

## Requirements
1. Notes are stored as an array of `{ id, text }` and loaded on start.
2. Submitting the form adds a note (ignore empty input) and persists it.
3. Each note has a delete button that removes it and persists the change.
4. `#clear` removes all notes.
5. `#empty` is visible only when there are no notes.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids).
- **Task 2 — Update `style.css`:** style `.note`, `.note-delete`, `.clear`.
- **Task 3 — Update `script.js`:** implement add / delete / clear / persist.

## How to check
```bash
npm test -- exercises/19-persistent-todo
npm run test:solutions -- exercises/19-persistent-todo
```
Open `solution/` if you get stuck.
