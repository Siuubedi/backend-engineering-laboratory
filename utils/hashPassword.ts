import * as argon2 from "argon2";
import { AppError } from "../src/errors/AppError";

export const hashPassword = async (password: string) => {
    try {
        return await argon2.hash(password)
    }

    catch (error) {
        throw new AppError(404, "HASHING_FAILED", "Password Hashing Failed.")
        console.log(error)
    }
}

export const verifyPassword = async (password: string, hash: string) => {
    try {
        return await argon2.verify(hash, password)
    }
    catch (error) {
        throw new AppError(404, "VERIFICATION_FAILED", "Password Verification Failed.")
        console.log(error)
    }
}