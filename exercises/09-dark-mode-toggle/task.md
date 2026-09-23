# Exercise 09 — Dark-Mode Toggle

**Difficulty:** Medium · **Track:** Interactive DOM · **Focus:** CSS variables, `classList`, theming

## Scenario
The page's colours come from CSS custom properties on `:root`. Add a dark theme
that is activated by the class `dark` on `<body>`, and a button that toggles it.

## Requirements
1. `body.dark` overrides the CSS variables to a dark palette.
2. Clicking `#theme-toggle` adds/removes the `dark` class on `<body>`.
3. `aria-pressed` reflects the state (`"true"` when dark).
4. Style `#theme-toggle` as a real button.

## Tasks
- **Task 1 — Update `style.css`:** define the `body.dark` variable overrides.
- **Task 2 — Update `style.css`:** style `#theme-toggle`.
- **Task 3 — Update `script.js`:** implement the toggle.

## How to check
```bash
npm test -- exercises/09-dark-mode-toggle
npm run test:solutions -- exercises/09-dark-mode-toggle
```
Open `solution/` if you get stuck.
