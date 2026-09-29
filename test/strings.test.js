import {test} from 'node:test';
import assert from 'node:assert/strict';
import {slugify, capitalize, truncate} from '../src/strings.js';

test('slugify joins words with dashes', () => {
	assert.equal(slugify('Hello, World!'), 'hello-world');
});

test('capitalize upper-cases the first character', () => {
	assert.equal(capitalize('dorfl'), 'Dorfl');
	assert.equal(capitalize(''), '');
});

test('truncate leaves short-enough text unchanged', () => {
	assert.equal(truncate('hello', 10), 'hello');
	assert.equal(truncate('hello', 5), 'hello');
});

test('truncate cuts long text to exactly max with a single ellipsis', () => {
	const result = truncate('hello world', 5);
	assert.equal(result, 'hell…');
	assert.equal(result.length, 5);
	assert.equal(result.endsWith('…'), true);
	assert.equal((result.match(/…/g) || []).length, 1);
});

test('truncate throws RangeError when max is below 1', () => {
	assert.throws(() => truncate('x', 0), RangeError);
	assert.throws(() => truncate('x', -3), RangeError);
});
