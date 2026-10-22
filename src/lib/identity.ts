const ADJECTIVES = [
	"Curious",
	"Clever",
	"Bold",
	"Bright",
	"Quick",
	"Sharp",
	"Wise",
	"Keen",
	"Swift",
	"Calm",
	"Brave",
	"Lucid",
	"Noble",
	"Vivid",
	"Agile",
	"Witty",
];

const NOUNS = [
	"Mind",
	"Brain",
	"Thinker",
	"Sage",
	"Fox",
	"Owl",
	"Spark",
	"Lens",
	"Scout",
	"Pilot",
	"Seeker",
	"Neuron",
	"Cortex",
	"Synapse",
	"Logic",
	"Iris",
];

const randomItem = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomDigits = (n: number): string =>
	Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

/**
 * Generates a random pseudo, editable by the user.
 * @example generatePseudo() // "CuriousMind42"
 */
export const generatePseudo = (): string =>
	`${randomItem(ADJECTIVES)}${randomItem(NOUNS)}${randomDigits(2)}`;

/** Generates a UUID v4 to identify the user in localStorage. */
export const generateUUID = (): string => crypto.randomUUID();

const RECOVERY_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const randomSegment = (len: number): string =>
	Array.from(
		{ length: len },
		() => RECOVERY_CHARS[Math.floor(Math.random() * RECOVERY_CHARS.length)],
	).join("");

/** Generates a recovery code (e.g. `COGNI-X7K2-M9PL`) to restore an account on another device. */
export const generateRecoveryCode = (): string => `COGNI-${randomSegment(4)}-${randomSegment(4)}`;

const RECOVERY_CODE_REGEX = /^COGNI-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

/** Validates that a string matches the recovery code format. */
export const isValidRecoveryCode = (code: string): boolean => RECOVERY_CODE_REGEX.test(code);
