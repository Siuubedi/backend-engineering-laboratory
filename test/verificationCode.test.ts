import { describe, expect, it } from "vitest";
import { generateVerificationCode, hashVerificationCode, verifyVerificationCode } from "../utils/verificationCode";

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

describe("OTP Verification", () => {

    const email = "ram@example.com";
    const code = "123456";

    const storedHash = hashVerificationCode(code, email);

    it("should accept a correct OTP", () => {

        const result = verifyVerificationCode(
            code,
            email,
            storedHash
        );

        expect(result).toBe(true);

    });

    it("should reject an incorrect OTP", () => {

        const result = verifyVerificationCode(
            "654321",
            email,
            storedHash
        );

        expect(result).toBe(false);

    });

    it("should reject an OTP associated with another email", () => {

        const result = verifyVerificationCode(
            code,
            "shyam@example.com",
            storedHash
        );

        expect(result).toBe(false);

    });

    it("should reject malformed OTPs", () => {

        expect(
            verifyVerificationCode("12345", email, storedHash)
        ).toBe(false);

        expect(
            verifyVerificationCode("12345A", email, storedHash)
        ).toBe(false);

    });

    it("should reject malformed stored hashes", () => {

        const result = verifyVerificationCode(
            code,
            email,
            "invalid-hash"
        );

        expect(result).toBe(false);

    });

});