const SEEN_KEY = "cognipedia_seen_biases";
const COMPLETED_KEY = "cognipedia_completed_biases";

/**
 * Reactive store tracking bias progression:
 * - "seen" = user visited the bias page (localStorage only)
 * - "completed" = user finished the quiz (localStorage, synced with D1 via scores API)
 */
const createBiasProgressStore = () => {
	let seen = $state(new Set<string>());
	let completed = $state(new Set<string>());
	let loaded = false;

	/** Reads progression from localStorage. Idempotent — safe to call multiple times. */
	const load = () => {
		if (loaded || typeof window === "undefined") return;
		try {
			const rawSeen = localStorage.getItem(SEEN_KEY);
			if (rawSeen) seen = new Set(JSON.parse(rawSeen));
			const rawCompleted = localStorage.getItem(COMPLETED_KEY);
			if (rawCompleted) completed = new Set(JSON.parse(rawCompleted));
		} catch {
			/* corrupted data — start fresh */
		}
		loaded = true;
	};

	const persistSeen = () => {
		try {
			localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
		} catch {
			/* storage full or unavailable */
		}
	};

	const persistCompleted = () => {
		try {
			localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed]));
		} catch {
			/* storage full or unavailable */
		}
	};

	/** Mark a bias as seen (visited the page). */
	const markSeen = (slug: string) => {
		load();
		if (seen.has(slug)) return;
		seen = new Set(seen).add(slug);
		persistSeen();
	};

	/** Mark a bias as completed (quiz finished). */
	const markCompleted = (slug: string) => {
		load();
		if (completed.has(slug)) return;
		completed = new Set(completed).add(slug);
		persistCompleted();
	};

	const hasSeen = (slug: string): boolean => {
		load();
		return seen.has(slug);
	};

	const hasCompleted = (slug: string): boolean => {
		load();
		return completed.has(slug);
	};

	/** Returns the status of a bias: "completed" > "seen" > "new". */
	const getStatus = (slug: string): "completed" | "seen" | "new" => {
		load();
		if (completed.has(slug)) return "completed";
		if (seen.has(slug)) return "seen";
		return "new";
	};

	return {
		markSeen,
		markCompleted,
		hasSeen,
		hasCompleted,
		getStatus,
	};
};

export const biasProgressStore = createBiasProgressStore();
