/**
 * Legal identity of the site, rendered on the legal notice and privacy pages.
 *
 * Every value wrapped in `TODO(...)` is a placeholder the site owner must replace with the real
 * information before launch: French law (LCEN, art. 6) requires the publisher's identity and
 * contact details to be available to the public. `isLegalConfigComplete` lets a test or a CI
 * step fail while placeholders remain.
 */
const TODO = (what: string) => `[À COMPLÉTER : ${what}]`;

export const LEGAL = {
	/** Full name of the publisher (an individual, or the registered business name). */
	publisherName: TODO("nom et prénom, ou raison sociale"),
	/** Legal status, e.g. "Entrepreneur individuel". */
	publisherStatus: TODO("statut juridique"),
	/** Postal address of the publisher (a business address is accepted for a sole trader). */
	publisherAddress: TODO("adresse postale"),
	/** SIREN/SIRET when the publisher is registered. */
	registrationNumber: TODO("numéro SIRET"),
	/** Contact email, also used for data protection requests. */
	contactEmail: TODO("adresse e-mail de contact"),
	/** Director of publication (the publisher itself for an individual). */
	publicationDirector: TODO("directeur de la publication"),
	host: {
		name: "Cloudflare, Inc.",
		address: "101 Townsend St, San Francisco, CA 94107, États-Unis",
		url: "https://www.cloudflare.com",
	},
} as const;

/** True once no placeholder is left in the legal configuration. */
export const isLegalConfigComplete = (): boolean =>
	[
		LEGAL.publisherName,
		LEGAL.publisherStatus,
		LEGAL.publisherAddress,
		LEGAL.registrationNumber,
		LEGAL.contactEmail,
		LEGAL.publicationDirector,
	].every((value) => !value.startsWith("[À COMPLÉTER"));
