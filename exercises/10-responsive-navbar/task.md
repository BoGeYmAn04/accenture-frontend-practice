# Exercise 10 — Responsive Navbar

**Difficulty:** Medium · **Track:** CSS Layout · **Focus:** media queries, flexbox, hamburger toggle

## Scenario
Build a navbar that is horizontal on desktop and collapses behind a **Menu**
button on mobile.

## Requirements
1. Desktop: brand on the left, `.nav-links` in a horizontal row on the right.
2. `.nav-toggle` is hidden on desktop.
3. At `max-width: 600px`: show `.nav-toggle`, hide `.nav-links` by default,
   and show them as a **vertical column** when `.nav-links` has the class `open`.
4. Clicking the toggle adds/removes `open` and keeps `aria-expanded` in sync.

## Tasks
- **Task 1 — Update `style.css`:** layout + toggle button (hidden on desktop).
- **Task 2 — Update `style.css`:** add the `max-width: 600px` media query.
- **Task 3 — Update `script.js`:** implement the toggle.

## How to check
```bash
npm test -- exercises/10-responsive-navbar
npm run test:solutions -- exercises/10-responsive-navbar
```
Open `solution/` if you get stuck.
