---
title: review-gate non-blocking nits for 'text-layout-pad' (Gate 2 approve)
date: 2026-09-29
status: open
reviewOf: text-layout-pad
---

## Non-blocking review findings

The PR/code review gate (Gate 2) APPROVED 'text-layout-pad' but raised the
following non-blocking findings (nits). They do not block integration; this
is their durable home for triage — promote-to-task / keep / delete.

- Ratify the center odd-space default: extra space goes to the RIGHT (left=floor(fill/2), right=remainder), a user-visible output default local to pad that layout/compose will inherit.
  (Recorded in the Decisions block and JSDoc at src/layout.js pad(); matches the task-suggested rule; local to pad, does not touch wrap.)
