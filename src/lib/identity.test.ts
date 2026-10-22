import { describe, expect, it } from "vitest";
import {
	generatePseudo,
	generateRecoveryCode,
	generateUUID,
	isValidRecoveryCode,
} from "./identity";

describe("generatePseudo", () => {
	it("returns a non-empty string", () => {
		const pseudo = generatePseudo();
		expect(pseudo.length).toBeGreaterThan(0);
	});

	it("generates different pseudos", () => {
		const pseudos = new Set(Array.from({ length: 20 }, () => generatePseudo()));
		expect(pseudos.size).toBeGreaterThan(1);
	});
});

describe("generateUUID", () => {
	it("returns a valid UUID v4 format", () => {
		const uuid = generateUUID();
		expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
	});
});

describe("generateRecoveryCode", () => {
	it("returns a code in format COGNI-XXXX-XXXX", () => {
		const code = generateRecoveryCode();
		expect(code).toMatch(/^COGNI-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
	});
});

describe("isValidRecoveryCode", () => {
	it("validates a correct code", () => {
		const code = generateRecoveryCode();
		expect(isValidRecoveryCode(code)).toBe(true);
	});

	it("rejects an invalid code", () => {
		expect(isValidRecoveryCode("INVALID")).toBe(false);
		expect(isValidRecoveryCode("")).toBe(false);
		expect(isValidRecoveryCode("COGNI-!!!!")).toBe(false);
	});
});
