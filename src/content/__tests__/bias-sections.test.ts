import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SUPPORTED_LOCALES } from "@/i18n/i18n";

const BIASES_DIR = join(import.meta.dirname, "../biases");

/** Required sections per locale. Order matters — they must appear in this order. */
const REQUIRED_SECTIONS: Record<string, string[]> = {
	fr: ["Définition", "Mécanisme", "Exemples"],
	en: ["Definition", "Mechanism", "Examples"],
};

/** Optional sections that are allowed but not required, per locale. */
const OPTIONAL_SECTIONS: Record<string, string[]> = {
	fr: ["Le saviez-vous ?"],
	en: ["Did you know?"],
};

/** Extracts h2 section titles from markdown content (after the frontmatter). */
const extractSections = (content: string): string[] => {
	// Remove frontmatter (between --- delimiters)
	const body = content.replace(/^---[\s\S]*?---/, "").trim();
	const matches = body.match(/^## (.+)$/gm);
	return matches ? matches.map((m) => m.replace("## ", "")) : [];
};

/** Returns all bias folders (each containing locale .md files). */
const getBiasFolders = (): string[] =>
	readdirSync(BIASES_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

describe("bias markdown sections", () => {
	const biasFolders = getBiasFolders();

	for (const folder of biasFolders) {
		const folderPath = join(BIASES_DIR, folder);
		const files = readdirSync(folderPath).filter((f) => f.endsWith(".md"));

		for (const file of files) {
			const locale = file.replace(".md", "");
			const filePath = join(folderPath, file);
			const relativePath = `${folder}/${file}`;

			if (!REQUIRED_SECTIONS[locale]) continue;

			const content = readFileSync(filePath, "utf-8");
			const sections = extractSections(content);
			const required = REQUIRED_SECTIONS[locale];
			const optional = OPTIONAL_SECTIONS[locale] ?? [];
			const allowed = [...required, ...optional];

			it(`${relativePath} — has all required sections`, () => {
				for (const section of required) {
					expect(sections, `Missing required section "## ${section}" in ${relativePath}`).toContain(
						section,
					);
				}
			});

			it(`${relativePath} — has no unknown sections`, () => {
				for (const section of sections) {
					expect(
						allowed,
						`Unknown section "## ${section}" in ${relativePath}. Allowed: ${allowed.join(", ")}`,
					).toContain(section);
				}
			});

			it(`${relativePath} — required sections are in correct order`, () => {
				const requiredInContent = sections.filter((s) => required.includes(s));
				expect(
					requiredInContent,
					`Sections out of order in ${relativePath}. Expected: ${required.join(" → ")}`,
				).toEqual(required);
			});
		}
	}
});

describe("bias inter-language coherence", () => {
	const biasFolders = getBiasFolders();

	for (const folder of biasFolders) {
		it(`${folder}/ — has all locale files (${SUPPORTED_LOCALES.join(", ")})`, () => {
			const folderPath = join(BIASES_DIR, folder);
			for (const locale of SUPPORTED_LOCALES) {
				const filePath = join(folderPath, `${locale}.md`);
				expect(existsSync(filePath), `Missing ${folder}/${locale}.md`).toBe(true);
			}
		});
	}
});
