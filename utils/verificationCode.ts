import { createHmac, randomInt } from "node:crypto";
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
    return true
}