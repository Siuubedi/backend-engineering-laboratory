import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1),
    NODE_ENV: z.enum([
        "development",
        "test",
        "production"
    ]),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required.'),
    DIRECT_URL: z.string().min(1, 'DIRECT_URL is required.')
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
    console.error("Invalid environment configuration:")
    console.error(result.error.issues)

    process.exit(1)
}

export const env = result.data