# Exercise 01 — Fix the Form

**Difficulty:** Easy · **Track:** Foundations · **Focus:** HTML semantics & accessibility

## Scenario
You are given a sign-up form. It *looks* fine, but it is built with poor,
inaccessible HTML. Fix the markup so the form is semantic and accessible.

## Requirements
1. Every input must have an associated `<label>` (use `for` + a matching `id`).
2. The email field must use `type="email"`.
3. The phone field must use `type="tel"`.
4. The password field must use `type="password"` (characters must be masked).
5. Full name, email and password must be `required`.
6. Group the fields inside a `<fieldset>` with a `<legend>`.
7. On submit, prevent the page reload and show a message in `#result` that
   includes the entered full name.

## Tasks
- **Task 1 — Modify `index.html`:** add labels, fix input types, add `required`,
  wrap the fields in a `<fieldset>`/`<legend>`.
- **Task 2 — Update `style.css`:** add a clearly visible focus style for inputs.
- **Task 3 — Update `script.js`:** handle the submit event and render the message.

## How to check
```bash
npm test -- exercises/01-fix-the-form              # grade your files
npm run test:solutions -- exercises/01-fix-the-form # see the reference pass
```
Open `solution/` if you get stuck.
