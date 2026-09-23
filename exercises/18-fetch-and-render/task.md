# Exercise 18 — Fetch & Render

**Difficulty:** Medium · **Track:** Advanced · **Focus:** `fetch`, `async/await`, loading & error states

## Scenario
Load a list of users from a local JSON file and render it, handling the loading
and error states.

## Requirements
1. Clicking `#load` fetches `./data.json`.
2. While loading, show a "Loading..." message in `#status`.
3. On success, render each user as `<li class="user">` (name + email) and clear `#status`.
4. If the request fails (non-ok response), show a friendly error in `#status`.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids).
- **Task 2 — Update `style.css`:** style `.status` and `.user`.
- **Task 3 — Update `script.js`:** implement the fetch + render.

## How to check
```bash
npm test -- exercises/18-fetch-and-render
npm run test:solutions -- exercises/18-fetch-and-render
```
Open `solution/` if you get stuck.
