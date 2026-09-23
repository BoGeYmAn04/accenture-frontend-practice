// TODO (Task 3): implement client-side form validation.
//
// Rules:
//   - username: required (must not be empty)
//   - email: required and must match a basic email pattern, e.g. /^\S+@\S+\.\S+$/
//   - password: required and at least 6 characters
//
// 1. Select the form, the three inputs, the three .error <p> elements and #form-msg.
// 2. On submit:
//    - prevent the default page reload
//    - validate each field
//    - show the relevant message in each field's error element (empty string when valid)
//    - if everything is valid, show a success message in #form-msg and clear the errors
//    - if anything is invalid, clear #form-msg
