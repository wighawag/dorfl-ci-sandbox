---
title: 'Mark markdown files as documentation for GitHub linguist'
slug: mark-docs-as-documentation-for-linguist
blockedBy: []
needsAnswers: true
---

## What to build

Add a `.gitattributes` file at the repository root with the line `*.md linguist-documentation` so GitHub language statistics ignore the docs.

## Acceptance criteria

- [ ] A root `.gitattributes` holds `*.md linguist-documentation`.
- [ ] `npm test` is green.

## Prompt

> Add a `.gitattributes` file at the repository root with the line `*.md linguist-documentation` so GitHub language statistics ignore the docs.

## Applied answers 2026-09-29

### q1: 'task:mark-docs-as-documentation-for-linguist' was bounced — how should we proceed?

keep (re-test with dorfl main@071cb5a1: the protected-path rejection should end the run green)
