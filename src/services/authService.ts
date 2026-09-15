import { normalizeEmail } from "../../utils/normalizeEmail";
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
    }
}