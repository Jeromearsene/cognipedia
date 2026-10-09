import { beforeEach, describe, expect, it, vi } from "vitest";
import { localStorageMock, setupUserStoreMocks } from "./userStore.setup";

setupUserStoreMocks();

/** The store only reads localStorage when `window` exists (SSR guard), so fake it in Node. */
beforeEach(() => {
	vi.stubGlobal("window", globalThis);
});

describe("biasProgressStore — initial state", () => {
	it("has no seen or completed biases by default", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(false);
		expect(biasProgressStore.hasCompleted("anchoring")).toBe(false);
		expect(biasProgressStore.getStatus("anchoring")).toBe("new");
	});

	it("restores state from populated localStorage", async () => {
		localStorageMock.setItem("cognipedia_seen_biases", JSON.stringify(["anchoring"]));
		localStorageMock.setItem("cognipedia_completed_biases", JSON.stringify(["halo-effect"]));

		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(true);
		expect(biasProgressStore.getStatus("anchoring")).toBe("seen");
		expect(biasProgressStore.hasCompleted("halo-effect")).toBe(true);
		expect(biasProgressStore.getStatus("halo-effect")).toBe("completed");
	});

	it("starts fresh and warns when localStorage data is corrupted", async () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		localStorageMock.setItem("cognipedia_seen_biases", "not-json");

		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(false);
		expect(biasProgressStore.getStatus("anchoring")).toBe("new");
		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining("[biasProgressStore] Corrupted progress data"),
			expect.anything(),
		);
	});

	it("warns but keeps working when localStorage writes fail", async () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		localStorageMock.setItem.mockImplementation(() => {
			throw new Error("QuotaExceededError");
		});

		const { biasProgressStore } = await import("../seenBiasesStore.svelte");
		biasProgressStore.markSeen("anchoring");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(true);
		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining("Could not persist seen biases"),
			expect.anything(),
		);
	});
});

describe("biasProgressStore — markSeen()", () => {
	it("marks a bias as seen and persists to localStorage", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markSeen("anchoring");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(true);
		expect(biasProgressStore.getStatus("anchoring")).toBe("seen");
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"cognipedia_seen_biases",
			JSON.stringify(["anchoring"]),
		);
	});

	it("does not mark the bias as completed", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markSeen("anchoring");

		expect(biasProgressStore.hasCompleted("anchoring")).toBe(false);
	});

	it("is idempotent for an already-seen bias", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markSeen("anchoring");
		localStorageMock.setItem.mockClear();
		biasProgressStore.markSeen("anchoring");

		expect(localStorageMock.setItem).not.toHaveBeenCalled();
	});
});

describe("biasProgressStore — markCompleted()", () => {
	it("marks a bias as completed and persists to localStorage", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markCompleted("anchoring");

		expect(biasProgressStore.hasCompleted("anchoring")).toBe(true);
		expect(biasProgressStore.getStatus("anchoring")).toBe("completed");
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"cognipedia_completed_biases",
			JSON.stringify(["anchoring"]),
		);
	});

	it("also marks the bias as seen", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markCompleted("anchoring");

		expect(biasProgressStore.hasSeen("anchoring")).toBe(true);
		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"cognipedia_seen_biases",
			JSON.stringify(["anchoring"]),
		);
	});

	it("does not affect the status of other biases", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markCompleted("anchoring");

		expect(biasProgressStore.getStatus("halo-effect")).toBe("new");
	});
});

describe("biasProgressStore — getStatus()", () => {
	it("returns 'completed' over 'seen' when both apply", async () => {
		const { biasProgressStore } = await import("../seenBiasesStore.svelte");

		biasProgressStore.markSeen("anchoring");
		biasProgressStore.markCompleted("anchoring");

		expect(biasProgressStore.getStatus("anchoring")).toBe("completed");
	});
});
