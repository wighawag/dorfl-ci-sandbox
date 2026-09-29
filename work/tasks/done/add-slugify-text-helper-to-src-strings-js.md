---
title: 'Add slugify(text) helper to src/strings.js'
slug: add-slugify-text-helper-to-src-strings-js
issue: 14
origin: issue
originTrust: trusted
covers: []
blockedBy: []
needsAnswers: false
---

## What to build

`slugify(text)` ALREADY EXISTS and is already exported from `src/strings.js`. Its current implementation lower-cases the input, replaces every run of `[^a-z0-9]+` with a single `-`, and trims leading/trailing `-` — i.e. it already matches the behaviour issue #14 asks for. Do NOT re-declare or re-add it (a second `export function slugify` would be a duplicate-declaration error).

The real gap is TEST COVERAGE: `test/strings.test.js` only asserts one case (`slugify('Hello, World!')`). This task adds the missing acceptance-criteria cases and confirms the suite is green.

If, on drift-check, `slugify` is found MISSING or NOT matching the behaviour below, stop and surface that — the premise here is that it already exists and is correct.

## Acceptance criteria

- Confirm `src/strings.js` already exports `slugify(text)` with the behaviour below; no code change to `src/strings.js` unless the drift-check shows it is absent or wrong.
- `slugify('Hello, World!')` returns `'hello-world'` (already covered — keep it).
- Consecutive non-alphanumeric characters collapse to a single `-`: `slugify('a  --  b')` returns `'a-b'` (ADD this assertion).
- Leading and trailing separators are trimmed: `slugify('  Hi!  ')` returns `'hi'` (ADD this assertion).
- The empty string maps to `''`: `slugify('')` returns `''` (ADD this assertion).
- `npm test` passes.

## Prompt

First run the drift-check: open `src/strings.js` and confirm `export function slugify(text)` already exists and lower-cases `text`, replaces each run of `[^a-z0-9]+` with a single `-`, and strips leading/trailing `-`. It does (present since the initial commit). Do NOT add or re-declare the function — that would duplicate the export. If it is somehow absent or behaves differently, STOP and surface the discrepancy instead of proceeding.

Then extend `test/strings.test.js`: keep the existing `slugify('Hello, World!')` assertion and add assertions for the collapse case (`slugify('a  --  b')` === `'a-b'`), the trim case (`slugify('  Hi!  ')` === `'hi'`), and the empty-string case (`slugify('')` === `''`). Run `npm test` and confirm everything is green.

## Applied answers 2026-09-29

### q1: Land `work/task-add-slugify-text-helper-to-src-strings-js`? An unmerged `work/*` branch is awaiting an integration decision.

merge
