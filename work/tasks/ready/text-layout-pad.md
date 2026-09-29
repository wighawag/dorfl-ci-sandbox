---
title: 'Text layout: pad(text, width, {align}) left/right/center, grapheme-measured'
slug: text-layout-pad
spec: text-layout-module-wrap-pad-and-align
blockedBy: [text-layout-wrap]
covers: [4, 5, 6, 7, 8, 10]
origin: issue
originTrust: trusted
---

## What to build

Add and export `pad(text, width, {align})` from the text-layout module, reusing the SHARED grapheme-width primitive introduced by the `wrap` task (do not re-implement width measurement). `pad` fills a single line up to `width` with spaces:

- `align: 'left'` (the default when `align` is omitted) — append spaces to the right (flush-left).
- `align: 'right'` — prepend spaces (flush-right).
- `align: 'center'` — split the padding between both sides, with a fixed, documented rule for the odd leftover space (e.g. extra space goes to the right).

A line whose measured width already meets or exceeds `width` is returned UNCHANGED — padding never truncates. All fill-count and center-split arithmetic is measured in user-perceived characters (grapheme clusters), so an emoji or a combining-accent glyph counts as width 1.

This task edits the same module file as `text-layout-wrap`; it is serialized behind it via `blockedBy` to avoid a merge conflict and to reuse the width primitive.

## Acceptance criteria

- [ ] `pad` is exported from the layout module and reuses the shared width primitive (no duplicate width logic).
- [ ] `align: 'left'` appends spaces to the right; `align: 'right'` prepends spaces.
- [ ] `align: 'center'` splits padding both sides with a deterministic, documented odd-space rule.
- [ ] `align` defaults to `left` when omitted from the options object.
- [ ] A line already at or over `width` (by grapheme measure) is returned unchanged — never truncated.
- [ ] Fill counts and center split are grapheme-measured: fixtures with an emoji and a base-char-plus-combining-accent pad/center correctly (glyph counts as width 1).
- [ ] Tests cover the three alignments, the default, the no-truncate over-width case, and the grapheme fixtures, following the existing `test/` conventions.

## Blocked by

- text-layout-wrap — establishes the layout module and the shared grapheme-width primitive `pad` reuses (and same module file, so serialized to avoid conflicts).

## Prompt

> Goal: add `pad(text, width, {align})` to the text-layout module, reusing the shared grapheme-width primitive from the `wrap` task.
>
> FIRST, check this task against current reality: the `text-layout-wrap` task must be done — confirm the layout module exists beside `src/strings.js`, exports `wrap`, and exposes a reusable grapheme-width helper. If the width primitive landed in a shape you cannot reuse, or the module diverged from what this task assumes, route to needs-attention rather than re-implementing width measurement.
>
> Domain vocabulary: widths are measured in grapheme clusters (user-perceived characters) via the shared primitive — an emoji or a base-letter-plus-combining-accent counts as width 1, never by `String.length`.
>
> `pad(text, width, {align})`: pad a single line up to `width` with spaces. `left` (default) appends right; `right` prepends; `center` splits both sides with a FIXED documented rule for the odd leftover space (decide and document, e.g. extra to the right). A line already at/over `width` returns unchanged (no truncation). Out of scope: wrapping (that is `wrap`), justification, ANSI-aware width, wide/double-cell glyphs.
>
> Test the seams: all three alignments, omitted-`align` default, over-width no-truncate, and grapheme fixtures (emoji, combining accent) proving width-1 counting in fill and center split. Follow the conventions in `test/strings.test.js`. "Done" = `pad` exported and tested in isolation.
>
> RECORD non-obvious in-scope decisions (notably the exact odd-space center rule) in a `## Decisions` block at the end of your final report; if the rule warrants durable rationale, also note it inline where `center` is implemented.
