---
title: review-gate non-blocking nits for 'text-layout-wrap' (Gate 2 approve)
date: 2026-09-29
status: open
reviewOf: text-layout-wrap
---

## Non-blocking review findings

The PR/code review gate (Gate 2) APPROVED 'text-layout-wrap' but raised the
following non-blocking findings (nits). They do not block integration; this
is their durable home for triage — promote-to-task / keep / delete.

- wrap collapses tabs and hard newlines into single break points, so input paragraph breaks are not preserved (text treated as fully reflowable). Ratify this default.
  (Recorded in the Decisions block; spec only says 'break at spaces'. Reasonable for a reflow helper and touches nothing outside wrap, but is a user-visible behaviour worth a human nod.)
