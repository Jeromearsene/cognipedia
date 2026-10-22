import { describe, expect, it, vi } from "vitest";
import { localStorageMock, setupUserStoreMocks } from "./userStore.setup";

setupUserStoreMocks();

describe("userStore — updatePseudo", () => {
	it("calls PATCH /api/pseudo and updates state", async () => {
		localStorageMock.setItem("cognipedia_uuid", "test-uuid");
		localStorageMock.setItem("cognipedia_pseudo", "OldPseudo");

		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce(
				new Response(JSON.stringify({ uuid: "test-uuid", pseudo: "NewPseudo" }), { status: 200 }),
			);
		vi.stubGlobal("fetch", fetchMock);

		const { userStore } = await import("../userStore.svelte");
		userStore.load();

		await userStore.updatePseudo("NewPseudo");

		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, options] = fetchMock.mock.calls[0];
		expect(url).toBe("/api/pseudo");
		expect(options.method).toBe("PATCH");
		expect(userStore.pseudo).toBe("NewPseudo");
		expect(localStorageMock.getItem("cognipedia_pseudo")).toBe("NewPseudo");
	});

	it("throws when not registered", async () => {
		const { userStore } = await import("../userStore.svelte");
		await expect(userStore.updatePseudo("X")).rejects.toThrow();
	});
});
