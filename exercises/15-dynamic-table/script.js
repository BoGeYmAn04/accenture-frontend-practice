// The employee data is fixed — do not change it.
const employees = [
  { name: 'Grace Hopper', age: 45, city: 'New York' },
  { name: 'Ada Lovelace', age: 36, city: 'London' },
  { name: 'Alan Turing', age: 41, city: 'Manchester' },
  { name: 'Linus Torvalds', age: 54, city: 'Helsinki' },
  { name: 'Margaret Hamilton', age: 33, city: 'Boston' },
  { name: 'Dennis Ritchie', age: 62, city: 'Murray Hill' },
];

// TODO (Task 2): implement the dynamic table.
//
// 1. Select #filter, #sort-name, #sort-age, #table-body and #row-count.
// 2. Keep a "view" of the data that respects the current filter + sort.
// 3. Render each employee as a <tr> with three <td> cells (name, age, city).
// 4. Filtering: keep rows whose name OR city contains the query (case-insensitive).
// 5. Sorting: "Sort by name" sorts A-Z by name; "Sort by age" sorts ascending by age.
// 6. Update #row-count to e.g. "6 employees".
// 7. Render once on page load.
