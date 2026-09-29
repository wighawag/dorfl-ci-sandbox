---
title: 'Text layout module: wrap, pad and align'
slug: text-layout-module-wrap-pad-and-align
issue: 4
origin: issue
originTrust: trusted
---

## Problem Statement

Users producing fixed-width terminal output (tables, boxed messages, aligned columns) have no helper for laying out text. They need to break text into width-bounded lines, pad lines to a fixed column, and align them — and they need widths measured the way a terminal renders them, so an emoji or an accented character counts as a single visible column rather than several code units. Today they hand-roll this with `String.length`, which miscounts multi-code-unit graphemes and produces misaligned output.

## Solution

A small text-layout module living next to the existing string helpers (`src/strings.js`), exporting three independently usable, independently tested functions built on a shared width primitive:

1. `wrap(text, width)` — break `text` into lines of at most `width` user-perceived characters, preferring to break at spaces. A word longer than `width` is split across lines (only when it cannot fit on a line of its own).
2. `pad(text, width, {align})` — pad a single line up to `width` with spaces, aligned `left` (default), `right`, or `center`. A line already at/over `width` is returned unchanged.
3. `layout(text, width, {align})` — compose the two: `wrap` the text, then `pad` every resulting line to `width` with the given alignment.

All width arithmetic (in `wrap`'s line accounting, `pad`'s fill count, `center` split) is measured in user-perceived characters — grapheme clusters — so an emoji or a base-char-plus-combining-accent counts as width 1. This measurement is the shared primitive the three functions rest on.

## User Stories

1. As a CLI author, I want `wrap(text, width)` to split a paragraph into lines no wider than `width`, breaking at spaces, so the output fits my terminal column.
2. As a CLI author, I want a word longer than `width` to be hard-split across lines only when it cannot fit alone, so no content is lost and normal words are never chopped.
3. As a CLI author, I want `wrap` to collapse the break-point whitespace cleanly so lines don't start or end with stray padding spaces.
4. As a CLI author, I want `pad(text, width, {align: 'left'})` to append spaces to the right so text sits flush-left in a fixed column.
5. As a CLI author, I want `pad(text, width, {align: 'right'})` to prepend spaces so text sits flush-right.
6. As a CLI author, I want `pad(text, width, {align: 'center'})` to split the padding between both sides (with a deterministic rule for the odd leftover space) so text is centred.
7. As a CLI author, I want `pad` to leave a line that already meets or exceeds `width` unchanged, so padding never truncates.
8. As a CLI author, I want `pad`'s alignment to default to `left` when I omit `align`.
9. As a CLI author, I want `layout(text, width, {align})` to wrap then pad every line, so I get a rectangular block of exactly-`width` lines in one call.
10. As an internationalisation-conscious author, I want widths measured in user-perceived characters so a line containing an emoji or a combining accent is counted as its visible width, not its code-unit length, and my columns stay aligned.
11. As a maintainer, I want each of `wrap`, `pad`, and `layout` usable and tested on its own, so the pieces compose but don't depend on each other's callers.

### Autonomy notes

The requirements are fully specified and agent-taskable — no `humanOnly` (no human decision gates the tasking) and no `needsAnswers` (no open questions block autonomous tasking). The grapheme-width primitive, the space-collapsing behaviour, and the center odd-space rule are ordinary implementation decisions to settle at tasking-time, not blocking ambiguities.

## Implementation Decisions

- New module beside `src/strings.js` (e.g. `src/layout.js`), exporting `wrap`, `pad`, `layout`.
- A shared width primitive measures user-perceived characters via grapheme-cluster segmentation (e.g. `Intl.Segmenter` with `granularity: 'grapheme'`), returning count of segments; both a base+combining sequence and a single emoji segment count as 1.
- `layout` is a thin composition of `wrap` + `pad` — it must not re-implement either.
- `pad` options object with `align` defaulting to `left`; `center` uses a fixed rule for the odd extra space (decide and document, e.g. extra space to the right).

## Testing Decisions

- Each function tested in isolation: `wrap` (space breaks, long-word split, exact-width boundary), `pad` (three alignments, default, no-truncate on over-width), `layout` (every line exactly `width`, composed correctly).
- Width behaviour tested with fixtures containing an emoji and a base-char-plus-combining-accent to prove they count as width 1 in wrapping, padding, and centring.
- Follow the existing test conventions in `test/`.

## Out of Scope

- Wide (double-cell) CJK/emoji width handling (treating a glyph as 2 columns) — this spec counts each grapheme as width 1 per the issue.
- ANSI escape / colour-code-aware width.
- Justification (stretching inter-word spaces) beyond the three specified alignments.
- Truncation/ellipsis of over-width lines.
