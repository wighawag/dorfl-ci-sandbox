import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reverse} from '../src/reverse.js';

test('reverse flips simple ASCII', () => {
	assert.equal(reverse('abc'), 'cba');
	assert.equal(reverse(''), '');
});

test('reverse keeps a combining accent intact', () => {
	// "é" as base "e" + combining acute accent (U+0301).
	const input = 'abe\u0301';
	const result = reverse(input);
	// The accented "e" must stay whole and come first.
	assert.equal(result, 'e\u0301ba');
});

test('reverse keeps an emoji intact', () => {
	// Family emoji built from several code points joined by ZWJ.
	const family = '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}';
	const input = `a${family}b`;
	assert.equal(reverse(input), `b${family}a`);
});
