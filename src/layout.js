/**
 * Shared grapheme-width primitive for the text-layout helpers.
 *
 * `graphemes` splits a string into user-perceived characters (grapheme
 * clusters) using `Intl.Segmenter` with `granularity: 'grapheme'`, so an emoji
 * or a base letter plus a combining accent stays a single unit. `width`
 * measures a string in those clusters — the count the `wrap`, `pad` and
 * `layout` helpers all do their arithmetic in, rather than `String.length`
 * (which miscounts multi-code-unit graphemes).
 */
export function graphemes(text) {
	const segmenter = new Intl.Segmenter(undefined, {granularity: 'grapheme'});
	const clusters = [];
	for (const {segment} of segmenter.segment(text)) {
		clusters.push(segment);
	}

	return clusters;
}

/** Measure a string in user-perceived characters (grapheme clusters). */
export function width(text) {
	return graphemes(text).length;
}

/**
 * Break `text` into an array of lines each at most `width` grapheme clusters
 * wide, preferring to break at spaces.
 *
 * Break-point whitespace is collapsed: `text` is split on runs of whitespace
 * so no returned line begins or ends with a stray space. A word longer than
 * `width` is hard-split into `width`-wide chunks, but only when it cannot fit
 * on a line of its own — a normal word that would fit on the next line is
 * placed there whole rather than chopped.
 */
export function wrap(text, width) {
	const words = text.split(/\s+/).filter((word) => word.length > 0);
	const lines = [];
	let current = [];
	let currentWidth = 0;

	const flush = () => {
		if (current.length > 0) {
			lines.push(current.join(''));
			current = [];
			currentWidth = 0;
		}
	};

	for (const word of words) {
		const clusters = graphemes(word);

		// Word fits on the current line after a separating space (or starts it).
		const separator = currentWidth > 0 ? 1 : 0;
		if (currentWidth + separator + clusters.length <= width) {
			if (separator) {
				current.push(' ');
				currentWidth += 1;
			}

			current.push(word);
			currentWidth += clusters.length;
			continue;
		}

		// Does not fit here; start a fresh line for it.
		flush();

		if (clusters.length <= width) {
			current.push(word);
			currentWidth = clusters.length;
			continue;
		}

		// Too long for any line: hard-split into width-wide chunks.
		for (let i = 0; i < clusters.length; i += width) {
			const chunk = clusters.slice(i, i + width);
			if (i + width < clusters.length) {
				lines.push(chunk.join(''));
			} else {
				current = [chunk.join('')];
				currentWidth = chunk.length;
			}
		}
	}

	flush();
	return lines;
}
