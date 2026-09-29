import {test} from 'node:test';
import assert from 'node:assert/strict';
import {wrap, width, graphemes} from '../src/layout.js';

test('width measures user-perceived characters, not code units', () => {
	assert.equal(width('hello'), 5);
	// Emoji is a single grapheme despite being several code units.
	assert.equal(width('👍'), 1);
	// Base letter plus a combining acute accent is a single grapheme.
	assert.equal(width('e\u0301'), 1);
});

test('graphemes splits into user-perceived characters', () => {
	assert.deepEqual(graphemes('a👍e\u0301'), ['a', '👍', 'e\u0301']);
});

test('wrap breaks at spaces within the width', () => {
	assert.deepEqual(wrap('the quick brown fox', 9), ['the quick', 'brown fox']);
});

test('wrap collapses break-point whitespace with no stray edge spaces', () => {
	const lines = wrap('  the   quick   brown  ', 9);
	assert.deepEqual(lines, ['the quick', 'brown']);
	for (const line of lines) {
		assert.equal(line, line.trim());
	}
});

test('wrap places a normal word on the next line rather than chopping it', () => {
	// "brown" fits on a line of its own, so it is never split.
	assert.deepEqual(wrap('hi brown', 5), ['hi', 'brown']);
});

test('wrap hard-splits a word longer than width', () => {
	assert.deepEqual(wrap('abcdefghij', 4), ['abcd', 'efgh', 'ij']);
});

test('wrap hard-splits an over-long word but keeps following words whole', () => {
	assert.deepEqual(wrap('abcdefg hi', 4), ['abcd', 'efg', 'hi']);
});

test('wrap respects the exact-width boundary', () => {
	// A word exactly `width` wide fills its own line and is not split.
	assert.deepEqual(wrap('abcde fg', 5), ['abcde', 'fg']);
	// Two words that together exactly hit width share a line.
	assert.deepEqual(wrap('ab cd', 5), ['ab cd']);
});

test('wrap measures grapheme width for an emoji line', () => {
	// Each emoji counts as width 1, so three fit on a width-3 line.
	assert.deepEqual(wrap('👍👍👍 x', 3), ['👍👍👍', 'x']);
});

test('wrap measures grapheme width for a combining-accent line', () => {
	// Three accented letters count as width 3, fitting a width-3 line.
	const accented = 'e\u0301e\u0301e\u0301';
	assert.deepEqual(wrap(`${accented} x`, 3), [accented, 'x']);
});

test('wrap returns an empty array for whitespace-only input', () => {
	assert.deepEqual(wrap('', 5), []);
	assert.deepEqual(wrap('   ', 5), []);
});
