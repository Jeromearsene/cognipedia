import { describe, expect, it } from "vitest";
import { getLocaleFromUrl, getLocalizedPath, t } from "./i18n";

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
