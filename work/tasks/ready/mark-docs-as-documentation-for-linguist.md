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
