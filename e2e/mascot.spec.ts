import { expect, type Locator, type Page, test } from "@playwright/test";

/**
 * Cogni is an SVG that a canvas mirrors in the browser (src/lib/mascotCanvas.ts), because
 * Firefox shows small slow SVG movements in steps. The canvas only knows the SVG features the
 * mascot uses today, so these tests draw the same mascot both ways, with every animation frozen
 * at the same instant, and fail when the two stop looking alike (a new filter, mask or shape
 * type in the SVG that the canvas does not draw, for example).
 *
 * Run by `pnpm test:a11y` like the rest of `e2e/`, against a server at BASE_URL.
 */

/** Freezes every CSS animation of the page at `ms`, then waits for the canvas to repaint. */
const freezeAt = async (page: Page, ms: number) => {
	await page.evaluate((time) => {
		for (const animation of document.getAnimations()) {
			animation.pause();
			animation.currentTime = time;
		}
	}, ms);
	await page.evaluate(
		() =>
			new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done()))),
	);
};

/** Waits until the canvas has taken over from the SVG (the component is hydrated). */
const waitForCanvas = async (mascot: Locator) => {
	await expect(mascot).toHaveAttribute("data-canvas", "");
	await expect(mascot.locator("canvas")).toBeVisible();
};

interface Difference {
	/** Mean absolute difference per color channel, 0 to 255. */
	mean: number;
	/** Share of pixels that differ strongly, 0 to 1. */
	strong: number;
	/** Largest mean difference found in any cell of an 8 by 8 grid, so a small missing shape shows. */
	worstCell: number;
	/** Number of pixels of the first image that differ from its background (the drawing's size). */
	drawn: number;
}

/** Compares two PNGs on a blank page, which has no content security policy to get in the way. */
const compareImages = async (page: Page, first: Buffer, second: Buffer): Promise<Difference> => {
	const scratch = await page.context().newPage();
	try {
		await scratch.setContent("<body></body>");
		return await scratch.evaluate(
			async ([a, b]) => {
				const pixels = async (base64: string) => {
					const image = new Image();
					image.src = `data:image/png;base64,${base64}`;
					await image.decode();
					const canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					const ctx = canvas.getContext("2d", { willReadFrequently: true });
					if (!ctx) throw new Error("no 2d context");
					ctx.drawImage(image, 0, 0);
					return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
				};
				const [x, y] = await Promise.all([pixels(a), pixels(b)]);
				if (x.length !== y.length) throw new Error("screenshots differ in size");

				let total = 0;
				let strong = 0;
				let drawn = 0;
				const count = x.length / 4;
				const side = Math.round(Math.sqrt(count));
				const cells = new Array<number>(64).fill(0);
				const cellSize = Math.ceil(side / 8);
				for (let i = 0; i < x.length; i += 4) {
					const diff =
						(Math.abs((x[i] ?? 0) - (y[i] ?? 0)) +
							Math.abs((x[i + 1] ?? 0) - (y[i + 1] ?? 0)) +
							Math.abs((x[i + 2] ?? 0) - (y[i + 2] ?? 0))) /
						3;
					total += diff;
					if (diff > 64) strong++;
					const at = i / 4;
					const cell =
						Math.min(7, Math.floor(Math.floor(at / side) / cellSize)) * 8 +
						Math.min(7, Math.floor((at % side) / cellSize));
					cells[cell] = (cells[cell] ?? 0) + diff;
					const fromBackground =
						(Math.abs((x[i] ?? 0) - (x[0] ?? 0)) +
							Math.abs((x[i + 1] ?? 0) - (x[1] ?? 0)) +
							Math.abs((x[i + 2] ?? 0) - (x[2] ?? 0))) /
						3;
					if (fromBackground > 48) drawn++;
				}
				const worstCell = Math.max(...cells) / (cellSize * cellSize);
				return { mean: total / count, strong: strong / count, worstCell, drawn };
			},
			[first.toString("base64"), second.toString("base64")] as const,
		);
	} finally {
		await scratch.close();
	}
};

/**
 * Screenshots the mascot as drawn by the canvas, then as drawn by its SVG (by switching the
 * canvas off), and checks that the two match. Animations must already be frozen.
 */
const expectCanvasMatchesSvg = async (page: Page, mascot: Locator) => {
	const withCanvas = await mascot.screenshot();

	await mascot.evaluate((el) => {
		el.removeAttribute("data-canvas");
		const canvas = el.querySelector("canvas");
		if (canvas) canvas.style.display = "none";
	});
	const withSvg = await mascot.screenshot();

	const { mean, strong, worstCell, drawn } = await compareImages(page, withSvg, withCanvas);
	expect(drawn, "the mascot should be drawn, not blank").toBeGreaterThan(400);
	// Anti-aliasing alone gives a mean under 2.1, no strongly different pixel, and a worst cell
	// under 9.1. A missing shape, a dropped transform, thinner strokes or a flat gradient all go
	// past these limits.
	expect(mean, "mean difference between the SVG and the canvas").toBeLessThan(3.5);
	expect(strong, "share of strongly different pixels").toBeLessThan(0.001);
	expect(worstCell, "mean difference in the worst 1/64th of the mascot").toBeLessThan(14);
};

test.describe("Cogni mascot canvas", () => {
	test("home hero: the canvas draws the idle mascot like its SVG, and moves", async ({ page }) => {
		await page.goto("/fr/");
		const mascot = page.locator(".mascot-idle").first();
		await waitForCanvas(mascot);

		// Frozen at the bottom of the bob, then at the top: the canvas must follow the animation.
		await freezeAt(page, 0);
		const atRest = await mascot.screenshot();
		await freezeAt(page, 1000);
		const atTop = await mascot.screenshot();
		expect(atTop.equals(atRest), "the canvas should move with the SVG animation").toBe(false);

		await expectCanvasMatchesSvg(page, mascot);
	});

	// The first question has several choices, so across these runs the feedback shows both the
	// "happy" pose (sparkles) and the "confused" pose (swirls, sweat drop).
	for (const choice of [0, 1, 2]) {
		test(`quiz feedback after choice ${choice + 1}: the canvas matches the SVG`, async ({
			page,
		}) => {
			await page.goto("/fr/biais/ancrage");
			const quiz = page.locator("#quiz");

			// The quiz is a client:load island: a click made before hydration is lost, so retry it.
			const feedback = quiz.locator(".mascot");
			await expect(async () => {
				await quiz.locator("button:not(:disabled)").nth(choice).click({ timeout: 1_000 });
				await expect(feedback).toBeVisible({ timeout: 1_000 });
			}).toPass({ timeout: 10_000 });

			await waitForCanvas(feedback);
			await expect(feedback).toHaveClass(/mascot-(happy|confused)/);

			await freezeAt(page, 450);
			await expectCanvasMatchesSvg(page, feedback);
		});
	}
});
