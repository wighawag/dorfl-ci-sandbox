/** Turn a phrase into a URL-safe slug: lower case, words joined by '-'. */
export function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Upper-case the first character of a string.
 * When `options.lowerRest` is truthy, the remainder is lower-cased too
 * (so `"hELLO"` -> `"Hello"`); otherwise the remainder is left as-is.
 */
export function capitalize(text, options = {}) {
	if (text.length === 0) {
		return text;
	}

	const rest = options.lowerRest ? text.slice(1).toLowerCase() : text.slice(1);
	return text[0].toUpperCase() + rest;
}
