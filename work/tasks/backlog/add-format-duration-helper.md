---
title: 'Add formatDuration(ms) helper for compact durations'
slug: add-format-duration-helper
spec: number-formatting-module-format-bytes-format-duration-format-percent
blockedBy: [add-format-bytes-helper]
covers: [2]
origin: issue
originTrust: trusted
---

## What to build

Add `formatDuration(ms)` to the shared `src/format.js` module: render an elapsed time in milliseconds as a compact string of hours/minutes/seconds like `'1h 2m 3s'`, OMITTING any zero units, and returning `'0s'` for a zero input. Extend `test/format.test.js` with coverage for the new helper.

Serialized after `add-format-bytes-helper` because it edits the same `src/format.js` and `test/format.test.js` files (avoids a merge conflict), not because of a logical dependency.

## Acceptance criteria

- [ ] `formatDuration(0)` returns `'0s'`.
- [ ] A multi-unit duration renders compactly, e.g. 3723000 ms → `'1h 2m 3s'`.
- [ ] Zero-valued units are omitted (e.g. a whole number of hours shows only `'Nh'`, a minutes+seconds value omits `h`).
- [ ] The helper is a pure, dependency-free named export added alongside `formatBytes` in `src/format.js`.
- [ ] Tests in `test/format.test.js` cover the new behaviour; `npm test` is green.

## Blocked by

- `add-format-bytes-helper` (same files: `src/format.js`, `test/format.test.js`).

## Prompt

> Add a `formatDuration(ms)` helper to the existing `src/format.js` module (created by the `add-format-bytes-helper` task), with tests appended to `test/format.test.js`. Match the pure, dependency-free ES-module style of the sibling helpers.
>
> Behaviour: given a duration in milliseconds, produce a compact `Xh Ym Zs` string. Omit any unit whose value is zero (`'1h 2m 3s'`, but `'2m 5s'` when there are no hours, `'45s'` when only seconds). Return `'0s'` for an input of 0. Units beyond hours are not required (out of scope).
>
> FIRST confirm `src/format.js` already exists from the blocking task; if not, route to needs-attention. "Done" means the helper is exported from `src/format.js`, covered by tests in `test/format.test.js`, and `npm test` is green.
>
> RECORD non-obvious in-scope decisions (rounding of sub-second remainders, handling of negative/fractional ms) in a `## Decisions` block at the end of your final report.
