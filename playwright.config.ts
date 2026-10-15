import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the accessibility (axe-core) audit.
 * Expects a server already running at `BASE_URL` (see `.github/workflows/ci.yml`,
 * job "accessibility", or run `pnpm wrangler dev` locally and set BASE_URL yourself).
 */
export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
	use: {
		baseURL: process.env.BASE_URL ?? "http://localhost:8790",
		trace: "retain-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
