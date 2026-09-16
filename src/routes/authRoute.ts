import express from "express"
import { checkEmailAvailability, registerUser } from "../controllers/authController"
import { validateBody } from "../middleware/validateBody"
import { emailAvailabilitySchema, registerUserSchema } from "../schemas/authSchema"

const router = express.Router()

router.post("/email-availability", validateBody(emailAvailabilitySchema), checkEmailAvailability)

router.post("/register", validateBody(registerUserSchema), registerUser)

export default router