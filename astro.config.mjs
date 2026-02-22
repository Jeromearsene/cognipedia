// @ts-check

import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [svelte()],
	output: "server",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	i18n: {
		defaultLocale: "fr",
		locales: ["fr", "en", "es"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
});
