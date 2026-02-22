import { describe, expect, it } from "vitest";
import { parseQuiz, parseSituation } from "./parse-bias-content";

const SAMPLE_MD = `## Definition

Some text here.

## Situation

\`\`\`json
{
  "type": "choice",
  "scenario": "A test scenario",
  "choices": [
    { "label": "Option A", "bias": true },
    { "label": "Option B", "bias": false }
  ],
  "reveal": "Explanation here"
}
\`\`\`

## Quiz

\`\`\`json
{
  "questions": [
    {
      "question": "What is 1+1?",
      "choices": ["2", "3", "4"],
      "correct": 0,
      "explanation": "Basic math."
    }
  ]
}
\`\`\`
`;

describe("parseSituation", () => {
	it("extracts a valid situation from markdown", () => {
		const result = parseSituation(SAMPLE_MD);
		expect(result).not.toBeNull();
		expect(result?.type).toBe("choice");
		expect(result?.scenario).toBe("A test scenario");
		expect(result?.choices).toHaveLength(2);
		expect(result?.reveal).toBe("Explanation here");
	});

	it("returns null when no Situation section exists", () => {
		expect(parseSituation("## Definition\n\nSome text.")).toBeNull();
	});

	it("returns null when JSON block is missing", () => {
		expect(parseSituation("## Situation\n\nNo json here.")).toBeNull();
	});

	it("returns null for invalid situation JSON", () => {
		const md = '## Situation\n\n```json\n{"type": "unknown"}\n```\n';
		expect(parseSituation(md)).toBeNull();
	});
});

describe("parseQuiz", () => {
	it("extracts a valid quiz from markdown", () => {
		const result = parseQuiz(SAMPLE_MD);
		expect(result).not.toBeNull();
		expect(result?.questions).toHaveLength(1);
		expect(result?.questions[0].question).toBe("What is 1+1?");
		expect(result?.questions[0].correct).toBe(0);
	});

	it("returns null when no Quiz section exists", () => {
		expect(parseQuiz("## Definition\n\nSome text.")).toBeNull();
	});

	it("returns null when JSON block is missing", () => {
		expect(parseQuiz("## Quiz\n\nNo json here.")).toBeNull();
	});

	it("returns null for invalid quiz JSON", () => {
		const md = '## Quiz\n\n```json\n{"questions": []}\n```\n';
		expect(parseQuiz(md)).toBeNull();
	});
});
