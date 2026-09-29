---
title: 'Run the verify workflow on Node 20 as well as the default'
slug: run-the-tests-on-node-20-too
blockedBy: []
needsAnswers: true
---

## What to build

Our users run Node 20. Edit `.github/workflows/verify.yml` so the verify job runs as a matrix over Node 20 and Node 22 (add an `actions/setup-node` step using the matrix version before the tests).

## Acceptance criteria

- [ ] `.github/workflows/verify.yml` runs the tests on Node 20 and Node 22.
- [ ] `npm test` is green.

## Prompt

> Change `.github/workflows/verify.yml` to test on Node 20 and 22 as described.
