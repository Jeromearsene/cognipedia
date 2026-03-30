import { afterEach, beforeEach, vi } from "vitest";

/** Minimal localStorage mock for Node environment. */
export const createLocalStorageMock = () => {
	const store = new Map<string, string>();
	return {
		getItem: vi.fn((key: string) => store.get(key) ?? null),
		setItem: vi.fn((key: string, value: string) => store.set(key, value)),
		removeItem: vi.fn((key: string) => store.delete(key)),
		clear: vi.fn(() => store.clear()),
		get length() {
			return store.size;
		},
		key: vi.fn((_index: number) => null),
	};
};

export let localStorageMock: ReturnType<typeof createLocalStorageMock>;

/** Sets up localStorage mock. Call in each test file's top-level scope. */
export const setupUserStoreMocks = () => {
	beforeEach(() => {
		vi.resetModules();
		localStorageMock = createLocalStorageMock();
		vi.stubGlobal("localStorage", localStorageMock);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});
};
