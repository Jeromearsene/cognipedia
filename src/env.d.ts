/// <reference types="astro/client" />
/// <reference types="unplugin-icons/types/astro" />

declare namespace Cloudflare {
	interface Env {
		DB: D1Database;
	}
}

declare namespace App {
	interface Locals {
		/** Current locale detected from URL path. */
		locale: import("./i18n/i18n").Locale;
		/** Current URL pathname (e.g. `/fr/biais-ancrage`). */
		currentPath: string;
		/** Alternate-language URLs for the current page, used by the language switcher. */
		altLangHrefs?: Partial<Record<import("./i18n/i18n").Locale, string>>;
	}
}
