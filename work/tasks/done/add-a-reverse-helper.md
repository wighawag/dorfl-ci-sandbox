---
title: 'Add a reverse(text) helper that keeps grapheme clusters intact'
slug: add-a-reverse-helper
blockedBy: []
---

## What to build

Add `reverse(text)` in a new module `src/reverse.js`: it returns the text reversed by user-perceived character (use `Intl.Segmenter` with `granularity: 'grapheme'`), so an emoji or a letter with a combining accent stays whole. Add tests in `test/reverse.test.js`.

## Acceptance criteria

- [ ] `reverse('abc')` is `'cba'`; `reverse('')` is `''`.
- [ ] A combining accent and an emoji survive reversal intact.
- [ ] `npm test` is green.

## Prompt

> Add the `reverse` helper described above in `src/reverse.js` with tests in `test/reverse.test.js`. Keep it dependency-free.
