import { hashPassword } from "../../utils/password";
import { normalizeEmail } from "../../utils/normalizeEmail";
import { AppError } from "../errors/AppError";
import { db } from "../prisma/db";

export const authService = {
    async checkEmailAvailability(email: string) {
        const normalizedEmail = normalizeEmail(email)

        const user = await db.orm.public.User
            .where({ normalizedEmail })
            .first()

        const pendingRegistration = await db.orm.public.PendingRegistration
            .where({ normalizedEmail })
            .first()

        return {
            available: !user && !pendingRegistration
        }
    },

    async registerUser(name: string, email: string, password: string) {
        const normalizedEmail = normalizeEmail(email)

        // Check if the verified account exists.
        const existingUser = await db.orm.public.User
            .where({ normalizedEmail })
            .first()

        if (existingUser) {
            throw new AppError(
                409,
                "EMAIL_ALREADY_EXISTS",
                "An account with this email already exists."
            );
        }

        const pendingRegistration = await db.orm.public.PendingRegistration
            .where({ normalizedEmail })
            .first()

        const hashedPassword = hashPassword(password)

        // ToDo: Generate verification code.
        // ToDo: Store pending registration.
        // ToDo: Deliver verification email.

        return {
            "message": "User created successfully.",
        }
    }
}