import { describe, expect, it } from "vitest";
import { getBiasId } from "./utils";

describe("getBiasId", () => {
	it("returns the content folder name from an entry id", () => {
		expect(getBiasId({ id: "anchoring/fr" })).toBe("anchoring");
	});

	it("is identical for every translation of the same bias", () => {
		expect(getBiasId({ id: "anchoring/fr" })).toBe(getBiasId({ id: "anchoring/en" }));
	});

	it("keeps hyphens of multi-word folder names", () => {
		expect(getBiasId({ id: "dunning-kruger/en" })).toBe("dunning-kruger");
	});
});
