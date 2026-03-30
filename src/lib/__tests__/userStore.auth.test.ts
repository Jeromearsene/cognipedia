import { describe, expect, it, vi } from "vitest";
import { localStorageMock, setupUserStoreMocks } from "./userStore.setup";

setupUserStoreMocks();

describe("userStore — register & recover", () => {
	describe("register()", () => {
		it("calls POST /api/register and persists to localStorage", async () => {
			const fetchMock = vi
				.fn()
				.mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
			vi.stubGlobal("fetch", fetchMock);

			const { userStore } = await import("../userStore.svelte");
			await userStore.register();

			// API call
			expect(fetchMock).toHaveBeenCalledOnce();
			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe("/api/register");
			expect(options.method).toBe("POST");

			const body = JSON.parse(options.body);
			expect(body.uuid).toBeTruthy();
			expect(body.pseudo).toBeTruthy();
			expect(body.recoveryCode).toBeTruthy();

			// State
			expect(userStore.uuid).toBeTruthy();
			expect(userStore.pseudo).toBeTruthy();
			expect(userStore.recoveryCode).toBeTruthy();
			expect(userStore.recoveryCodeSeen).toBe(false);
			expect(userStore.isRegistered).toBe(true);

			// localStorage
			expect(localStorageMock.setItem).toHaveBeenCalledWith("cognipedia_uuid", userStore.uuid);
			expect(localStorageMock.setItem).toHaveBeenCalledWith("cognipedia_pseudo", userStore.pseudo);
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				"cognipedia_recovery_code",
				userStore.recoveryCode,
			);
		});
	});

	describe("recover()", () => {
		it("calls POST /api/recover and updates state", async () => {
			const recovered = { uuid: "recovered-uuid", pseudo: "RecoveredOwl99" };
			const fetchMock = vi
				.fn()
				.mockResolvedValue(new Response(JSON.stringify(recovered), { status: 200 }));
			vi.stubGlobal("fetch", fetchMock);

			const { userStore } = await import("../userStore.svelte");
			await userStore.recover("COGNI-AB12-CD34");

			// API call
			expect(fetchMock).toHaveBeenCalledOnce();
			const [url, options] = fetchMock.mock.calls[0];
			expect(url).toBe("/api/recover");
			expect(options.method).toBe("POST");
			expect(JSON.parse(options.body).recoveryCode).toBe("COGNI-AB12-CD34");

			// State
			expect(userStore.uuid).toBe("recovered-uuid");
			expect(userStore.pseudo).toBe("RecoveredOwl99");
			expect(userStore.recoveryCode).toBe("COGNI-AB12-CD34");
			expect(userStore.isRegistered).toBe(true);

			// localStorage
			expect(localStorageMock.setItem).toHaveBeenCalledWith("cognipedia_uuid", "recovered-uuid");
			expect(localStorageMock.setItem).toHaveBeenCalledWith("cognipedia_pseudo", "RecoveredOwl99");
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				"cognipedia_recovery_code",
				"COGNI-AB12-CD34",
			);
		});

		it("throws on invalid code format", async () => {
			const { userStore } = await import("../userStore.svelte");
			await expect(userStore.recover("INVALID-CODE")).rejects.toThrow(
				"Invalid recovery code format",
			);
		});

		it("throws when API returns 404", async () => {
			const fetchMock = vi
				.fn()
				.mockResolvedValue(new Response(JSON.stringify({ error: "not found" }), { status: 404 }));
			vi.stubGlobal("fetch", fetchMock);

			const { userStore } = await import("../userStore.svelte");
			await expect(userStore.recover("COGNI-AB12-CD34")).rejects.toThrow();
		});
	});
});
