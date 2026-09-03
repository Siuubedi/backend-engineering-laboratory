import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1),
    NODE_ENV: z.enum([
        "development",
        "test",
        "production"
    ])
})

const result = envSchema.safeParse(process.env)

if (!result.success) {
    console.error("Invalid environment configuration:")
    console.error(result.error.issues)

    process.exit(1)
}

export const env = result.data