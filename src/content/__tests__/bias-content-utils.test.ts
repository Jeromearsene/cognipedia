import { describe, expect, it } from "vitest";
import { extractAddedUrls, extractUrls, getAllBiasFiles } from "./bias-content-utils";

describe("extractAddedUrls", () => {
	const diff = `diff --git a/src/content/biases/a/fr.md b/src/content/biases/a/fr.md
--- a/src/content/biases/a/fr.md
+++ b/src/content/biases/a/fr.md
@@ -10,2 +10,6 @@ sources:
           url: "https://doi.org/10.1234/old"
+    - title: "New paper"
+      urls:
+        - label: "DOI"
+          url: "https://doi.org/10.1234/new"
-      url: "https://example.com/removed"
+      url: "https://www.youtube.com/watch?v=abc"`;

	it("returns only URLs on added lines", () => {
		expect(extractAddedUrls(diff)).toEqual([
			"https://doi.org/10.1234/new",
			"https://www.youtube.com/watch?v=abc",
		]);
	});

	it("ignores the file headers and removed lines", () => {
		const urls = extractAddedUrls(diff);
		expect(urls).not.toContain("https://example.com/removed");
		expect(urls).not.toContain("https://doi.org/10.1234/old");
	});

	it("returns an empty array for an empty diff", () => {
		expect(extractAddedUrls("")).toEqual([]);
	});
});

describe("extractUrls", () => {
	it("extracts URLs from YAML frontmatter", () => {
		const content = `---
sources:
  wikipedia: "https://en.wikipedia.org/wiki/Test"
  papers:
    - title: "Paper"
      urls:
        - label: "DOI"
          url: "https://doi.org/10.1234/test"
---
## Content`;
		const urls = extractUrls(content);
		expect(urls).toContain("https://en.wikipedia.org/wiki/Test");
		expect(urls).toContain("https://doi.org/10.1234/test");
	});

	it("extracts URLs from markdown links", () => {
		const content = `---
slug: "test"
---
See [this paper](https://example.com/paper) for details.`;
		expect(extractUrls(content)).toContain("https://example.com/paper");
	});

	it("handles URLs with parentheses in YAML", () => {
		const content = `---
wikipedia: "https://en.wikipedia.org/wiki/Anchoring_(cognitive_bias)"
---`;
		expect(extractUrls(content)).toContain(
			"https://en.wikipedia.org/wiki/Anchoring_(cognitive_bias)",
		);
	});

	it("deduplicates URLs", () => {
		const content = `---
url: "https://example.com"
---
Link: [click](https://example.com)`;
		expect(extractUrls(content)).toEqual(["https://example.com"]);
	});

	it("returns empty array for content without URLs", () => {
		expect(extractUrls("---\nslug: test\n---\nNo links here.")).toEqual([]);
	});
});

describe("getAllBiasFiles", () => {
	it("returns files with relativePath and filePath", () => {
		const files = getAllBiasFiles();
		expect(files.length).toBeGreaterThan(0);
		for (const file of files) {
			expect(file.relativePath).toMatch(/^[a-z-]+\/[a-z]+\.md$/);
			expect(file.filePath).toContain("src/content/biases/");
		}
	});
});
