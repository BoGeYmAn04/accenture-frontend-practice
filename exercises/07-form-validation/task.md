# Exercise 07 — Form Validation

**Difficulty:** Medium · **Track:** Interactive DOM · **Focus:** regex, `preventDefault`, inline errors

## Scenario
Validate a sign-up form **client-side**. Each field has an adjacent `.error`
element for its message; `#form-msg` shows the overall result.

## Requirements
1. **Username** — required (not empty).
2. **Email** — required and must match a basic email pattern (e.g. `/^\S+@\S+\.\S+$/`).
3. **Password** — required and at least 6 characters.
4. On submit: prevent the default reload, write each field's error into its
   `.error` element (empty string when valid), show a success message in
   `#form-msg` only when everything is valid, and clear `#form-msg` otherwise.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids).
- **Task 2 — Update `style.css`:** style `.error` and `.success`.
- **Task 3 — Update `script.js`:** implement the validation.

## How to check
```bash
npm test -- exercises/07-form-validation
npm run test:solutions -- exercises/07-form-validation
```
Open `solution/` if you get stuck.
