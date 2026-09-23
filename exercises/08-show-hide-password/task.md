# Exercise 08 — Show / Hide Password

**Difficulty:** Easy · **Track:** Interactive DOM · **Focus:** class/attribute toggling, input type

## Scenario
Add a "Show / Hide" button next to a password field that reveals and re-hides
the typed characters.

## Requirements
1. Clicking `#toggle-password` switches the input between `type="password"` and
   `type="text"`.
2. The button label reads **Show** when masked and **Hide** when visible.
3. `aria-pressed` on the button is `"true"` while visible and `"false"` otherwise.

## Tasks
- **Task 1 — Modify `index.html`:** (already complete — note the ids).
- **Task 2 — Update `style.css`:** style `#toggle-password`.
- **Task 3 — Update `script.js`:** implement the toggle.

## How to check
```bash
npm test -- exercises/08-show-hide-password
npm run test:solutions -- exercises/08-show-hide-password
```
Open `solution/` if you get stuck.
