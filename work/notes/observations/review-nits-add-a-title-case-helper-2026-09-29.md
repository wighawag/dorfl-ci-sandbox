---
title: review-gate non-blocking nits for 'add-a-title-case-helper' (Gate 2 approve)
date: 2026-09-29
status: open
reviewOf: add-a-title-case-helper
---

## Non-blocking review findings

The PR/code review gate (Gate 2) APPROVED 'add-a-title-case-helper' but raised the
following non-blocking findings (nits). They do not block integration; this
is their durable home for triage — promote-to-task / keep / delete.

- titleCase preserves surrounding/repeated whitespace and operates per whitespace-separated word via the \S+ regex — an in-scope choice the task did not spell out (it only gave the 'hello WORLD' example). It is the natural reading and is well-tested, so worth a quick human ratify, not a block.
  (src/title.js uses text.replace(/\S+/g, ...); test/title.test.js asserts '  hello   world  ' and tabs/newlines are preserved.)
- Sibling src/strings.js already exposes capitalize(text,{lowerRest:true}) which does exactly the per-word transform titleCase applies. titleCase reimplements first-upper/rest-lower inline rather than reusing that helper. Minor overlap; acceptable for a tiny standalone module but a candidate for reuse.
  (src/strings.js capitalize vs src/title.js word mapper.)
