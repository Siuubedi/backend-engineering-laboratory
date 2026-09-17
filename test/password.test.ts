import { describe, it, expect } from "vitest";

import {
    hashPassword,
    verifyPassword,
} from "../utils/password";

describe("Password Security", () => {

    const password = "MySecurePassword123!";

    it("should generate an Argon2id hash", async () => {

        const hash = await hashPassword(password);

        expect(hash).toBeDefined();

        expect(hash).not.toBe(password);

        expect(hash).toMatch(/^\$argon2id\$/);

    });

    it("should verify the correct password", async () => {

        const hash = await hashPassword(password);

        const result = await verifyPassword(
            hash,
            password
        );

        expect(result).toBe(true);

    });

    it("should reject an incorrect password", async () => {

        const hash = await hashPassword(password);

        const result = await verifyPassword(
            hash,
            "WrongPassword123!"
        );

        expect(result).toBe(false);

    });

    it("should generate different hashes for the same password", async () => {

        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);

        expect(hash1).not.toBe(hash2);

    });

});