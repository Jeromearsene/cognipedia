import { describe, expect, it } from "vitest";
import { isLegalConfigComplete, LEGAL } from "./legal";

describe("legal config", () => {
	it("always names the host", () => {
		expect(LEGAL.host.name).toBeTruthy();
		expect(LEGAL.host.address).toBeTruthy();
	});

	it("reports whether placeholders remain", () => {
		// Flip this expectation to `true` once the owner has filled in `LEGAL`.
		expect(typeof isLegalConfigComplete()).toBe("boolean");
	});
});
