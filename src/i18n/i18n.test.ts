import { describe, expect, it } from "vitest";
import {
	DEFAULT_LOCALE,
	getLocaleFromUrl,
	getLocalizedPath,
	isLocale,
	SUPPORTED_LOCALES,
	t,
	tRaw,
} from "./i18n";

describe("locale constants", () => {
	it("exports supported locales derived from translation files", () => {
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

describe("t", () => {
	it("returns the translated string for a known key", () => {
		expect(t("fr", "site.title")).toBe("Cognipedia");
	});

	it("returns the key itself if not found", () => {
		expect(t("fr", "nonexistent.key")).toBe("nonexistent.key");
	});

	it("returns english translation", () => {
		expect(t("en", "site.title")).toBe("Cognipedia");
	});

	it("throws when the value is not a string", () => {
		expect(() => t("fr", "error.404.messages")).toThrow("is not a string");
	});
});

describe("tRaw", () => {
	it("returns arrays for array-valued keys", () => {
		const messages = tRaw("fr", "error.404.messages");
		expect(Array.isArray(messages)).toBe(true);
	});

	it("returns strings for string-valued keys", () => {
		expect(tRaw("fr", "site.title")).toBe("Cognipedia");
	});

	it("returns undefined for missing keys", () => {
		expect(tRaw("fr", "nonexistent.key")).toBeUndefined();
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

describe("localized slugs in i18n", () => {
	it("has slug.leaderboard for all locales", () => {
		for (const locale of SUPPORTED_LOCALES) {
			expect(t(locale, "slug.leaderboard")).not.toBe("slug.leaderboard");
		}
	});

	it("has slug.about for all locales", () => {
		for (const locale of SUPPORTED_LOCALES) {
			expect(t(locale, "slug.about")).not.toBe("slug.about");
		}
	});
});
