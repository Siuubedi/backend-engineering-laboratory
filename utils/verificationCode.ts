import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { env } from "../src/config/env";

export const generateVerificationCode = (): string => {
    const number = randomInt(100_000, 1_000_000)

    return number.toString().padStart(6, "0")
}

export const hashVerificationCode = (code: string, normalizedEmail: string): string => {
    const secret = Buffer.from(
        env.OTP_HMAC_SECRET,
        "hex"
    )

    const hmac = createHmac("sha256", secret)
        .update(JSON.stringify([
            "email-verification:v1",
            normalizedEmail,
            code,
        ]))
        .digest("hex")

    return hmac
}

export const verifyVerificationCode = (code: string, normalizedEmail: string, storedHash: string
): boolean => {
    // Reject malformed OTP.
    if (!/^\d{6}$/.test(code)) {
        return false;
    }

    // Ensure the stored SHA-256 HMAC is valid hexadecimal.
    if (!/^[0-9a-fA-F]{64}$/.test(storedHash)) {
        return false;
    }

    // Calculate HMAC from the submitted OTP.
    const computeHash = hashVerificationCode(code, normalizedEmail)

    // Convert hexadecimal digests to bytes.
    const computedBuffer = Buffer.from(computeHash, "hex")
    const storedBuffer = Buffer.from(storedHash, "hex")

    // Compare them.
    return timingSafeEqual(computedBuffer, storedBuffer)
}