import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

/** Dedicated config for link-checking tests (network-dependent, not in CI). */
export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		include: ["src/content/__tests__/bias-links.test.ts"],
	},
});
