/**
 * Legal identity of the site, rendered on the legal notice and privacy pages.
 *
 * Cognipedia is edited by a natural person acting on a non-professional basis (no ads, no paid
 * content, no economic consideration of any kind). Article 1-1, II of the LCEN (loi n° 2004-575,
 * as amended by loi n° 2024-449 of 21 May 2024) lets such a publisher withhold their own identity
 * from the public and disclose only the name and address of their hosting provider, *provided*
 * they have privately given their identification details (name, address, phone number) to that
 * host beforehand — the host is then bound by professional secrecy (art. 226-13 and 226-14 of the
 * Code pénal) and may only disclose them to a judicial authority. That identity exchange with the
 * host happens outside this repository; nothing here needs to (or should) name the publisher.
 *
 * `contactEmail` is the one thing that does have to be public: a reachable address for legal and
 * GDPR requests. It does not need to be, and should not be, identifying — use a dedicated address
 * rather than a personal one. `isLegalConfigComplete` lets a test or a CI step fail while it is
 * still a placeholder.
 */
const TODO = (what: string) => `[À COMPLÉTER : ${what}]`;

export const LEGAL = {
	/** Public contact address for legal and data-protection requests. Keep it non-identifying. */
	contactEmail: TODO("adresse e-mail de contact (non identifiante)"),
	host: {
		name: "Cloudflare, Inc.",
		address: "101 Townsend St, San Francisco, CA 94107, États-Unis",
		url: "https://www.cloudflare.com",
	},
} as const;

/** True once no placeholder is left in the legal configuration. */
export const isLegalConfigComplete = (): boolean => !LEGAL.contactEmail.startsWith("[À COMPLÉTER");
