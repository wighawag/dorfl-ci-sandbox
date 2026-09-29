/**
 * Convert a string to title case.
 *
 * Every whitespace-separated word has its first letter upper-cased and the
 * rest lower-cased (`'hello WORLD'` becomes `'Hello World'`). The original
 * whitespace between and around words is preserved, and an empty string
 * returns an empty string.
 */
export function titleCase(text) {
	return text.replace(
		/\S+/g,
		(word) => word[0].toUpperCase() + word.slice(1).toLowerCase(),
	);
}
