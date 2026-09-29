---
title: 'Add formatPercent(ratio, digits) helper for percentage strings'
slug: add-format-percent-helper
spec: number-formatting-module-format-bytes-format-duration-format-percent
blockedBy: [add-format-duration-helper]
covers: [3]
origin: issue
originTrust: trusted
---

## What to build

Add `formatPercent(ratio, digits = 0)` to the shared `src/format.js` module: convert a ratio into a percentage string with a configurable number of decimal places, e.g. `formatPercent(0.1234, 1)` returns `'12.3%'` and `formatPercent(0.5)` (default `digits = 0`) returns `'50%'`. Extend `test/format.test.js` with coverage for the new helper.

Serialized after `add-format-duration-helper` because it edits the same `src/format.js` and `test/format.test.js` files (avoids a merge conflict), not because of a logical dependency.

## Acceptance criteria

- [ ] `formatPercent(0.1234, 1)` returns `'12.3%'`.
- [ ] `formatPercent(0.5)` returns `'50%'` (default `digits = 0`, no decimal point).
- [ ] The `digits` argument controls the number of decimal places rendered.
- [ ] The helper is a pure, dependency-free named export added alongside `formatBytes`/`formatDuration` in `src/format.js`.
- [ ] Tests in `test/format.test.js` cover the new behaviour; `npm test` is green.

## Blocked by

- `add-format-duration-helper` (same files: `src/format.js`, `test/format.test.js`).

## Prompt

> Add a `formatPercent(ratio, digits = 0)` helper to the existing `src/format.js` module, with tests appended to `test/format.test.js`. Match the pure, dependency-free ES-module style of the sibling helpers.
>
> Behaviour: multiply the ratio by 100 and format it as a percentage string suffixed with `%`, using `digits` decimal places (default 0). `formatPercent(0.1234, 1)` → `'12.3%'`; `formatPercent(0.5)` → `'50%'`. Localization is out of scope (no locale-specific separators).
>
> FIRST confirm `src/format.js` already exists from the blocking tasks; if not, route to needs-attention. "Done" means the helper is exported from `src/format.js`, covered by tests in `test/format.test.js`, and `npm test` is green.
>
> RECORD non-obvious in-scope decisions (rounding mode, handling of ratios > 1 or negative ratios) in a `## Decisions` block at the end of your final report.
