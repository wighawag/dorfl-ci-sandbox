---
title: review-gate non-blocking nits for 'add-a-count-words-helper' (Gate 2 approve)
date: 2026-09-29
status: open
reviewOf: add-a-count-words-helper
needsAnswers: true
---

## Non-blocking review findings

The PR/code review gate (Gate 2) APPROVED 'add-a-count-words-helper' but raised the
following non-blocking findings (nits). They do not block integration; this
is their durable home for triage — promote-to-task / keep / delete.

- countWords(text) will throw a TypeError on non-string input (e.g. undefined/null) since it calls text.trim() directly. Was defensive handling of non-string input intended, or is a string contract assumed?
  (src/words.js: const trimmed = text.trim(); The task specifies text as a string, so this is an assumed-contract decision, not a defect.)
