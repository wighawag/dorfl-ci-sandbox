---
title: 'Text layout: wrap(text, width) with shared grapheme-width primitive'
slug: text-layout-wrap
spec: text-layout-module-wrap-pad-and-align
blockedBy: []
covers: [1, 2, 3, 10]
origin: issue
originTrust: trusted
---

## What to build

Create the new text-layout module beside `src/strings.js` (e.g. `src/layout.js`) and export `wrap(text, width)`. This task also introduces the SHARED width primitive the whole module rests on: a helper that measures a string in user-perceived characters (grapheme clusters) rather than code units, so a single emoji and a base-char-plus-combining-accent each count as width 1. Use grapheme-cluster segmentation (e.g. `Intl.Segmenter` with `granularity: 'grapheme'`) and count segments.

`wrap` breaks `text` into an array of lines each at most `width` grapheme-wide, preferring to break at spaces. Break-point whitespace is collapsed so no line starts or ends with a stray padding space. A word longer than `width` is hard-split across lines ONLY when it cannot fit on a line of its own (a normal word that would fit on the next line is never chopped).

The width primitive must be structured so the later `pad` and `layout` tasks can reuse it — do not inline the measurement in a way that forces re-implementation.

## Acceptance criteria

- [ ] A new module beside `src/strings.js` exports `wrap` (and the shared width primitive is reachable for reuse by the `pad`/`layout` tasks).
- [ ] `wrap(text, width)` returns lines each at most `width` user-perceived characters, breaking at spaces where possible.
- [ ] A word longer than `width` is hard-split across lines; a normal word that fits on the next line is never chopped (covered by tests including the exact-width boundary case).
- [ ] Break-point whitespace is collapsed: no returned line begins or ends with a stray space.
- [ ] Width is measured in grapheme clusters: a fixture line containing an emoji and one containing a base-char-plus-combining-accent each count that glyph as width 1 in the line-fitting arithmetic.
- [ ] Tests cover the new behaviour and follow the existing conventions in `test/` (node:test + node:assert/strict, one file per module).

## Blocked by

- None — can start immediately.

## Prompt

> Goal: add a text-layout module next to the existing string helpers and implement `wrap(text, width)` on top of a shared grapheme-width primitive.
>
> FIRST, check this task against current reality (launch snapshot — it may have drifted): confirm `src/strings.js` and `test/strings.test.js` still exist and the repo still uses ES modules with `node:test` + `node:assert/strict`. If a sibling task already created the layout module differently than assumed, do not build on a stale premise — route to needs-attention.
>
> Look at `src/strings.js` and `test/strings.test.js` for the module and test conventions (ESM exports, `node --test` style, one test file per source module). Create the layout module beside them.
>
> Domain vocabulary: a "grapheme cluster" is one user-perceived character (an emoji, or a base letter plus a combining accent) even when it is several code units. The module must measure widths in grapheme clusters, NOT `String.length`. Use `Intl.Segmenter` with `granularity: 'grapheme'` (or an equivalent segmentation) and count the segments. This width primitive is SHARED — the `pad` and `layout` tasks reuse it, so structure it as a reusable helper, not an inline snippet.
>
> `wrap(text, width)`: split into lines of at most `width` graphemes, breaking at spaces; collapse the break-point whitespace so no line has leading/trailing stray spaces; hard-split a word only when it is longer than `width` and cannot fit on a line of its own. Out of scope (do NOT implement): wide/double-cell CJK handling (each grapheme is width 1 here), ANSI-aware width, justification, truncation.
>
> Test the seams: space breaks, long-word hard-split, exact-width boundary, and grapheme-width fixtures (an emoji line and a combining-accent line proving width 1). "Done" = `wrap` is exported, tested in isolation, and the shared width primitive is in place for the next tasks.
>
> RECORD non-obvious in-scope decisions (e.g. exactly how break-point whitespace is collapsed, how a too-long word is chunked) in a `## Decisions` block at the end of your final report.

## Decisions

- **Break-point whitespace collapse via `split(/\s+/)` + drop empties.** I collapse *all* whitespace runs (not just single spaces) between words to tokens, so leading/trailing and repeated interior whitespace never survive as stray padding. Alternative considered: preserve single spaces and only trim edges — rejected because the spec explicitly wants no stray padding spaces and treats the break point as collapsible. Side effect worth noting: this also collapses tabs/newlines into single break points (the input paragraph is treated as reflowable text), rather than preserving hard newlines. This touches nothing outside `wrap`; `pad`/`layout` operate on the already-wrapped lines.
- **Too-long word chunked into fixed `width`-wide slices from the left, leftover as the new current line.** A word longer than `width` is sliced into consecutive `width`-grapheme chunks; all full leading chunks become their own complete lines and the final remainder becomes the start of the next line (so a following short word can still share it). Alternative: force the remainder onto its own line too — rejected as it would waste horizontal space and isn't required. A word is only hard-split when `clusters.length > width`; anything that fits on a fresh line of its own is placed whole.
