/**
 * Formats Lighthouse scores into a markdown table with badges and trends.
 * Used by the pr-comment CI job via actions/github-script (eval'd).
 *
 * NOTE: Excluded from Biome in biome.json because actions/github-script
 * wraps this file in an async function — top-level `core` global is injected
 * by the runtime, which Biome can't know about.
 *
 * Env:
 *   LH_MANIFEST — JSON manifest from treosh/lighthouse-ci-action
 *   LH_LINKS    — JSON links to temporary public storage reports
 *   LH_BASELINE — JSON baseline scores (optional)
 */
const manifest = JSON.parse(process.env.LH_MANIFEST);
const links = JSON.parse(process.env.LH_LINKS);
const baseline = JSON.parse(process.env.LH_BASELINE || "{}");

const badge = (score) => {
	if (score >= 95) return `🟢 ${score}`;
	if (score >= 90) return `🟡 ${score}`;
	if (score >= 85) return `🟠 ${score}`;
	if (score >= 75) return `🔶 ${score}`;
	return `🔴 ${score}`;
};

const trend = (current, previous) => {
	if (previous === undefined) return "";
	const diff = current - previous;
	if (diff === 0) return "";
	const indicator = diff > 0 ? "↑" : "↓";
	return ` <sup>${indicator}${Math.abs(diff)}</sup>`;
};

// Group runs by URL and compute averages
const byUrl = {};
for (const entry of manifest) {
	const url = entry.url.replace(/http:\/\/localhost:\d+/, "");
	if (!byUrl[url]) byUrl[url] = { runs: [], links: [] };
	byUrl[url].runs.push(entry.summary);
	const reportUrl = links[entry.url];
	if (reportUrl && !byUrl[url].links.includes(reportUrl)) {
		byUrl[url].links.push(reportUrl);
	}
}

const rows = Object.entries(byUrl).map(([url, { runs, links: reportLinks }]) => {
	const avg = (key) => Math.round((runs.reduce((s, r) => s + r[key], 0) / runs.length) * 100);
	const perf = avg("performance");
	const a11y = avg("accessibility");
	const seo = avg("seo");
	const bp = avg("best-practices");
	const b = baseline[url] || {};
	const reports = reportLinks.map((l) => `[report](${l})`).join(", ");
	return `| \`${url}\` | ${badge(perf)}${trend(perf, b.performance)} | ${badge(a11y)}${trend(a11y, b.accessibility)} | ${badge(seo)}${trend(seo, b.seo)} | ${badge(bp)}${trend(bp, b["best-practices"])} | ${reports} |`;
});

const table = [
	"| URL | Perf | A11y | SEO | BP | Reports |",
	"|-----|------|------|-----|-----|---------|",
	...rows,
].join("\n");

core.setOutput("table", table);
