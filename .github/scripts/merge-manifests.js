/**
 * Merges Lighthouse manifests and links from parallel jobs, computes baseline,
 * then runs the format script.
 * Used by the pr-comment CI job via actions/github-script (eval'd).
 *
 * Env:
 *   LH_MANIFEST_HOME     — manifest from homepage audit
 *   LH_MANIFEST_BIAS     — manifest from bias page audit
 *   LH_LINKS_HOME        — report links from homepage audit
 *   LH_LINKS_BIAS        — report links from bias page audit
 *   LH_BASELINE_HOME     — baseline manifest from homepage audit
 *   LH_BASELINE_BIAS     — baseline manifest from bias page audit
 */
// biome-ignore lint/style/useNodejsImportProtocol: actions/github-script runtime requires CommonJS
const fs = require("fs");

// Merge manifests and links from parallel jobs
const manifests = [
	...JSON.parse(process.env.LH_MANIFEST_HOME || "[]"),
	...JSON.parse(process.env.LH_MANIFEST_BIAS || "[]"),
];
const links = {
	...JSON.parse(process.env.LH_LINKS_HOME || "{}"),
	...JSON.parse(process.env.LH_LINKS_BIAS || "{}"),
};
const baselineManifests = [
	...JSON.parse(process.env.LH_BASELINE_HOME || "[]"),
	...JSON.parse(process.env.LH_BASELINE_BIAS || "[]"),
];

// Compute baseline averages
const baseByUrl = {};
for (const entry of baselineManifests) {
	const url = entry.url.replace(/http:\/\/localhost:\d+/, "");
	if (!baseByUrl[url]) baseByUrl[url] = [];
	baseByUrl[url].push(entry.summary);
}
const baseline = {};
for (const [url, runs] of Object.entries(baseByUrl)) {
	const avg = (key) => Math.round((runs.reduce((s, r) => s + r[key], 0) / runs.length) * 100);
	baseline[url] = {
		performance: avg("performance"),
		accessibility: avg("accessibility"),
		seo: avg("seo"),
		"best-practices": avg("best-practices"),
	};
}

// Set env for format script
process.env.LH_MANIFEST = JSON.stringify(manifests);
process.env.LH_LINKS = JSON.stringify(links);
process.env.LH_BASELINE = JSON.stringify(baseline);

const script = fs.readFileSync(".github/scripts/format-lighthouse.js", "utf8");
// biome-ignore lint/security/noGlobalEval: required to load external script in actions/github-script context
eval(script);
