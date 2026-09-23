// TODO (Task 2): implement the carousel.
//
// 1. Select all .slide elements, all .dot elements, #prev and #next.
// 2. Keep a current index (start at 0).
// 3. Write a show(i) function that:
//    - wraps i around the ends (use modulo)
//    - marks only the slide at index i as active
//    - marks only the dot at index i as active
// 4. #next -> show(index + 1), #prev -> show(index - 1).
// 5. Each dot -> show(that dot's data-index).
// 6. Call show(0) on load.
