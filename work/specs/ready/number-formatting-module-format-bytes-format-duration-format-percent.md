---
title: 'Number formatting module: formatBytes, formatDuration, formatPercent'
slug: number-formatting-module-format-bytes-format-duration-format-percent
issue: 15
origin: issue
originTrust: trusted
---

## Problem Statement

The codebase lacks reusable helpers for turning raw numbers into human-readable strings. Sizes, durations, and ratios are the three most common cases, and each currently gets hand-rolled at call sites, leading to inconsistent output. We want a single `src/format.js` module that centralizes these formatting concerns.

## Solution

Add a `src/format.js` module exposing three independent, pure helper functions, each covered by its own tests in `test/format.test.js`:

1. `formatBytes(n)` — human-readable sizes using binary units (`B`, `KiB`, `MiB`, `GiB`). One decimal place is used above bytes; e.g. `formatBytes(1536)` returns `'1.5 KiB'`.
2. `formatDuration(ms)` — compact durations such as `'1h 2m 3s'`, omitting zero units, and returning `'0s'` for a zero input.
3. `formatPercent(ratio, digits = 0)` — percentage strings; e.g. `formatPercent(0.1234, 1)` returns `'12.3%'`.

The three helpers share the theme of a common formatting module and consistent output conventions, but are independent enough to be built, tested, and reviewed as separate tasks.

## User Stories

- As a developer, I can call `formatBytes(n)` to display file/data sizes in binary units with sensible precision.
- As a developer, I can call `formatDuration(ms)` to render elapsed time compactly, without noisy zero units.
- As a developer, I can call `formatPercent(ratio, digits)` to display ratios as percentages with a configurable number of decimals.

## Out of Scope

- Localization / i18n (locale-specific separators, unit names).
- Decimal (SI) byte units (`KB`, `MB`) — only binary units are required.
- Units beyond `GiB` for `formatBytes` and beyond hours for `formatDuration` unless a task chooses to extend them.
- Wiring these helpers into existing call sites (a later, separate concern).
