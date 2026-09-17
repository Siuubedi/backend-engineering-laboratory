import { hashPassword, verifyPassword } from "../utils/password";
const password = "demoSecurePassword123"

const hash = await hashPassword(password)

const valid = await verifyPassword(hash, password)

const invalid = await verifyPassword(hash, "HolaAmigo_ComoEstas")

console.log("Correct Password:", valid)
console.log("Incorrect Password:", invalid)