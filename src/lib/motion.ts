/** True when the visitor asked the OS/browser to minimise non-essential motion. */
export const prefersReducedMotion = (): boolean =>
	typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
