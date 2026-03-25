import { describe, expect, it } from "vitest";
import { cookieMock, localStorageMock, setupUserStoreMocks } from "./userStore.setup";

setupUserStoreMocks();

describe("userStore — load & clear", () => {
	describe("load()", () => {
		it("sets null state when localStorage is empty", async () => {
			const { userStore } = await import("../userStore.svelte");
			userStore.load();

			expect(userStore.uuid).toBeNull();
			expect(userStore.pseudo).toBeNull();
			expect(userStore.recoveryCode).toBeNull();
			expect(userStore.recoveryCodeSeen).toBe(false);
			expect(userStore.isRegistered).toBe(false);
		});

		it("restores state from populated localStorage", async () => {
			localStorageMock.setItem("cognipedia_uuid", "test-uuid-123");
			localStorageMock.setItem("cognipedia_pseudo", "CleverFox42");
			localStorageMock.setItem("cognipedia_recovery_code", "COGNI-AB12-CD34");
			localStorageMock.setItem("cognipedia_recovery_code_seen", "true");

			const { userStore } = await import("../userStore.svelte");
			userStore.load();

			expect(userStore.uuid).toBe("test-uuid-123");
			expect(userStore.pseudo).toBe("CleverFox42");
			expect(userStore.recoveryCode).toBe("COGNI-AB12-CD34");
			expect(userStore.recoveryCodeSeen).toBe(true);
			expect(userStore.isRegistered).toBe(true);
		});

		it("renews cookie when a registered user loads", async () => {
			localStorageMock.setItem("cognipedia_uuid", "test-uuid-123");

			const { userStore } = await import("../userStore.svelte");
			userStore.load();

			expect(cookieMock.value).toContain("cognipedia_registered=1");
		});

		it("does not set cookie when no user is registered", async () => {
			const { userStore } = await import("../userStore.svelte");
			userStore.load();

			expect(cookieMock.value).toBe("");
		});
	});

	describe("clear()", () => {
		it("resets state and removes localStorage keys", async () => {
			localStorageMock.setItem("cognipedia_uuid", "test-uuid");
			localStorageMock.setItem("cognipedia_pseudo", "TestUser42");
			localStorageMock.setItem("cognipedia_recovery_code", "COGNI-AB12-CD34");
			localStorageMock.setItem("cognipedia_recovery_code_seen", "true");

			const { userStore } = await import("../userStore.svelte");
			userStore.load();
			expect(userStore.uuid).toBe("test-uuid");

			userStore.clear();

			expect(userStore.uuid).toBeNull();
			expect(userStore.pseudo).toBeNull();
			expect(userStore.recoveryCode).toBeNull();
			expect(userStore.recoveryCodeSeen).toBe(false);
			expect(userStore.isRegistered).toBe(false);

			expect(localStorageMock.removeItem).toHaveBeenCalledWith("cognipedia_uuid");
			expect(localStorageMock.removeItem).toHaveBeenCalledWith("cognipedia_pseudo");
			expect(localStorageMock.removeItem).toHaveBeenCalledWith("cognipedia_recovery_code");
			expect(localStorageMock.removeItem).toHaveBeenCalledWith("cognipedia_recovery_code_seen");
		});

		it("clears the registered cookie", async () => {
			localStorageMock.setItem("cognipedia_uuid", "test-uuid");

			const { userStore } = await import("../userStore.svelte");
			userStore.load();
			userStore.clear();

			expect(cookieMock.value).toContain("max-age=0");
		});
	});
});
