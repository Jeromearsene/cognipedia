import { describe, expect, it, vi } from "vitest";
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

	it("only uses unambiguous characters (no I, O, 0 or 1)", () => {
		for (let i = 0; i < 200; i++) {
			expect(generateRecoveryCode().replace("COGNI-", "")).not.toMatch(/[IO01]/);
		}
	});

	it("draws its randomness from crypto.getRandomValues, not Math.random", () => {
		const mathRandom = vi.spyOn(Math, "random");
		const cryptoRandom = vi.spyOn(crypto, "getRandomValues");
		generateRecoveryCode();
		expect(cryptoRandom).toHaveBeenCalled();
		expect(mathRandom).not.toHaveBeenCalled();
		vi.restoreAllMocks();
	});

	it("generates different codes", () => {
		const codes = new Set(Array.from({ length: 50 }, () => generateRecoveryCode()));
		expect(codes.size).toBe(50);
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
