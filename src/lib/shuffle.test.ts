import { describe, expect, it } from "vitest";
import { shuffledIndices } from "./shuffle";

describe("shuffledIndices", () => {
	it("returns a permutation of 0..length-1", () => {
		const result = shuffledIndices(6);
		expect(result).toHaveLength(6);
		expect([...result].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5]);
	});

	it("handles empty and single-item inputs", () => {
		expect(shuffledIndices(0)).toEqual([]);
		expect(shuffledIndices(1)).toEqual([0]);
	});

	it("is deterministic for a given random source", () => {
		const fixed = () => 0;
		expect(shuffledIndices(4, fixed)).toEqual(shuffledIndices(4, fixed));
		// random() === 0 always swaps with index 0: [0,1,2,3] → [1,2,3,0]
		expect(shuffledIndices(4, fixed)).toEqual([1, 2, 3, 0]);
	});

	it("can place the first item elsewhere", () => {
		const seen = new Set<number>();
		for (let n = 0; n < 200; n++) seen.add(shuffledIndices(4)[0]);
		expect(seen.size).toBeGreaterThan(1);
	});
});
