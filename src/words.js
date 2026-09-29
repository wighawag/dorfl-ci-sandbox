/**
 * Count the number of whitespace-separated words in a string.
 *
 * Words are runs of non-whitespace characters; any leading, trailing, or
 * repeated whitespace between them is ignored. An empty or blank string (one
 * that is empty or contains only whitespace) has zero words.
 */
export function countWords(text) {
	const trimmed = text.trim();
	if (trimmed === '') {
		return 0;
	}

	return trimmed.split(/\s+/).length;
}
