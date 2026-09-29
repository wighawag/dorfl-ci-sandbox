import {test} from 'node:test';
import assert from 'node:assert/strict';
import {countWords} from '../src/words.js';

test('countWords counts whitespace-separated words', () => {
	assert.equal(countWords('hello world'), 2);
	assert.equal(countWords('one two three four'), 4);
	assert.equal(countWords('single'), 1);
});

test('countWords returns 0 for empty or blank input', () => {
	assert.equal(countWords(''), 0);
	assert.equal(countWords('   '), 0);
	assert.equal(countWords('\t\n '), 0);
});

test('countWords ignores leading, trailing, and repeated whitespace', () => {
	assert.equal(countWords('  hello   world  '), 2);
	assert.equal(countWords('a\tb\nc'), 3);
});
