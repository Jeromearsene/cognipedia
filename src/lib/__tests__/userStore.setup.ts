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

/** Cookie mock that captures the last value set. */
export const createCookieMock = () => {
	let cookieStore = "";
	return {
		get value() {
			return cookieStore;
		},
		stub: {
			get cookie() {
				return cookieStore;
			},
			set cookie(value: string) {
				cookieStore = value;
			},
		},
	};
};

export let localStorageMock: ReturnType<typeof createLocalStorageMock>;
export let cookieMock: ReturnType<typeof createCookieMock>;

/** Sets up localStorage and document.cookie mocks. Call in each test file's top-level scope. */
export const setupUserStoreMocks = () => {
	beforeEach(() => {
		vi.resetModules();
		localStorageMock = createLocalStorageMock();
		cookieMock = createCookieMock();
		vi.stubGlobal("localStorage", localStorageMock);
		vi.stubGlobal("document", cookieMock.stub);
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});
};
