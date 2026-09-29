---
title: 'Add truncate(text, max) helper to src/strings.js'
slug: add-truncate-text-max-helper-to-src-strings-js
issue: 1
origin: issue
originTrust: trusted
covers: []
blockedBy: []
needsAnswers: true
---

## What to build

Add a `truncate(text, max)` function to `src/strings.js`, exported alongside the existing `slugify` and `capitalize` helpers.

Behaviour:
- If `text` is longer than `max` characters, cut it and append a single ellipsis character (`…`, U+2026) so the returned string is **exactly** `max` characters long (i.e. keep the first `max - 1` characters, then the ellipsis).
- Otherwise (`text.length <= max`), return `text` unchanged.
- If `max` is below 1, throw a `RangeError`.

Add tests next to the existing ones in `test/strings.test.js`, matching the current `node:test` + `node:assert/strict` style.

## Acceptance criteria

- `truncate` is exported from `src/strings.js`.
- `truncate('hello', 10)` returns `'hello'` (unchanged when not longer than `max`).
- `truncate('hello', 5)` returns `'hello'` (equal length is unchanged).
- `truncate('hello world', 5)` returns `'hell…'` — exactly 5 characters, ending in a single `…`.
- The result length is exactly `max` whenever truncation occurs.
- `truncate('x', 0)` throws a `RangeError`; any `max < 1` throws a `RangeError`.
- Tests covering the unchanged case, the truncation case (asserting exact length and the trailing `…`), and the `RangeError` case are added to `test/strings.test.js`.
- The full test suite passes (`node --test`).

## Prompt

Implement `truncate(text, max)` in `src/strings.js` following the existing export/JSDoc style. Guard `max < 1` by throwing `new RangeError(...)` first. When `text.length > max`, return `text.slice(0, max - 1) + '…'`; otherwise return `text`. Add matching tests to `test/strings.test.js` for the unchanged, truncated (assert exact `max` length and single trailing ellipsis), and `RangeError` cases. Keep tabs/formatting consistent with the surrounding code and run `node --test` to confirm everything is green.
