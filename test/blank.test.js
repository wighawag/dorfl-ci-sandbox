import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isBlank} from '../src/blank.js';

test('isBlank is true for empty and whitespace-only strings', () => {
	assert.equal(isBlank(''), true);
	assert.equal(isBlank('   '), true);
	assert.equal(isBlank('\t\n '), true);
});

test('isBlank is false for strings with non-whitespace content', () => {
	assert.equal(isBlank('a'), false);
	assert.equal(isBlank('  x  '), false);
	assert.equal(isBlank('hello'), false);
});
