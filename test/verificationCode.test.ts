import { describe, expect, it } from "vitest";
import { generateVerificationCode, hashVerificationCode } from "../utils/verificationCode";

describe("Verification Code", () => {
    it("should return a string", () => {
        const code = generateVerificationCode()

        expect(typeof code).toBe("string")
    })

    it("should generate exactly 6 characters", () => {
        const code = generateVerificationCode()

        expect(code).toHaveLength(6)
    })

    it("should always generate a valid code", () => {
        for (let i = 0; i < 100; i++) {
            const code = generateVerificationCode()

            expect(code).toMatch(/^\d{6}$/)
        }
    })

    it("should generate the same HMAC for identical inputs", () => {
        const hash1 = hashVerificationCode(
            "123456",
            "subedi@example.com"
        );

        const hash2 = hashVerificationCode(
            "123456",
            "subedi@example.com"
        );

        expect(hash1).toBe(hash2);
    });
})