import { resolve } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		include: ["src/**/*.test.ts"],
		exclude: ["src/content/__tests__/bias-links.test.ts"],
		passWithNoTests: true,
	},
});
