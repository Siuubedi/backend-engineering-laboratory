import { z } from "zod"

export const emailAvailabilitySchema = z.object({
    email: z.string().trim().pipe(
        z.email("Invalid email address")
    )
})

export type EmailAvailabilityInput = z.infer<typeof emailAvailabilitySchema>