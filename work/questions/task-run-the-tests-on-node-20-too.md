<!-- dorfl-sidecar: item=task:run-the-tests-on-node-20-too type=task slug=run-the-tests-on-node-20-too allAnswered=false -->

## Q1

**'task:run-the-tests-on-node-20-too' was bounced — how should we proceed?**

> The task asks me to hand-edit `.github/workflows/verify.yml` to add an `actions/setup-node` matrix step over Node 20/22 before the tests, but two premises in the code contradict this:
>
> 1. That file is a `dorfl install-ci`-EMITTED artifact whose header explicitly says "DO NOT hand-edit a copy — re-run install-ci to upgrade"; its sole documented purpose is to emit the required `verify` check by running `dorfl verify`. Hand-editing it violates that contract; the sanctioned change path is re-running install-ci (out of scope here).
>
> 2. The tests are not run by a plain node in the workflow — they run via `dorfl verify` (= `npm test`). Node is provisioned inside `./.github/actions/dorfl-setup`, which UNCONDITIONALLY runs `actions/setup-node@…` pinned to `node-version: '22'` and then `npm install -g` the `dorfl` CLI + `pi` harness under Node 22. So: a matrix `setup-node` placed BEFORE `dorfl-setup` is overridden back to Node 22 (the "Node 20" leg silently runs on 22 — green but false coverage); placed AFTER `dorfl-setup` it switches the active Node to 20, but the globally-installed `dorfl`/`pi` (installed under Node 22) drop off PATH and `dorfl verify` fails with command-not-found. No ordering of "add a setup-node step before the tests" produces genuine Node-20 test execution while keeping the gate working, because dorfl-setup force-pins Node 22 for the CLI it must run.
>
> Suggested re-scope: either (a) add multi-Node support to `dorfl install-ci` itself so the generated `verify.yml` + `dorfl-setup` can run a project Node matrix without hard-pinning Node 22 for the test run (a dorfl change, not a hand-edit of the generated file), or (b) add a SEPARATE non-generated project workflow (e.g. `.github/workflows/node-matrix.yml`) that runs `npm test` directly across Node 20/22, leaving the dorfl-owned required `verify` check untouched. This needs a human design decision on whether the required `verify` context itself must be multi-Node.

<!-- q1 fields: id=q1 kind=stuck -->

**Your answer** (write below this line):
