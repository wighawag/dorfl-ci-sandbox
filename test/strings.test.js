import {test} from 'node:test';
import assert from 'node:assert/strict';
import {slugify, capitalize} from '../src/strings.js';

test('slugify joins words with dashes', () => {
	assert.equal(slugify('Hello, World!'), 'hello-world');
});

test('capitalize upper-cases the first character', () => {
	assert.equal(capitalize('dorfl'), 'Dorfl');
	assert.equal(capitalize(''), '');
});

test('capitalize leaves the remainder untouched by default', () => {
	assert.equal(capitalize('hELLO'), 'HELLO');
});

test('capitalize lower-cases the remainder with lowerRest', () => {
	assert.equal(capitalize('hELLO', {lowerRest: true}), 'Hello');
	assert.equal(capitalize('hello', {lowerRest: true}), 'Hello');
	assert.equal(capitalize('', {lowerRest: true}), '');
});
