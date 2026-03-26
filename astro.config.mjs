// @ts-check

import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
export default defineConfig({
	site: "https://cognipedia.org",
	integrations: [svelte()],
	vite: {
		plugins: [tailwindcss(), Icons({ compiler: "astro" })],
	},
	output: "server",
	adapter: cloudflare({
		imageService: "compile",
	}),
	i18n: {
		defaultLocale: "fr",
		locales: ["fr", "en", "es"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
});
