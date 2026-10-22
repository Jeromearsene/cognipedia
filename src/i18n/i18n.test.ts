import { describe, expect, it } from "vitest";
import {
	DEFAULT_LOCALE,
	getLocaleFromAcceptLanguage,
	getLocaleFromUrl,
	getLocalizedPath,
	getSlug,
	isLocale,
	SUPPORTED_LOCALES,
	slugToLocaleMap,
} from "./i18n";

describe("locale constants", () => {
	it("exports supported locales", () => {
		expect(SUPPORTED_LOCALES).toContain("fr");
		expect(SUPPORTED_LOCALES).toContain("en");
	});

	it("exports default locale as fr", () => {
		expect(DEFAULT_LOCALE).toBe("fr");
	});
});

describe("isLocale", () => {
	it("returns true for supported locales", () => {
		expect(isLocale("fr")).toBe(true);
		expect(isLocale("en")).toBe(true);
	});

	it("returns false for unsupported values", () => {
		expect(isLocale("zz")).toBe(false);
		expect(isLocale("")).toBe(false);
	});
});

describe("getLocaleFromUrl", () => {
	it("extracts fr from /fr/some-page", () => {
		expect(getLocaleFromUrl(new URL("https://x.com/fr/some-page"))).toBe("fr");
	});

	it("extracts en from /en/some-page", () => {
		expect(getLocaleFromUrl(new URL("https://x.com/en/some-page"))).toBe("en");
	});

	it("defaults to fr for unknown locale", () => {
		expect(getLocaleFromUrl(new URL("https://x.com/zz/some-page"))).toBe("fr");
	});
});

describe("getLocalizedPath", () => {
	it("builds a localized path", () => {
		expect(getLocalizedPath("en", "/about")).toBe("/en/about");
	});

	it("builds a localized path for default locale", () => {
		expect(getLocalizedPath("fr", "/about")).toBe("/fr/about");
	});
});

describe("getLocaleFromAcceptLanguage", () => {
	it("detects fr from French browser", () => {
		expect(getLocaleFromAcceptLanguage("fr-FR,fr;q=0.9,en;q=0.8")).toBe("fr");
	});

	it("detects en from English browser", () => {
		expect(getLocaleFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
	});

	it("picks the first supported locale", () => {
		expect(getLocaleFromAcceptLanguage("de,en;q=0.8,fr;q=0.5")).toBe("en");
	});

	it("falls back to default for unsupported languages", () => {
		expect(getLocaleFromAcceptLanguage("ja,zh;q=0.9")).toBe("fr");
	});

	it("falls back to default for null header", () => {
		expect(getLocaleFromAcceptLanguage(null)).toBe("fr");
	});
});

describe("getSlug", () => {
	it("returns the localized slug for a key", () => {
		expect(getSlug("leaderboard", "fr")).toBe("classement");
		expect(getSlug("leaderboard", "en")).toBe("leaderboard");
		expect(getSlug("about", "fr")).toBe("a-propos");
		expect(getSlug("about", "en")).toBe("about");
		expect(getSlug("bias", "fr")).toBe("biais");
		expect(getSlug("bias", "en")).toBe("bias");
	});
});

describe("slugToLocaleMap", () => {
	it("maps French slugs to their key and locale", () => {
		expect(slugToLocaleMap.get("classement")).toEqual({ key: "leaderboard", locale: "fr" });
		expect(slugToLocaleMap.get("a-propos")).toEqual({ key: "about", locale: "fr" });
		expect(slugToLocaleMap.get("biais")).toEqual({ key: "bias", locale: "fr" });
	});

	it("maps English slugs to their key and locale", () => {
		expect(slugToLocaleMap.get("leaderboard")).toEqual({ key: "leaderboard", locale: "en" });
		expect(slugToLocaleMap.get("about")).toEqual({ key: "about", locale: "en" });
		expect(slugToLocaleMap.get("bias")).toEqual({ key: "bias", locale: "en" });
	});
});
