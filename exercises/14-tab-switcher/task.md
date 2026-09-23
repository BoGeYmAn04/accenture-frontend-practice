# Exercise 14 — Tab Switcher

**Difficulty:** Medium · **Track:** JS Logic & Data · **Focus:** `data-*` attributes, event handling, active state

## Scenario
Build a tab component: clicking a tab shows its panel and hides the others.

## Requirements
1. `.panel` is hidden by default; `.panel.active` is shown.
2. Clicking a `.tab` activates it (class `active`, `aria-selected="true"`) and
   deactivates the others.
3. The matching `.panel` (same `data-*` name) becomes active.

## Tasks
- **Task 1 — Update `style.css`:** tabs, active tab, panel show/hide.
- **Task 2 — Update `script.js`:** implement the switching.

## How to check
```bash
npm test -- exercises/14-tab-switcher
npm run test:solutions -- exercises/14-tab-switcher
```
Open `solution/` if you get stuck.
