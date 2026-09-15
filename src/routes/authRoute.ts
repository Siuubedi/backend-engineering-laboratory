import express from "express"
import { checkEmailAvailability } from "../controllers/authController"
import { validateBody } from "../middleware/validateBody"
import { emailAvailabilitySchema } from "../schemas/authSchema"

const router = express.Router()

router.post("/email-availability", validateBody(emailAvailabilitySchema), checkEmailAvailability)

export default router