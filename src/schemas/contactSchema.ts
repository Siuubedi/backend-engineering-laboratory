import { z } from "zod";

export const createContactSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().pipe(z.email("Invalid email address.")),
    contact: z.string().trim().min(10, "Contact must be at least 10 characters.")
})

export type CreateContactInput = z.infer<typeof createContactSchema>;