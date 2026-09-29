/**
 * Reverse a string by user-perceived character (grapheme cluster), so an
 * emoji or a letter with a combining accent stays whole.
 *
 * Uses `Intl.Segmenter` with `granularity: 'grapheme'` to split the text into
 * grapheme clusters before reversing, avoiding the broken output you get from
 * reversing raw code units or code points.
 */
export function reverse(text) {
	const segmenter = new Intl.Segmenter(undefined, {granularity: 'grapheme'});
	const graphemes = [];
	for (const {segment} of segmenter.segment(text)) {
		graphemes.push(segment);
	}

	return graphemes.reverse().join('');
}
