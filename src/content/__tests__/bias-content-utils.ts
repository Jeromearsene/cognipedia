import { readdirSync } from "node:fs";
import { join } from "node:path";

const BIASES_DIR = join(import.meta.dirname, "../biases");

/** Extracts all URLs from a markdown file (frontmatter YAML + markdown body). */
export const extractUrls = (content: string): string[] => {
	const urls = new Set<string>();

	// YAML frontmatter: URLs are between quotes (handles parentheses correctly)
	for (const match of content.matchAll(/["'](https?:\/\/[^"']+)["']/g)) {
		urls.add(match[1]);
	}

	// Markdown body links: [text](url)
	for (const match of content.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
		urls.add(match[1]);
	}

	return [...urls];
};

/** Returns all markdown files with their paths. */
export const getAllBiasFiles = (): { relativePath: string; filePath: string }[] => {
	const folders = readdirSync(BIASES_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	const files: { relativePath: string; filePath: string }[] = [];
	for (const folder of folders) {
		const folderPath = join(BIASES_DIR, folder);
		for (const file of readdirSync(folderPath).filter((f) => f.endsWith(".md"))) {
			files.push({
				relativePath: `${folder}/${file}`,
				filePath: join(folderPath, file),
			});
		}
	}
	return files;
};
