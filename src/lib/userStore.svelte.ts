import { z } from "zod";
import {
	generatePseudo,
	generateRecoveryCode,
	generateUUID,
	isValidRecoveryCode,
} from "./identity";

/** Schema for the /api/recover JSON response. */
const recoverResponseSchema = z.object({ uuid: z.string(), pseudo: z.string() });

const KEYS = {
	uuid: "cognipedia_uuid",
	pseudo: "cognipedia_pseudo",
	recoveryCode: "cognipedia_recovery_code",
	recoveryCodeSeen: "cognipedia_recovery_code_seen",
} as const;

const COOKIE_NAME = "cognipedia_registered";

/** Max-age of 100 years. Some browsers (Safari) cap at 400 days, so we renew on each load(). */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 100;

/** Sets a lightweight cookie flag so the server knows the user is registered. */
const setRegisteredCookie = () => {
	// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not widely supported yet
	document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

/** Removes the registered cookie. */
const clearRegisteredCookie = () => {
	// biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not widely supported yet
	document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
};

/** Reactive user store — manages identity in localStorage and communicates with API endpoints. */
const createUserStore = () => {
	let uuid = $state<string | null>(null);
	let pseudo = $state<string | null>(null);
	let recoveryCode = $state<string | null>(null);
	let recoveryCodeSeen = $state(false);
	const isRegistered = $derived(uuid !== null);

	/** Reads user data from localStorage into the store. Silently keeps defaults if storage is unavailable. */
	const load = () => {
		try {
			uuid = localStorage.getItem(KEYS.uuid);
			pseudo = localStorage.getItem(KEYS.pseudo);
			recoveryCode = localStorage.getItem(KEYS.recoveryCode);
			recoveryCodeSeen = localStorage.getItem(KEYS.recoveryCodeSeen) === "true";

			// Renew cookie on each load to counter browsers that cap max-age (e.g. Safari 400 days)
			if (uuid) {
				setRegisteredCookie();
			}
		} catch (err) {
			console.warn("[userStore] localStorage unavailable, keeping default state", err);
		}
	};

	/**
	 * Generates a new identity (UUID + pseudo + recovery code),
	 * registers it via `POST /api/register`, and persists to localStorage.
	 */
	const register = async () => {
		const newUuid = generateUUID();
		const newPseudo = generatePseudo();
		const newRecoveryCode = generateRecoveryCode();

		const response = await fetch("/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				uuid: newUuid,
				pseudo: newPseudo,
				recoveryCode: newRecoveryCode,
			}),
		});

		if (!response.ok) {
			throw new Error(`Registration failed: ${response.status}`);
		}

		uuid = newUuid;
		pseudo = newPseudo;
		recoveryCode = newRecoveryCode;
		recoveryCodeSeen = false;

		localStorage.setItem(KEYS.uuid, newUuid);
		localStorage.setItem(KEYS.pseudo, newPseudo);
		localStorage.setItem(KEYS.recoveryCode, newRecoveryCode);
		setRegisteredCookie();
	};

	/**
	 * Recovers an account using a recovery code.
	 * Validates the code format, calls `POST /api/recover`, and updates localStorage.
	 */
	const recover = async (code: string) => {
		if (!isValidRecoveryCode(code)) {
			throw new Error("Invalid recovery code format");
		}

		const response = await fetch("/api/recover", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ recoveryCode: code }),
		});

		if (!response.ok) {
			throw new Error(`Recovery failed: ${response.status}`);
		}

		const data = recoverResponseSchema.parse(await response.json());

		uuid = data.uuid;
		pseudo = data.pseudo;
		recoveryCode = code;
		recoveryCodeSeen = true;

		localStorage.setItem(KEYS.uuid, data.uuid);
		localStorage.setItem(KEYS.pseudo, data.pseudo);
		localStorage.setItem(KEYS.recoveryCode, code);
		localStorage.setItem(KEYS.recoveryCodeSeen, "true");
		setRegisteredCookie();
	};

	/** Marks the recovery code as seen by the user and persists to localStorage. */
	const markRecoveryCodeSeen = () => {
		recoveryCodeSeen = true;
		localStorage.setItem(KEYS.recoveryCodeSeen, "true");
	};

	/**
	 * Updates the user's pseudo via `PATCH /api/pseudo` and persists the new value to localStorage.
	 * @throws If the user is not registered or the API call fails.
	 */
	const updatePseudo = async (newPseudo: string) => {
		if (!uuid) {
			throw new Error("Cannot update pseudo: user not registered");
		}

		const response = await fetch("/api/pseudo", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ uuid, pseudo: newPseudo }),
		});

		if (!response.ok) {
			throw new Error("Pseudo update failed");
		}

		pseudo = newPseudo;
		localStorage.setItem(KEYS.pseudo, newPseudo);
	};

	/** Removes all user data from localStorage and resets store state. */
	const clear = () => {
		uuid = null;
		pseudo = null;
		recoveryCode = null;
		recoveryCodeSeen = false;

		localStorage.removeItem(KEYS.uuid);
		localStorage.removeItem(KEYS.pseudo);
		localStorage.removeItem(KEYS.recoveryCode);
		localStorage.removeItem(KEYS.recoveryCodeSeen);
		clearRegisteredCookie();
	};

	return {
		get uuid() {
			return uuid;
		},
		get pseudo() {
			return pseudo;
		},
		get recoveryCode() {
			return recoveryCode;
		},
		get recoveryCodeSeen() {
			return recoveryCodeSeen;
		},
		get isRegistered() {
			return isRegistered;
		},
		load,
		register,
		recover,
		markRecoveryCodeSeen,
		updatePseudo,
		clear,
	};
};

export const userStore = createUserStore();
