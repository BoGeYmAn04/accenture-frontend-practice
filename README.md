# Accenture Frontend Machine-Coding Practice

20 vanilla **HTML / CSS / JavaScript** exercises modelled on the **Accenture UI
coding round**. Each exercise mirrors how the real task is delivered: you are
given pre-built files and asked to modify them, not write from a blank canvas.

> Real candidate report of the round: *"Task 1: Modify the HTML file. Task 2:
> Make changes in the CSS file. Task 3: Update logic in the JavaScript file."*
> Skill areas: DOM manipulation, click & event handling, dynamic elements,
> JavaScript logic, interactive UI components.

---

## Quick start

```bash
# one-time setup
npm install
npx playwright install chromium

# browse the exercises
npm run dashboard          # then open http://localhost:4173

# grade ONE exercise (runs the automated checks against your files)
npm test -- exercises/05-ecommerce-search-box

# see the reference solution pass
npm run test:solutions -- exercises/05-ecommerce-search-box

# grade every exercise
npm test

# grade every reference solution
npm run test:solutions
```

No build step, no frameworks, no dependencies at runtime — just open the HTML
files in a browser or through the local server.

---

## How an exercise works

```
exercises/05-ecommerce-search-box/
├── task.md          # the brief, written like the real assessment prompt
├── index.html       # pre-built, with <!-- TODO --> gaps
├── style.css        # pre-built, with /* TODO */ gaps
├── script.js        # pre-built skeleton, with // TODO gaps
├── test.spec.js     # automated grader for this exercise
└── solution/        # complete reference implementation
```

1. Read `task.md`.
2. Fill in the `TODO`s in `index.html`, `style.css`, `script.js`.
3. Run `npm test -- exercises/<folder>` to check your work.
4. Stuck? Compare against `solution/` or open it in the browser.

`npm test` loads **your** files; `npm run test:solutions` loads the `solution/`
folders. A passing test suite means the required behaviour works.

---

## The 20 exercises

| # | Exercise | Difficulty | Focus |
|---|----------|------------|-------|
| 01 | Fix the Form | Easy | HTML semantics & accessibility |
| 02 | Style the Profile Card | Easy | CSS selectors, box model, typography |
| 03 | Click Counter | Easy | DOM selection, events, `textContent` |
| 04 | Center It | Easy | Flexbox, Grid, absolute positioning |
| 05 | **E-commerce Search Box** | Easy | input events, filtering (real question) |
| 06 | To-Do List | Easy-Medium | `createElement`, `classList`, `remove` |
| 07 | Form Validation | Medium | regex, `preventDefault`, inline errors |
| 08 | Show / Hide Password | Easy | attribute toggling, input type |
| 09 | Dark-Mode Toggle | Medium | CSS variables, `classList` |
| 10 | Responsive Navbar | Medium | media queries, flexbox |
| 11 | Responsive Card Grid | Medium | CSS Grid, hover transitions |
| 12 | Progress Bar + Spinner | Medium | `@keyframes`, transitions |
| 13 | Accordion | Medium | DOM traversal, single-open state |
| 14 | Tab Switcher | Medium | `data-*` attributes, active state |
| 15 | Dynamic Table | Medium-Hard | `map` / `filter` / `sort`, rendering |
| 16 | Image Carousel | Medium | index state, wrap-around, dots |
| 17 | **Live Digital Clock** | Easy-Medium | `Date`, `setInterval` (real question) |
| 18 | Fetch & Render | Medium | `fetch`, `async/await`, error states |
| 19 | Persistent Notes | Medium-Hard | `localStorage`, JSON |
| 20 | Quiz | Medium-Hard | state, conditional rendering, scoring |

Exercises **05** and **17** are based on questions reported from the actual
Accenture frontend round.

---

## What the real round tests

From the research (PrepInsta, GeeksforGeeks candidate reports, LinkedIn
coach/candidate posts):

- The frontend task is **easy difficulty**; the backend/DSA task is the hard one.
- The coding round is **~60 minutes, 3 tasks** (SQL + backend + frontend) in the
  current pattern; no negative marking; partial test-case scoring.
- The frontend task = **modify existing HTML/CSS/JS** to implement a feature.
- Core skills: **DOM manipulation, event handling, dynamic rendering, and
  understanding + modifying an existing HTML/CSS structure with JavaScript.**

This repo drills exactly those skills, one concept at a time.

---

## Project structure

```
.
├── index.html            # dashboard listing all exercises
├── dashboard.css / .js
├── server.js             # tiny static server (no deps)
├── playwright.config.js  # test runner config
├── package.json
└── exercises/
    ├── 01-fix-the-form/
    ├── ...
    └── 20-quiz/
```

---

## Adding your own exercise

1. Copy any exercise folder.
2. Rename it and update `task.md`.
3. Keep the `test.spec.js` pattern (it reads `__dirname` and honours
   `SOLUTION=1` to target the `solution/` folder).
4. Add it to the `exercises` array in `dashboard.js`.
