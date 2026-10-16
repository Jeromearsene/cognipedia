import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, type Page, test } from "@playwright/test";
import type { Result } from "axe-core";

/**
 * Pages that need no interaction to reach their audited state — scanned
 * as soon as they finish loading. Covers both locales plus every top-level
 * route, since Lighthouse CI only checks `/fr/` and `/fr/biais/ancrage`.
 */
const STATIC_PAGES: { name: string; path: string }[] = [
	{ name: "Home (fr)", path: "/fr/" },
	{ name: "Home (en)", path: "/en/" },
	{ name: "Bias page (fr)", path: "/fr/biais/ancrage" },
	{ name: "Bias page (en)", path: "/en/bias/anchoring" },
	{ name: "About (fr)", path: "/fr/a-propos" },
	{ name: "About (en)", path: "/en/about" },
	{ name: "Leaderboard (fr)", path: "/fr/classement" },
	{ name: "Leaderboard (en)", path: "/en/leaderboard" },
	{ name: "Profile, unregistered (fr)", path: "/fr/profil" },
];

/** Formats axe violations into a readable Playwright assertion message. */
const describeViolations = (violations: Result[]): string =>
	violations
		.map((violation) => {
			const nodes = violation.nodes.map((node) => `    - ${node.target.join(" ")}`).join("\n");
			return `[${violation.impact}] ${violation.id}: ${violation.help}\n  ${violation.helpUrl}\n${nodes}`;
		})
		.join("\n\n");

/** Runs axe-core against the current page state, scoped to WCAG 2.1 A/AA + best practices. */
const runAxe = async (page: Page): Promise<Result[]> => {
	const { violations } = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
		.analyze();
	return violations;
};

const expectNoViolations = (violations: Result[]) => {
	expect(violations, describeViolations(violations)).toEqual([]);
};

/**
 * Clicks the first enabled button inside `quiz` and waits for it to actually
 * take effect, retrying the click if needed.
 *
 * The quiz is a `client:load` Astro/Svelte island: its markup is present
 * (and "clickable" as far as Playwright's actionability checks go) before
 * Svelte has finished hydrating and attaching event listeners, so a single
 * click can silently no-op. Re-clicking until the enabled-button count
 * changes rides out that hydration window without a fixed sleep.
 */
const clickAndAdvance = async (quiz: Locator) => {
	const before = await quiz.locator("button:not(:disabled)").count();
	await expect(async () => {
		await quiz.locator("button:not(:disabled)").first().click();
		expect(await quiz.locator("button:not(:disabled)").count()).not.toBe(before);
	}).toPass({ timeout: 10_000 });
};

for (const { name, path } of STATIC_PAGES) {
	test(`${name} has no axe violations`, async ({ page }) => {
		await page.goto(path);
		expectNoViolations(await runAxe(page));
	});
}

test("quiz answer-revealed state has no axe violations", async ({ page }) => {
	await page.goto("/fr/biais/ancrage");

	const quiz = page.locator("#quiz");
	await clickAndAdvance(quiz); // pick the first choice, revealing the explanation
	await expect(quiz.locator("button:not(:disabled)")).toBeVisible();

	expectNoViolations(await runAxe(page));
});

test("recovery-code modal (shown after completing a quiz) has no axe violations", async ({
	page,
}) => {
	await page.goto("/fr/biais/ancrage");

	const quiz = page.locator("#quiz");
	// Scoped to the final-score markup specifically (`<p class="text-3xl
	// font-bold">`). A looser "digit / digit" text match also catches the
	// "1 / 2" question-progress indicator shown on every unanswered
	// question, which made the loop below think the quiz was already done.
	const finalScore = quiz.locator("p.text-3xl.font-bold");

	// Click through every question: pick the first available choice, then advance.
	// A fresh browser context has no quiz state, so this loop always terminates
	// once the final score is shown — capped as a safety net against a regression.
	for (let i = 0; i < 20 && !(await finalScore.isVisible()); i++) {
		await clickAndAdvance(quiz); // pick a choice
		await clickAndAdvance(quiz); // advance to the next question (or the results)
	}
	await expect(finalScore).toBeVisible();

	// Completing the quiz registers a new user and submits a score, which
	// opens the recovery-code modal for a first-time visitor.
	const modal = page.getByRole("dialog");
	await expect(modal).toBeVisible({ timeout: 15_000 });

	expectNoViolations(await runAxe(page));
});

test("recovery form invalid-code error state has no axe violations", async ({ page }) => {
	await page.goto("/fr/profil");

	const form = page.locator("form");
	const error = page.locator(".text-red-600").first();
	// Same hydration race as clickAndAdvance above: fill + submit are retried
	// together until the client-side validation actually runs and the error
	// message shows up, in case either lands before Svelte attaches its
	// bind:value/onsubmit handlers.
	await expect(async () => {
		await form.locator("input").fill("not-a-valid-code");
		await form.locator("button[type=submit]").click();
		await expect(error).toBeVisible({ timeout: 1_000 });
	}).toPass({ timeout: 10_000 });

	expectNoViolations(await runAxe(page));
});
