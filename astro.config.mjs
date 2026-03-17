// @ts-check

import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
	integrations: [svelte(), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
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
