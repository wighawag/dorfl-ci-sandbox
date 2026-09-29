/** Turn a phrase into a URL-safe slug: lower case, words joined by '-'. */
export function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Upper-case the first character of a string. */
export function capitalize(text) {
	return text.length === 0 ? text : text[0].toUpperCase() + text.slice(1);
}
