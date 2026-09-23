// TODO (Task 3): build a notes list that persists in localStorage.
//
// 1. Pick a storage key, e.g. "accenture-notes".
// 2. Load the saved notes on start: JSON.parse(localStorage.getItem(KEY)) || [].
// 3. Keep the notes as an array of objects like { id, text }.
// 4. On form submit:
//    - prevent the default reload, ignore empty input
//    - push a new note, save to localStorage, clear the input, re-render
// 5. Render each note as <li class="note"> with the text and a
//    <button class="note-delete"> that removes it (and saves).
// 6. #clear removes ALL notes (and saves).
// 7. Show #empty only when there are no notes.
