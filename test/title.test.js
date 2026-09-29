import {test} from 'node:test';
import assert from 'node:assert/strict';
import {titleCase} from '../src/title.js';

test('titleCase upper-cases the first letter and lower-cases the rest of each word', () => {
	assert.equal(titleCase('hello WORLD'), 'Hello World');
	assert.equal(titleCase('the QUICK brown fOX'), 'The Quick Brown Fox');
	assert.equal(titleCase('single'), 'Single');
});

test('titleCase returns an empty string for empty input', () => {
	assert.equal(titleCase(''), '');
});

test('titleCase preserves surrounding and repeated whitespace', () => {
	assert.equal(titleCase('  hello   world  '), '  Hello   World  ');
	assert.equal(titleCase('a\tb\nc'), 'A\tB\nC');
});
