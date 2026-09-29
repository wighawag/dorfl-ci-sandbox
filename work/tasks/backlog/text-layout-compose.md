---
title: 'Text layout: layout(text, width, {align}) composing wrap + pad'
slug: text-layout-compose
spec: text-layout-module-wrap-pad-and-align
blockedBy: [text-layout-wrap, text-layout-pad]
covers: [9, 11]
origin: issue
originTrust: trusted
---

## What to build

Add and export `layout(text, width, {align})` from the text-layout module as a THIN composition of the existing `wrap` and `pad`: `wrap` the text to `width`, then `pad` every resulting line to `width` with the given alignment (default `left`). The result is a rectangular block of lines each exactly `width` user-perceived characters wide. `layout` must NOT re-implement wrapping, padding, or width measurement — it calls the other two.

This task also confirms the maintainer story: `wrap`, `pad`, and `layout` are each independently usable and independently tested — the composition proves they compose without any of them depending on the others' callers.

This task edits the same module file as the earlier tasks; it is serialized behind both via `blockedBy`.

## Acceptance criteria

- [ ] `layout` is exported and implemented purely by composing `wrap` then `pad` (no duplicated wrap/pad/width logic).
- [ ] `layout(text, width, {align})` returns lines that are EACH exactly `width` graphemes wide (a rectangular block).
- [ ] Alignment is passed through to `pad`; omitting `align` yields left alignment.
- [ ] A composed test proves correctness (right line count from wrapping, every line padded to exact width, alignment honoured), including an emoji / combining-accent fixture so exact-width holds under grapheme measurement.
- [ ] `wrap`, `pad`, and `layout` each remain usable and tested in isolation (composition does not couple them to each other's callers).
- [ ] Tests follow the existing `test/` conventions.

## Blocked by

- text-layout-wrap — provides `wrap` and the shared width primitive.
- text-layout-pad — provides `pad`. (Same module file; serialized behind both.)

## Prompt

> Goal: add `layout(text, width, {align})` to the text-layout module as a thin composition of `wrap` + `pad`.
>
> FIRST, check this task against current reality: both `text-layout-wrap` and `text-layout-pad` must be done — confirm the layout module exports `wrap` and `pad` and a shared grapheme-width primitive. If either landed with a different signature than this task assumes, route to needs-attention rather than adapting silently.
>
> `layout(text, width, {align})`: call `wrap(text, width)`, then `pad(line, width, {align})` for every resulting line, returning a rectangular block whose lines are each exactly `width` graphemes wide. Default alignment is `left`. Do NOT re-implement wrapping, padding, or width measurement — compose the existing functions. Out of scope: justification, truncation, ANSI-aware or wide-glyph width.
>
> Domain vocabulary: widths are grapheme-cluster (user-perceived character) counts — an emoji or combining-accent glyph is width 1 — provided by the shared primitive the earlier tasks established.
>
> Test the seams: a composed case asserting the correct number of lines and that every line is exactly `width` wide with the requested alignment, plus a grapheme fixture (emoji / combining accent) proving exact-width holds under grapheme measurement. Also confirm `wrap`, `pad`, and `layout` each stay independently usable/tested. Follow `test/strings.test.js` conventions. "Done" = `layout` exported, composed from the other two, and tested.
>
> RECORD any non-obvious in-scope decisions in a `## Decisions` block at the end of your final report.
