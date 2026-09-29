---
title: 'Add lowerRest option to capitalize'
slug: add-lower-rest-option-to-capitalize
issue: 5
origin: issue
originTrust: trusted
covers: []
blockedBy: []
---

## What to build

Extend the existing `capitalize(text)` in `src/strings.js` to accept an optional second argument `options`: `capitalize(text, { lowerRest: true })`. When `lowerRest` is `true`, the first character is upper-cased AND the rest of the string is lower-cased, so `"hELLO"` becomes `"Hello"`. The default behaviour (no options, or `lowerRest` falsy) stays exactly as today: only the first character is upper-cased and the remainder is untouched (`"hELLO"` -> `"HELLO"`). The empty-string case must continue to return the input unchanged.

## Acceptance criteria

- `capitalize("hELLO")` returns `"HELLO"` (unchanged default behaviour).
- `capitalize("hELLO", { lowerRest: true })` returns `"Hello"`.
- `capitalize("hello", { lowerRest: true })` returns `"Hello"`.
- `capitalize("")` and `capitalize("", { lowerRest: true })` return `""`.
- Existing callers that pass no second argument keep working (backward compatible).
- Tests in `test/strings.test.js` cover the default path, the `lowerRest: true` path, and the empty-string edge case.

## Prompt

In `src/strings.js`, update `capitalize` to take `(text, options = {})` and, when `options.lowerRest` is truthy, lower-case `text.slice(1)` before appending it to the upper-cased first character; otherwise leave the remainder as-is. Preserve the empty-string guard. Add matching test cases in `test/strings.test.js` and run the test suite to confirm all pass.
