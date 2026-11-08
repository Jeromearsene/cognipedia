/**
 * Returns a random permutation of `[0, 1, …, length - 1]` (Fisher–Yates).
 * `random` is injectable so tests can be deterministic.
 */
export const shuffledIndices = (length: number, random: () => number = Math.random): number[] => {
	const indices = Array.from({ length }, (_, i) => i);
	for (let i = indices.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[indices[i], indices[j]] = [indices[j], indices[i]];
	}
	return indices;
};
