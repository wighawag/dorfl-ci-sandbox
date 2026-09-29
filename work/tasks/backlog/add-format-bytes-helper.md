---
title: 'Add formatBytes(n) helper for human-readable binary sizes'
slug: add-format-bytes-helper
spec: number-formatting-module-format-bytes-format-duration-format-percent
blockedBy: []
covers: [1]
origin: issue
originTrust: trusted
---

## What to build

Create the new module `src/format.js` and add `formatBytes(n)` to it: turn a raw byte count into a human-readable string using BINARY units (`B`, `KiB`, `MiB`, `GiB`). Bytes are shown as a whole number with the `B` unit; above bytes, one decimal place is used. For example `formatBytes(0)` is `'0 B'`, `formatBytes(1536)` is `'1.5 KiB'`, and values scale up through `MiB` and `GiB` at 1024-multiples.

This is the first task to touch `src/format.js` / `test/format.test.js`, so it establishes the module (a pure, dependency-free ES-module export mirroring the existing helpers like `src/reverse.js`) and its test file `test/format.test.js`.

## Acceptance criteria

- [ ] `formatBytes(0)` returns `'0 B'`; a sub-1024 value stays in `B` with no decimal.
- [ ] `formatBytes(1536)` returns `'1.5 KiB'`.
- [ ] Values scale correctly across `KiB`, `MiB`, `GiB` at 1024-based thresholds, with one decimal place above bytes.
- [ ] `src/format.js` is a pure, dependency-free ES module (same style as the other `src/*.js` helpers).
- [ ] Tests in `test/format.test.js` cover the new behaviour (mirror the repo's existing test style); `npm test` is green.

## Blocked by

- None — can start immediately.

## Prompt

> Add a `formatBytes(n)` helper to a NEW module `src/format.js`, with tests in a new `test/format.test.js`. Look at existing helpers such as `src/reverse.js` and `src/words.js` and their tests to match the module and test style (pure, dependency-free, named ES-module exports).
>
> Behaviour: `formatBytes` converts a byte count into a human-readable string using BINARY units only — `B`, `KiB`, `MiB`, `GiB` (1024-based). Bytes are shown as a whole number (`'0 B'`, `'512 B'`); above bytes use ONE decimal place (`formatBytes(1536)` → `'1.5 KiB'`). Do NOT implement SI/decimal units (`KB`, `MB`) — out of scope. Units beyond `GiB` are not required.
>
> "Done" means the helper exists in `src/format.js`, is covered by tests in `test/format.test.js`, and `npm test` is green. Keep the module ready for two sibling helpers (`formatDuration`, `formatPercent`) to be appended by later tasks.
>
> RECORD non-obvious in-scope decisions (e.g. rounding/threshold choices, behaviour on negatives if you handle them) in a `## Decisions` block at the end of your final report.
